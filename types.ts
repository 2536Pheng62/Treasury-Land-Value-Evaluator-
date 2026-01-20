export interface QualityScores {
  architecturalDesign: number; // 10
  landUseEfficiency: number; // 10
  utilitiesAndEnvironment: number; // 10
  trafficImpact: number; // 5
  otherFactors: number; // 5 -> Re-purposed as "Resilience & Innovation"
}

export interface Proposal {
  id: string;
  bidderName: string;
  signingFee: number; // 30% weight
  constructionValue: number; // 30% weight
  monthlyRentAverage: number; // For financial feasibility check
  
  // New Engineering & Academic Inputs
  totalFloorArea: number; // Sq.m. (For FAR)
  openSpaceArea: number; // Sq.m. (For OSR)
  publicBenefitValue: number; // THB (For SROI - e.g., Parks, Community Center)
  targetIndustry: string; // For LQ/Context fit check
  
  qualityScores: QualityScores; // 40% weight total
}

export interface HBUMetrics {
  isLegallyPermissible: boolean;
  isPhysicallyPossible: boolean; // Simplified check
  isFinanciallyFeasible: boolean; // Based on IRR/NPV
  farValue: number;
  osrValue: number;
}

export interface PQIScore {
  ev: number; // Economic Value (0-100)
  tv: number; // Technical Value (0-100)
  sv: number; // Social Value (0-100)
  w1: number; // Weight 1 (e.g. 0.5)
  w2: number; // Weight 2 (e.g. 0.3)
  w3: number; // Weight 3 (e.g. 0.2)
  totalPQI: number; // Final Weighted Score
}

export interface ScoredProposal extends Proposal {
  scoreFee: number;
  scoreConstruction: number;
  scoreQuality: number;
  totalScore: number;
  
  // Advanced Metrics
  npvEstimate: number; 
  irrEstimate: number; // Internal Rate of Return %
  paybackPeriod: number; // Years
  sroiIndex: number; // Social Return on Investment Ratio
  
  hbu: HBUMetrics;
  pqi: PQIScore;
}

export interface LandSpecs {
  sizeRai: number;
  sizeNgan: number;
  sizeWah: number;
  appraisedValuePerWah: number;
  minConstructionValue: number;
  minSigningFee: number;
  
  // Zoning & Regulation Limits
  zoningColor: string; // e.g., "Red", "Brown", "Orange"
  maxFAR: number; // Floor Area Ratio Limit
  minOSR: number; // Open Space Ratio Limit (%)
}