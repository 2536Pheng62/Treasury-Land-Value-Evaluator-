import React, { useState } from 'react';
import { BookOpen, Building2, Users, Sigma, ListChecks, Palette, Maximize, Leaf, Car, ShieldCheck } from 'lucide-react';

export const TheoryCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'theory' | 'formula'>('formula');

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 mt-8 overflow-hidden">
      {/* Tabs Header */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('formula')}
          className={`flex-1 py-4 px-6 text-sm font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'formula' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'bg-gray-50 text-gray-500 hover:text-gray-700'
          }`}
        >
          <Sigma className="w-4 h-4" />
          สูตรคำนวณ (Scoring Formula)
        </button>
        <button 
          onClick={() => setActiveTab('theory')}
          className={`flex-1 py-4 px-6 text-sm font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'theory' ? 'bg-white text-indigo-600 border-b-2 border-indigo-600' : 'bg-gray-50 text-gray-500 hover:text-gray-700'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          เกณฑ์และหลักการ (Criteria & Framework)
        </button>
      </div>
      
      <div className="p-6">
        {activeTab === 'formula' && (
             <div className="animate-in fade-in duration-300">
                <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Sigma className="w-5 h-5 text-blue-600" />
                    Project Quality Index (PQI) Calculation Breakdown
                </h4>
                
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8 text-center">
                    <div className="text-xl md:text-2xl font-serif text-slate-800 italic mb-2">
                        PQI = (W<sub>1</sub> × E<sub>v</sub>) + (W<sub>2</sub> × T<sub>v</sub>) + (W<sub>3</sub> × S<sub>v</sub>)
                    </div>
                    <div className="flex justify-center gap-8 mt-4 text-sm text-slate-600">
                        <div><span className="font-bold text-blue-600">W<sub>1</sub> = 0.50</span> (Economic)</div>
                        <div><span className="font-bold text-indigo-600">W<sub>2</sub> = 0.30</span> (Technical)</div>
                        <div><span className="font-bold text-emerald-600">W<sub>3</sub> = 0.20</span> (Social)</div>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Ev Section */}
                    <div className="border border-blue-100 rounded-lg overflow-hidden">
                        <div className="bg-blue-50 px-4 py-3 border-b border-blue-100 flex justify-between items-center">
                            <h5 className="font-bold text-blue-800">E<sub>v</sub> : Economic Value (100 Points)</h5>
                            <span className="text-xs font-semibold bg-blue-200 text-blue-800 px-2 py-1 rounded">Weight 50%</span>
                        </div>
                        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="space-y-2">
                                <div className="font-semibold text-slate-700">1. Signing Fee & Rent</div>
                                <div className="text-xs text-slate-500">Weight: 40%</div>
                                <div className="bg-slate-50 p-2 rounded text-xs border border-slate-100">
                                    <code>(Proposal / Max_Fee) × 100</code>
                                    <p className="mt-1 text-slate-400">Relative scoring against highest bidder</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="font-semibold text-slate-700">2. Construction Value</div>
                                <div className="text-xs text-slate-500">Weight: 40%</div>
                                <div className="bg-slate-50 p-2 rounded text-xs border border-slate-100">
                                    <code>(Proposal / Max_Const) × 100</code>
                                    <p className="mt-1 text-slate-400">Relative scoring against highest investment</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="font-semibold text-slate-700">3. Financial Feasibility (IRR)</div>
                                <div className="text-xs text-slate-500">Weight: 20%</div>
                                <div className="bg-slate-50 p-2 rounded text-xs border border-slate-100">
                                    <code>Min((IRR / 15%) × 100, 100)</code>
                                    <p className="mt-1 text-slate-400">Benchmarked against 15% Target IRR</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tv Section */}
                    <div className="border border-indigo-100 rounded-lg overflow-hidden">
                        <div className="bg-indigo-50 px-4 py-3 border-b border-indigo-100 flex justify-between items-center">
                            <h5 className="font-bold text-indigo-800">T<sub>v</sub> : Technical Value (100 Points)</h5>
                            <span className="text-xs font-semibold bg-indigo-200 text-indigo-800 px-2 py-1 rounded">Weight 30%</span>
                        </div>
                        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="space-y-2">
                                <div className="font-semibold text-slate-700">1. Architectural Design</div>
                                <div className="text-xs text-slate-500">Weight: 40%</div>
                                <div className="bg-slate-50 p-2 rounded text-xs border border-slate-100">
                                    <code>(Score / 10) × 100</code>
                                    <p className="mt-1 text-slate-400">Evaluated by committee (0-10)</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="font-semibold text-slate-700">2. Land Use Efficiency</div>
                                <div className="text-xs text-slate-500">Weight: 30%</div>
                                <div className="bg-slate-50 p-2 rounded text-xs border border-slate-100">
                                    <code>(Score / 10) × 100</code>
                                    <p className="mt-1 text-slate-400">FAR/OSR Optimization (0-10)</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="font-semibold text-slate-700">3. Structural Resilience</div>
                                <div className="text-xs text-slate-500">Weight: 30%</div>
                                <div className="bg-slate-50 p-2 rounded text-xs border border-slate-100">
                                    <code>(Score / 5) × 100</code>
                                    <p className="mt-1 text-slate-400">Seismic & Innovation (0-5)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sv Section */}
                    <div className="border border-emerald-100 rounded-lg overflow-hidden">
                        <div className="bg-emerald-50 px-4 py-3 border-b border-emerald-100 flex justify-between items-center">
                            <h5 className="font-bold text-emerald-800">S<sub>v</sub> : Social Value (100 Points)</h5>
                            <span className="text-xs font-semibold bg-emerald-200 text-emerald-800 px-2 py-1 rounded">Weight 20%</span>
                        </div>
                        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                             <div className="space-y-2">
                                <div className="font-semibold text-slate-700">1. Utilities & Environment</div>
                                <div className="text-xs text-slate-500">Weight: 40%</div>
                                <div className="bg-slate-50 p-2 rounded text-xs border border-slate-100">
                                    <code>(Score / 10) × 100</code>
                                    <p className="mt-1 text-slate-400">Green/Waste Standards (0-10)</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="font-semibold text-slate-700">2. Traffic Mitigation</div>
                                <div className="text-xs text-slate-500">Weight: 20%</div>
                                <div className="bg-slate-50 p-2 rounded text-xs border border-slate-100">
                                    <code>(Score / 5) × 100</code>
                                    <p className="mt-1 text-slate-400">Impact Assessment (0-5)</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="font-semibold text-slate-700">3. SROI / Public Benefit</div>
                                <div className="text-xs text-slate-500">Weight: 40%</div>
                                <div className="bg-slate-50 p-2 rounded text-xs border border-slate-100">
                                    <code>Min((SROI_Ratio / 1.5) × 100, 100)</code>
                                    <p className="mt-1 text-slate-400">Benchmarked against 1.5x Return</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        )}

        {activeTab === 'theory' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Detailed Quality Criteria Section */}
            <div>
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-b pb-2">
                <ListChecks className="w-5 h-5 text-indigo-600" />
                เกณฑ์การพิจารณาคะแนนคุณภาพ (Quality Scoring Criteria)
              </h4>
              <p className="text-sm text-gray-500 mb-4">
                รายละเอียดแนวทางการให้คะแนนในแต่ละหมวด เพื่อให้กรรมการพิจารณาบนมาตรฐานเดียวกัน (Standardized Evaluation):
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Architecture */}
                <div className="bg-slate-50 p-4 rounded border border-slate-200">
                    <h5 className="font-bold text-slate-700 text-sm mb-2 flex items-center gap-2">
                        <Palette className="w-4 h-4 text-purple-500"/> 1. สถาปัตยกรรม (Architectural Design)
                    </h5>
                    <ul className="text-xs text-slate-600 list-disc ml-5 space-y-1">
                        <li><b>Aesthetics & Context:</b> ความงามเป็นเอกลักษณ์แต่กลมกลืนกับบริบท (Contextual Harmony) และส่งเสริมอัตลักษณ์พื้นที่</li>
                        <li><b>Universal Design:</b> การออกแบบเพื่อทุกคน (ทางลาด, ลิฟต์, ห้องน้ำ) รองรับสังคมสูงวัย (Aging Society)</li>
                        <li><b>Functionality:</b> การวางผังพื้นที่ใช้สอย (Space Planning) สอดคล้องกับพฤติกรรมผู้ใช้งานจริง</li>
                    </ul>
                </div>

                {/* 2. Land Use */}
                <div className="bg-slate-50 p-4 rounded border border-slate-200">
                    <h5 className="font-bold text-slate-700 text-sm mb-2 flex items-center gap-2">
                        <Maximize className="w-4 h-4 text-blue-500"/> 2. ประสิทธิภาพการใช้พื้นที่ (Land Use Efficiency)
                    </h5>
                    <ul className="text-xs text-slate-600 list-disc ml-5 space-y-1">
                        <li><b>Highest & Best Use:</b> การใช้ประโยชน์เต็มศักยภาพ FAR ตามผังเมือง</li>
                        <li><b>Open Space Quality:</b> คุณภาพของพื้นที่ว่าง (OSR) ที่ใช้งานได้จริง ไม่ใช่แค่เศษเหลือของที่ดิน</li>
                        <li><b>Connectivity:</b> การเชื่อมต่อพื้นที่ภายใน-ภายนอก และการไหลเวียนของผู้คน (Circulation Flow)</li>
                    </ul>
                </div>

                {/* 3. Environment */}
                <div className="bg-slate-50 p-4 rounded border border-slate-200">
                    <h5 className="font-bold text-slate-700 text-sm mb-2 flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-green-500"/> 3. สิ่งแวดล้อม & สาธารณูปโภค (Environment)
                    </h5>
                    <ul className="text-xs text-slate-600 list-disc ml-5 space-y-1">
                        <li><b>Green Standards:</b> ผ่านเกณฑ์อาคารเขียว (TREES/LEED) หรือมีนวัตกรรมประหยัดพลังงาน</li>
                        <li><b>Waste Management:</b> ระบบบำบัดน้ำเสียที่ได้มาตรฐาน และการจัดการขยะครบวงจร (Zero Waste)</li>
                        <li><b>Disaster Resilience:</b> ระบบระบายน้ำป้องกันน้ำท่วม และการเตรียมพร้อมรับภัยพิบัติ</li>
                    </ul>
                </div>

                {/* 4. Structural */}
                <div className="bg-slate-50 p-4 rounded border border-slate-200">
                    <h5 className="font-bold text-slate-700 text-sm mb-2 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-slate-600"/> 4. โครงสร้าง & นวัตกรรม (Structural)
                    </h5>
                    <ul className="text-xs text-slate-600 list-disc ml-5 space-y-1">
                        <li><b>Seismic Design:</b> ออกแบบต้านทานแผ่นดินไหวตามมาตรฐาน มยผ. (DPT Standard)</li>
                        <li><b>Advanced Materials:</b> การใช้วัสดุความแข็งแรงสูง (High Strength) หรือวัสดุรักษ์โลก (Low Carbon)</li>
                        <li><b>Safety Factor:</b> การเผื่อค่าความปลอดภัยที่เหมาะสมสำหรับอาคารสาธารณะ</li>
                    </ul>
                </div>
              </div>

              {/* 5. Traffic Impact - Highlighted */}
              <div className="mt-4 bg-indigo-50 p-4 rounded border border-indigo-200">
                  <h5 className="font-bold text-indigo-800 text-sm mb-2 flex items-center gap-2">
                      <Car className="w-4 h-4 text-indigo-600"/> 5. ผลกระทบด้านจราจร (Traffic Impact Mitigation) - Highlight
                  </h5>
                  <div className="text-xs text-slate-700 space-y-2">
                      <p>
                        ในบริบทการพัฒนาเมือง (Urban Development) โครงการขนาดใหญ่ย่อมสร้างผลกระทบต่อการจราจรโดยรอบ การประเมินหัวข้อนี้ในส่วน <b>Social Value (Sv)</b> จึงมุ่งเน้นที่การ "บรรเทาและจัดการ" ไม่ให้เป็นภาระต่อสังคม โดยพิจารณาจาก:
                      </p>
                      <ul className="list-disc ml-5 space-y-1 text-slate-600">
                        <li>
                            <b>Traffic Impact Assessment (TIA):</b> มีการศึกษาผลกระทบจราจรตามหลักวิศวกรรมจราจร ประเมินปริมาณรถเข้า-ออก (Trip Generation) และสภาพจราจรบนถนนหลัก
                        </li>
                        <li>
                            <b>Internal Circulation Management:</b> การบริหารจัดการจราจรภายในโครงการ แยกเส้นทางรถส่งของ (Service) รถลูกค้า และคนเดินเท้า เพื่อไม่ให้เกิดแถวคอย (Queue) ล้นออกสู่ถนนสาธารณะ
                        </li>
                        <li>
                            <b>Ingress/Egress Safety:</b> จุดเชื่อมต่อทางเข้า-ออก มีระยะร่นที่ปลอดภัย มีระยะมองเห็น (Sight Distance) เพียงพอ และไม่ขัดขวางกระแสจราจรหลัก
                        </li>
                        <li>
                            <b>Public Transit Integration:</b> การส่งเสริมการใช้ระบบขนส่งมวลชน เช่น มีทางเดินเชื่อมต่อสถานีรถไฟฟ้า หรือจัดให้มีจุดจอดรถสาธารณะ (Feeder System) เพื่อลดการใช้รถยนต์ส่วนตัว
                        </li>
                      </ul>
                  </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-6">
                {/* HBU Section */}
                <div>
                <h4 className="font-bold text-indigo-900 flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5" /> Highest and Best Use (HBU)
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                    หลักการประเมินศักยภาพที่ดินสูงสุด ประกอบด้วย 4 มิติ:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                    <li><b>Legally Permissible:</b> ถูกต้องตามกฎหมาย (ผังเมือง, พ.ร.บ.ควบคุมอาคาร)</li>
                    <li><b>Physically Possible:</b> เป็นไปได้ทางกายภาพ (รูปร่างที่ดิน, ชั้นดิน)</li>
                    <li><b>Financially Feasible:</b> มีความเป็นไปได้ทางการเงิน (คุ้มทุน)</li>
                    <li><b>Maximally Productive:</b> สร้างมูลค่าสูงสุดให้เจ้าของและสังคม</li>
                </ul>
                </div>

                {/* SROI Section */}
                <div>
                <h4 className="font-bold text-indigo-900 flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5" /> Social Return on Investment (SROI)
                </h4>
                <p className="text-sm text-gray-600">
                    การแปลงผลกระทบทางสังคมให้เป็นมูลค่าตัวเงิน (Monetization) เพื่อวัดความคุ้มค่าที่มากกว่าผลกำไรทางการเงิน เช่น:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                    <li>มูลค่าพื้นที่สาธารณะที่เอกชนเปิดให้ชุมชนใช้ประโยชน์</li>
                    <li>มูลค่าการลดมลพิษจากการเพิ่มพื้นที่สีเขียว</li>
                    <li>มูลค่าทางเศรษฐกิจจากการจ้างงานในพื้นที่</li>
                </ul>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};