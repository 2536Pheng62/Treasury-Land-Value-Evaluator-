import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Calculator, BarChart3, AlertCircle, FileText, CheckCircle2, AlertTriangle, Info, Building, Leaf, Users, ShieldCheck, TrendingUp, Wallet, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Proposal, LandSpecs, QualityScores } from './types';
import { calculateScores, formatCurrency, formatNumber } from './utils';
import { TheoryCard } from './components/TheoryCard';

// Initial Land Specs based on PDF & Standard Regulations
const INITIAL_LAND_SPECS: LandSpecs = {
  sizeRai: 12,
  sizeNgan: 3,
  sizeWah: 25,
  appraisedValuePerWah: 30000,
  minConstructionValue: 18507510,
  minSigningFee: 1476000,
  zoningColor: "Orange", // ที่ดินประเภทที่อยู่อาศัยหนาแน่นปานกลาง (ตัวอย่าง)
  maxFAR: 5.0,
  minOSR: 6.0,
};

const INITIAL_QUALITY: QualityScores = {
  architecturalDesign: 0,
  landUseEfficiency: 0,
  utilitiesAndEnvironment: 0,
  trafficImpact: 0,
  otherFactors: 0, // Now represents Resilience/Innovation
};

function App() {
  const [landSpecs, setLandSpecs] = useState<LandSpecs>(INITIAL_LAND_SPECS);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  
  // Form State
  const [bidderName, setBidderName] = useState('');
  const [signingFee, setSigningFee] = useState<number>(0);
  const [constructionValue, setConstructionValue] = useState<number>(0);
  const [monthlyRent, setMonthlyRent] = useState<number>(2050);
  
  // Engineering & Academic Inputs
  const [totalFloorArea, setTotalFloorArea] = useState<number>(0);
  const [openSpaceArea, setOpenSpaceArea] = useState<number>(0);
  const [publicBenefitValue, setPublicBenefitValue] = useState<number>(0);
  const [targetIndustry, setTargetIndustry] = useState('');

  const [qualityScores, setQualityScores] = useState<QualityScores>(INITIAL_QUALITY);

  const scoredProposals = useMemo(() => calculateScores(proposals, landSpecs), [proposals, landSpecs]);

  const handleAddProposal = () => {
    if (!bidderName || signingFee <= 0 || constructionValue <= 0 || totalFloorArea <= 0) {
      alert("กรุณากรอกข้อมูลสำคัญ (ชื่อ, ค่าธรรมเนียม, ก่อสร้าง, พื้นที่อาคารรวม) ให้ครบถ้วนเพื่อการคำนวณ HBU");
      return;
    }

    const newProposal: Proposal = {
      id: Date.now().toString(),
      bidderName,
      signingFee,
      constructionValue,
      monthlyRentAverage: monthlyRent,
      totalFloorArea,
      openSpaceArea,
      publicBenefitValue,
      targetIndustry,
      qualityScores: { ...qualityScores },
    };

    setProposals([...proposals, newProposal]);
    
    // Reset Form
    setBidderName('');
    setSigningFee(0);
    setConstructionValue(0);
    setMonthlyRent(2050);
    setTotalFloorArea(0);
    setOpenSpaceArea(0);
    setPublicBenefitValue(0);
    setTargetIndustry('');
    setQualityScores(INITIAL_QUALITY);
  };

  const removeProposal = (id: string) => {
    setProposals(proposals.filter(p => p.id !== id));
  };

  const handleQualityChange = (key: keyof QualityScores, value: number) => {
    setQualityScores(prev => ({
      ...prev,
      [key]: Math.min(Math.max(value, 0), key === 'trafficImpact' || key === 'otherFactors' ? 5 : 10)
    }));
  };

  const getWinner = () => scoredProposals.length > 0 ? scoredProposals[0] : null;

  return (
    <div className="min-h-screen pb-12 bg-slate-100">
      {/* Header */}
      <header className="bg-slate-900 text-white p-6 shadow-lg border-b-4 border-indigo-500">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold font-sarabun flex items-center gap-2">
              <Calculator className="w-8 h-8 text-indigo-400" />
              ระบบประเมินศักยภาพโครงการ (HBU Analysis & DSS)
            </h1>
            <p className="text-slate-300 text-sm mt-1">Decision Support System with PQI Scoring Formula</p>
          </div>
          <div className="text-right text-xs text-slate-400 hidden sm:block">
            <p>Formula: PQI = (W₁·Ev) + (W₂·Tv) + (W₃·Sv)</p>
            <p>Metrics: NPV, IRR, FAR/OSR, SROI</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input Forms */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Land Specs Card */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-md font-bold text-slate-800 mb-4 flex items-center gap-2 border-b pb-2">
              <FileText className="w-5 h-5 text-indigo-600" /> 
              ข้อมูลที่ดินและข้อกำหนด (Land & Regulations)
            </h2>
            
            <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-3 text-xs font-semibold text-slate-500">ขนาดที่ดิน (ไร่-งาน-วา)</div>
                    <input type="number" className="border rounded p-1.5 bg-slate-50 text-center" value={landSpecs.sizeRai} disabled />
                    <input type="number" className="border rounded p-1.5 bg-slate-50 text-center" value={landSpecs.sizeNgan} disabled />
                    <input type="number" className="border rounded p-1.5 bg-slate-50 text-center" value={landSpecs.sizeWah} disabled />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Max FAR (เท่า)</label>
                        <input 
                        type="number" step="0.1"
                        className="w-full border border-slate-300 rounded p-1.5 focus:ring-2 focus:ring-indigo-200"
                        value={landSpecs.maxFAR}
                        onChange={(e) => setLandSpecs({...landSpecs, maxFAR: Number(e.target.value)})} 
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Min OSR (%)</label>
                        <input 
                        type="number" step="0.5"
                        className="w-full border border-slate-300 rounded p-1.5 focus:ring-2 focus:ring-indigo-200"
                        value={landSpecs.minOSR}
                        onChange={(e) => setLandSpecs({...landSpecs, minOSR: Number(e.target.value)})} 
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Min Construction</label>
                    <input type="number" className="w-full border border-slate-300 rounded p-1.5 text-xs" 
                      value={landSpecs.minConstructionValue} onChange={(e) => setLandSpecs({...landSpecs, minConstructionValue: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Min Fee</label>
                    <input type="number" className="w-full border border-slate-300 rounded p-1.5 text-xs" 
                      value={landSpecs.minSigningFee} onChange={(e) => setLandSpecs({...landSpecs, minSigningFee: Number(e.target.value)})} />
                  </div>
                </div>
            </div>
          </div>

          {/* Proposal Input Card */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-emerald-200 ring-1 ring-emerald-100">
            <h2 className="text-md font-bold text-emerald-800 mb-4 flex items-center gap-2 border-b border-emerald-100 pb-2">
              <Plus className="w-5 h-5" /> เพิ่มข้อมูลผู้ยื่นซอง (Proposal)
            </h2>
            
            <div className="space-y-4">
              
              {/* Basic Info */}
              <div>
                <label className="block text-xs font-bold text-slate-700">ชื่อผู้ยื่นข้อเสนอ</label>
                <input 
                  type="text" 
                  className="mt-1 w-full border border-slate-300 rounded-md p-2 focus:border-emerald-500" 
                  value={bidderName} onChange={(e) => setBidderName(e.target.value)}
                  placeholder="เช่น บริษัท พัฒนาสินทรัพย์ จำกัด"
                />
              </div>

              {/* Financial Inputs */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded border border-slate-100">
                <div className="col-span-2 text-xs font-bold text-slate-500 flex items-center gap-1"><Calculator className="w-3 h-3"/> ข้อมูลเศรษฐศาสตร์ (Economic - Ev)</div>
                <div>
                  <label className="block text-xs text-slate-600">ค่าธรรมเนียมแรกเข้า</label>
                  <input type="number" className="w-full border rounded p-1.5" value={signingFee || ''} onChange={(e) => setSigningFee(Number(e.target.value))} />
                </div>
                <div>
                  <label className="block text-xs text-slate-600">มูลค่าก่อสร้าง</label>
                  <input type="number" className="w-full border rounded p-1.5" value={constructionValue || ''} onChange={(e) => setConstructionValue(Number(e.target.value))} />
                </div>
                <div>
                  <label className="block text-xs text-slate-600">ค่าเช่ารายเดือนเฉลี่ย</label>
                  <input type="number" className="w-full border rounded p-1.5" value={monthlyRent || ''} onChange={(e) => setMonthlyRent(Number(e.target.value))} />
                </div>
              </div>

              {/* Engineering Inputs */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded border border-slate-100">
                 <div className="col-span-2 text-xs font-bold text-slate-500 flex items-center gap-1"><Building className="w-3 h-3"/> ข้อมูลเทคนิค & สังคม (Tech & Social)</div>
                 <div>
                  <label className="block text-xs text-slate-600">พื้นที่อาคารรวม (ตร.ม.)</label>
                  <input type="number" className="w-full border rounded p-1.5" value={totalFloorArea || ''} onChange={(e) => setTotalFloorArea(Number(e.target.value))} />
                </div>
                <div>
                  <label className="block text-xs text-slate-600">พื้นที่สีเขียว/ว่าง (ตร.ม.)</label>
                  <input type="number" className="w-full border rounded p-1.5" value={openSpaceArea || ''} onChange={(e) => setOpenSpaceArea(Number(e.target.value))} />
                </div>
                 <div className="col-span-2">
                  <label className="block text-xs text-slate-600">มูลค่าสาธารณะประโยชน์ (SROI)</label>
                  <input type="number" className="w-full border rounded p-1.5 border-emerald-200 bg-emerald-50" placeholder="สวน, ถนน" value={publicBenefitValue || ''} onChange={(e) => setPublicBenefitValue(Number(e.target.value))} />
                </div>
              </div>

              {/* Quality Score Inputs (Compact) */}
              <div className="border-t pt-3">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xs font-bold text-slate-700">คะแนนคุณภาพเชิงลึก</h3>
                    <span className="text-xs text-slate-400">เต็ม 40</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span>สถาปัตยกรรม (10)</span>
                    <input type="number" max="10" className="w-14 border rounded p-1 text-center" 
                      value={qualityScores.architecturalDesign} onChange={(e) => handleQualityChange('architecturalDesign', Number(e.target.value))} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>การใช้พื้นที่ (10)</span>
                    <input type="number" max="10" className="w-14 border rounded p-1 text-center"
                      value={qualityScores.landUseEfficiency} onChange={(e) => handleQualityChange('landUseEfficiency', Number(e.target.value))} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-600 font-semibold flex gap-1 items-center"><ShieldCheck className="w-3 h-3"/>นวัตกรรม/ต้านภัย (5)</span>
                    <input type="number" max="5" className="w-14 border rounded p-1 text-center border-indigo-200 bg-indigo-50"
                      value={qualityScores.otherFactors} onChange={(e) => handleQualityChange('otherFactors', Number(e.target.value))} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>สิ่งแวดล้อม (10)</span>
                    <input type="number" max="10" className="w-14 border rounded p-1 text-center"
                      value={qualityScores.utilitiesAndEnvironment} onChange={(e) => handleQualityChange('utilitiesAndEnvironment', Number(e.target.value))} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>จราจร (5)</span>
                    <input type="number" max="5" className="w-14 border rounded p-1 text-center"
                      value={qualityScores.trafficImpact} onChange={(e) => handleQualityChange('trafficImpact', Number(e.target.value))} />
                  </div>
                </div>
              </div>

              <button 
                onClick={handleAddProposal}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded shadow-sm font-semibold transition-all flex justify-center items-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" /> คำนวณ PQI (Calculate)
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Analysis & Results */}
        <div className="lg:col-span-8">
          
          {proposals.length === 0 ? (
            <div className="bg-white p-12 rounded-lg shadow-sm border border-slate-200 text-center text-slate-400 h-64 flex flex-col justify-center items-center">
              <BarChart3 className="w-16 h-16 mb-4 text-slate-200" />
              <p className="text-lg font-medium text-slate-500">รอข้อมูลนำเข้า (No Data Input)</p>
              <p className="text-sm">กรุณากรอกข้อมูลเพื่อคำนวณ Project Quality Index (PQI)</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Winner Dashboard */}
              {getWinner() && (
                <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-indigo-950 rounded-lg p-6 text-white shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Calculator className="w-32 h-32" />
                   </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-yellow-400 text-indigo-950 text-xs font-bold px-2 py-0.5 rounded shadow-sm">อันดับ 1 (Rank #1)</span>
                        <h2 className="text-xl font-bold">{getWinner()?.bidderName}</h2>
                      </div>
                      <div className="flex gap-4 text-sm text-indigo-200">
                         <div className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-400"/> PQI Score: {formatNumber(getWinner()?.totalScore || 0)}</div>
                         <div className="flex items-center gap-1"><AlertTriangle className="w-4 h-4 text-yellow-400"/> Legal HBU: {getWinner()?.hbu.isLegallyPermissible ? "Passed" : "Failed"}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm text-center">
                            <p className="text-[10px] text-indigo-200 mb-1 flex justify-center items-center gap-1"><Wallet className="w-3 h-3" /> NPV (Est.)</p>
                            <p className="text-sm md:text-base font-bold">{formatCurrency(getWinner()?.npvEstimate || 0)}</p>
                        </div>
                        <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm text-center">
                            <p className="text-[10px] text-indigo-200 mb-1 flex justify-center items-center gap-1"><TrendingUp className="w-3 h-3" /> IRR</p>
                            <p className="text-sm md:text-base font-bold">{formatNumber(getWinner()?.irrEstimate || 0)}%</p>
                        </div>
                        <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm text-center">
                            <p className="text-[10px] text-indigo-200 mb-1 flex justify-center items-center gap-1"><Clock className="w-3 h-3" /> Payback</p>
                            <p className="text-sm md:text-base font-bold">{formatNumber(getWinner()?.paybackPeriod || 0)} Years</p>
                        </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Detailed Table */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-700">ตารางวิเคราะห์ PQI (Comparative PQI Matrix)</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Bidder</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase bg-slate-100">NPV (Est.)</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase bg-slate-100">IRR</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-blue-600 uppercase">Ev (50%)</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-indigo-600 uppercase">Tv (30%)</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-emerald-600 uppercase">Sv (20%)</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-slate-700 uppercase">PQI Total</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase">HBU Check</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {scoredProposals.map((p, idx) => (
                        <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 whitespace-nowrap">
                                <div className="text-sm font-medium text-slate-900">{idx + 1}. {p.bidderName}</div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-slate-700 font-medium bg-slate-50">{formatCurrency(p.npvEstimate)}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-slate-700 font-medium bg-slate-50">{formatNumber(p.irrEstimate)}%</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-slate-600">{formatNumber(p.pqi.ev)}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-slate-600">{formatNumber(p.pqi.tv)}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-slate-600">{formatNumber(p.pqi.sv)}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-bold text-indigo-700">{formatNumber(p.totalScore)}</td>
                            
                            <td className="px-4 py-3 whitespace-nowrap text-center">
                                {p.hbu.isLegallyPermissible && p.hbu.isFinanciallyFeasible ? (
                                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-semibold">Pass</span>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        {!p.hbu.isLegallyPermissible && <span className="text-[10px] text-red-500">Legal Fail</span>}
                                        {!p.hbu.isFinanciallyFeasible && <span className="text-[10px] text-orange-500">Fin Fail</span>}
                                    </div>
                                )}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-center">
                                <button onClick={() => removeProposal(p.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
              </div>

              {/* Visual Analysis Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Score Breakdown Chart */}
                <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" /> องค์ประกอบคะแนน PQI (Weighted)
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={scoredProposals.map(p => ({
                            name: p.bidderName,
                            ev: p.pqi.ev * p.pqi.w1,
                            tv: p.pqi.tv * p.pqi.w2,
                            sv: p.pqi.sv * p.pqi.w3
                        }))}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} />
                        <XAxis type="number" domain={[0, 100]} hide />
                        <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 10}} />
                        <Tooltip contentStyle={{ fontSize: '12px' }} />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Bar dataKey="ev" name="Economic (50%)" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="tv" name="Technical (30%)" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="sv" name="Social (20%)" stackId="a" fill="#10b981" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Quality Radar */}
                <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> มิติทางเทคนิค (Technical Dimensions)
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius={80} data={[
                        { subject: 'Arch Design', A: getWinner()?.qualityScores.architecturalDesign || 0, fullMark: 10 },
                        { subject: 'Land Use', A: getWinner()?.qualityScores.landUseEfficiency || 0, fullMark: 10 },
                        { subject: 'Resilience', A: (getWinner()?.qualityScores.otherFactors || 0) * 2, fullMark: 10 },
                        { subject: 'Environment', A: getWinner()?.qualityScores.utilitiesAndEnvironment || 0, fullMark: 10 },
                        { subject: 'Traffic', A: (getWinner()?.qualityScores.trafficImpact || 0) * 2, fullMark: 10 },
                      ]}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                        <Radar name={getWinner()?.bidderName} dataKey="A" stroke="#4f46e5" fill="#6366f1" fillOpacity={0.4} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                    <p className="text-center text-[10px] text-slate-400 mt-2">*แสดงเฉพาะผู้ชนะอันดับ 1</p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Academic Theory Section */}
          <TheoryCard />

        </div>
      </main>
    </div>
  );
}

export default App;