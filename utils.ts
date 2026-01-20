import { Proposal, ScoredProposal, LandSpecs, HBUMetrics, PQIScore } from './types';

// Constants based on standard financial assumptions for government projects
const DISCOUNT_RATE = 0.05; // 5% discount rate for NPV
const PROJECT_DURATION_YEARS = 30;

// Helper: Calculate Land Area in Square Meters
const getLandAreaSqm = (specs: LandSpecs): number => {
  return (specs.sizeRai * 1600) + (specs.sizeNgan * 400) + (specs.sizeWah * 4);
};

// Helper: Calculate IRR (Newton-Raphson approximation or simple iteration)
const calculateIRR = (initialInvestment: number, annualCashFlow: number, years: number): number => {
  let guess = 0.1; // 10%
  for (let i = 0; i < 20; i++) {
    let npv = 0;
    for (let t = 1; t <= years; t++) {
      npv += annualCashFlow / Math.pow(1 + guess, t);
    }
    npv -= initialInvestment;
    if (Math.abs(npv) < 100) break; // Precision threshold
    
    // Derivative for Newton-Raphson is complex, using simple step adjustment for stability
    if (npv > 0) guess += 0.01;
    else guess -= 0.01;
  }
  return guess * 100;
};

export const calculateScores = (proposals: Proposal[], landSpecs: LandSpecs): ScoredProposal[] => {
  // 1. Find Maximums for Relative Scoring
  const maxFee = Math.max(...proposals.map(p => p.signingFee), landSpecs.minSigningFee);
  const maxConstruction = Math.max(...proposals.map(p => p.constructionValue), landSpecs.minConstructionValue);
  
  const landAreaSqm = getLandAreaSqm(landSpecs);

  return proposals.map(p => {
    // --- 1. TOR SCORING (Basic WSM for Backward Compatibility) ---
    const scoreFee = (p.signingFee / maxFee) * 30;
    const scoreConstruction = (p.constructionValue / maxConstruction) * 30;
    
    const q = p.qualityScores;
    const scoreQuality = 
      q.architecturalDesign + 
      q.landUseEfficiency + 
      q.utilitiesAndEnvironment + 
      q.trafficImpact + 
      q.otherFactors;

    const baseScore = scoreFee + scoreConstruction + scoreQuality;

    // --- 2. ADVANCED CALCULATION ENGINE ---

    // A. Financials (NPV, IRR, Payback)
    let totalRentNPV = 0;
    let currentAnnualRent = p.monthlyRentAverage * 12;
    // Estimated Net Operating Income (NOI) for Developer (Proxy: 8% of CapEx)
    const estimatedDeveloperNOI = p.constructionValue * 0.08; 
    const totalInvestment = p.signingFee + p.constructionValue;

    for (let year = 1; year <= PROJECT_DURATION_YEARS; year++) {
      totalRentNPV += currentAnnualRent / Math.pow(1 + DISCOUNT_RATE, year);
      if (year % 3 === 0) currentAnnualRent *= 1.09;
    }

    const irrEstimate = calculateIRR(totalInvestment, estimatedDeveloperNOI, PROJECT_DURATION_YEARS);
    const paybackPeriod = totalInvestment / (estimatedDeveloperNOI || 1); // Simple payback

    // B. Physical & Legal (FAR / OSR)
    const farValue = p.totalFloorArea / landAreaSqm;
    const osrValue = (p.openSpaceArea / p.totalFloorArea) * 100;

    // C. HBU Check (Pass/Fail Logic)
    const isLegallyPermissible = farValue <= landSpecs.maxFAR && osrValue >= landSpecs.minOSR;
    const isFinanciallyFeasible = irrEstimate > 5; // Greater than bond yield
    // Physical check assumed passed if construction value is realistic per sqm
    const isPhysicallyPossible = (p.constructionValue / p.totalFloorArea) > 10000; // Min cost 10k/sqm

    const hbu: HBUMetrics = {
      isLegallyPermissible,
      isPhysicallyPossible,
      isFinanciallyFeasible,
      farValue,
      osrValue
    };

    // D. SROI (Social Return on Investment)
    // Formula: (NPV of Rent + Public Benefit Value) / Investment by Developer (proxy for societal resource use)
    const sroiIndex = (totalRentNPV + p.publicBenefitValue) / (p.constructionValue * 0.1); 

    // --- 3. PQI FORMULA CALCULATION ---
    // Formula: PQI = (W1 * Ev) + (W2 * Tv) + (W3 * Sv)
    
    // Ev (Economic Value) - Weight 50%
    // Components: Signing Fee (40%), Construction (40%), Financial Strength/IRR (20%)
    const scoreFeeNorm = (p.signingFee / maxFee) * 100;
    const scoreConstNorm = (p.constructionValue / maxConstruction) * 100;
    const scoreIRRNorm = Math.min((irrEstimate / 15) * 100, 100); // Target 15% IRR for max score
    const Ev = (scoreFeeNorm * 0.4) + (scoreConstNorm * 0.4) + (scoreIRRNorm * 0.2);

    // Tv (Technical & Resilience Value) - Weight 30%
    // Components: Architecture (40%), Land Use (30%), Resilience/Innovation (30%)
    const Tv = (
      ((p.qualityScores.architecturalDesign / 10) * 40) +
      ((p.qualityScores.landUseEfficiency / 10) * 30) +
      ((p.qualityScores.otherFactors / 5) * 30) 
    );

    // Sv (Social & Sustainability Value) - Weight 20%
    // Components: Utilities/Env (40%), Traffic (20%), SROI Impact (40%)
    const sroiScore = Math.min((sroiIndex / 1.5) * 100, 100); // Target 1.5x SROI for max score
    const Sv = (
      ((p.qualityScores.utilitiesAndEnvironment / 10) * 40) +
      ((p.qualityScores.trafficImpact / 5) * 20) +
      (sroiScore * 0.4)
    );

    const W1 = 0.5;
    const W2 = 0.3;
    const W3 = 0.2;
    const totalPQI = (W1 * Ev) + (W2 * Tv) + (W3 * Sv);

    const pqi: PQIScore = {
        ev: Ev,
        tv: Tv,
        sv: Sv,
        w1: W1,
        w2: W2,
        w3: W3,
        totalPQI
    };

    return {
      ...p,
      scoreFee,
      scoreConstruction,
      scoreQuality,
      totalScore: totalPQI, // Use PQI as the main driving score now
      npvEstimate: totalRentNPV + p.signingFee,
      irrEstimate,
      paybackPeriod,
      sroiIndex,
      hbu,
      pqi
    };
  }).sort((a, b) => b.totalScore - a.totalScore);
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 }).format(amount);
};

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('th-TH', { maximumFractionDigits: 2 }).format(num);
};