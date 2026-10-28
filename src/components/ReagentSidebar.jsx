import React, { useState } from 'react';
import { runReaction, TEST_CATALOGUE, ELIMINATION_STEPS } from '../engine/chemistryEngine';

const REAGENT_CATEGORIES = {
  acids: {
    label: 'Acids & Bases',
    icon: 'aa',
    items: [
      {id:'dil_hcl', label:'Dil. HCl', color:'#16A34A'},
      {id:'conc_hcl', label:'Conc. HCl', color:'#15803D'},
      {id:'dil_h2so4', label:'Dil. H2SO4', color:'#2563EB'},
      {id:'conc_h2so4', label:'Conc. H2SO4', color:'#1D4ED8'},
      {id:'dil_hno3', label:'Dil. HNO3', color:'#0891B2'},
      {id:'conc_hno3', label:'Conc. HNO3', color:'#0369A1'},
      {id:'ch3cooh', label:'CH3COOH', color:'#7C3AED'},
      {id:'naoh', label:'NaOH', color:'#DC2626'},
      {id:'nh4oh', label:'NH4OH', color:'#059669'},
    ]
  },
  salts: {
    label: 'Salt Reagents',
    icon: 'sa',
    items: [
      {id:'agno3', label:'AgNO3', color:'#475569'},
      {id:'bacl2', label:'BaCl2', color:'#64748B'},
      {id:'cacl2', label:'CaCl2', color:'#6B7280'},
      {id:'feso4', label:'FeSO4 (fresh)', color:'#16A34A'},
      {id:'kmno4', label:'KMnO4', color:'#6D28D9'},
      {id:'k2cro4', label:'K2CrO4', color:'#D97706'},
      {id:'ki', label:'KI', color:'#374151'},
      {id:'kscn', label:'KSCN', color:'#4B5563'},
      {id:'k4fe_cn_6', label:'K4[Fe(CN)6]', color:'#B45309'},
      {id:'k3fe_cn_6', label:'K3[Fe(CN)6]', color:'#B45309'},
      {id:'lead_acetate', label:'Lead Acetate', color:'#374151'},
      {id:'mno2', label:'MnO2', color:'#1F2937'},
      {id:'cu_turnings', label:'Cu-turnings', color:'#92400E'},
      {id:'na2co3', label:'Na2CO3', color:'#4B5563'},
      {id:'h2s_gas', label:'H2S gas', color:'#78716C'},
      {id:'nesslers', label:"Nessler's", color:'#B45309'},
      {id:'dmg', label:'DMG', color:'#7C3AED'},
      {id:'aluminon', label:'Aluminon', color:'#EA580C'},
      {id:'pbo2', label:'PbO2', color:'#1F2937'},
      {id:'am_molybdate', label:'Am. Molybdate', color:'#B45309'},
      {id:'mag_mixture', label:'Magnesia Mix.', color:'#16A34A'},
      {id:'zr_nitrate', label:'ZrOCl2', color:'#475569'},
      {id:'am_carbonate', label:'(NH4)2CO3', color:'#6B7280'},
      {id:'am_sulfate', label:'(NH4)2SO4', color:'#6B7280'},
      {id:'am_oxalate', label:'Am. Oxalate', color:'#6B7280'},
      {id:'na2hpo4', label:'Na2HPO4', color:'#0891B2'},
      {id:'borax', label:'Borax', color:'#0D9488'},
      {id:'k2cr2o7', label:'K2Cr2O7', color:'#EA580C'},
      {id:'ethanol', label:'Ethyl Alcohol', color:'#16A34A'},
      {id:'h2o2', label:'H2O2', color:'#0369A1'},
    ]
  },
  indicators: {
    label: 'Indicators & Papers',
    icon: 'id',
    items: [
      {id:'lime_water', label:'Lime Water', color:'#6B7280'},
      {id:'starch_iodide', label:'Starch-Iodide Paper', color:'#4B5563'},
      {id:'fluorescein', label:'Fluorescein Paper', color:'#D97706'},
      {id:'pb_acetate_paper', label:'Lead Acetate Paper', color:'#6B7280'},
      {id:'hcl_rod', label:'Rod in Conc. HCl', color:'#6B7280'},
      {id:'nh4oh_rod', label:'Rod in NH4OH', color:'#059669'},
    ]
  }
};

export default function ReagentSidebar({
  stage, workbenchState, setWorkbenchState, mixture, allIons,
  addObservation, markTestDone, completedTests, mode,
  eliminationDone, setEliminationDone, scePrepped, setScePrepped
}) {
  const [activeTab, setActiveTab] = useState('tests');
  const [activeCategory, setActiveCategory] = useState('acids');
  const [searchTerm, setSearchTerm] = useState('');

  const currentTests = TEST_CATALOGUE[stage] || TEST_CATALOGUE.preliminary;

  const handleRunTest = (test) => {
    if (completedTests.has(test.id)) return;
    const result = runReaction(test.id, allIons);
    addObservation({
      experiment: test.label,
      observation: result.observation,
      inference: result.inference,
      stage,
      testId: test.id,
      result,
    });
    markTestDone(test.id);
    setWorkbenchState(prev => ({
      ...prev, ions: allIons, lastResult: result, lastTest: test.label,
      heating: test.requiresHeat || false,
    }));
  };

  const handlePrepareSCE = () => {
    setScePrepped(true);
    addObservation({
      experiment: 'Prepare Sodium Carbonate Extract (SCE)',
      observation: 'Boiled sample with Na2CO3, filtered. Clear SCE obtained.',
      inference: 'SCE ready for confirmatory anion tests.',
      stage: 'sce',
      testId: 'prepare_sce',
      result: { color: '#F0FDF4' },
    });
  };

  const handleElimination = (anionId) => {
    setEliminationDone(true);
    const step = ELIMINATION_STEPS[anionId];
    addObservation({
      experiment: `Elimination of ${anionId} (Interfering Radical)`,
      observation: step,
      inference: `${anionId} eliminated. Proceed to Group III separation safely.`,
      stage: 'cations',
      testId: `eliminate_${anionId}`,
      result: { color: '#FEFCE8' },
    });
  };

  const interferingToEliminate = mixture.interfering.filter(i =>
    ['F','BO3','C2O4','PO4'].includes(i)
  );

  const filteredTests = currentTests.filter(t =>
    !searchTerm || t.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const CatIcons = { acids: '⚗️', salts: '🧪', indicators: '📄' };

  return (
    <div className="glass-card-bright" style={{ display:'flex', flexDirection:'column', overflow:'hidden', height:'100%' }}>
      {/* Tabs */}
      <div style={{ display:'flex', borderBottom:'1px solid #E2E8F0', padding:'0 12px', background:'#FAFAFA' }}>
        {[['tests','🔬 Tests'],['reagents','🧪 Reagents']].map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding:'10px 12px', border:'none', background:'transparent', cursor:'pointer',
            fontSize:'12px', fontWeight:700,
            color: activeTab===tab ? '#0284C7' : '#64748B',
            borderBottom: activeTab===tab ? '2px solid #0284C7' : '2px solid transparent',
            transition:'all 0.2s',
          }}>{label}</button>
        ))}
      </div>

      <div style={{ flex:1, overflow:'auto', padding:'10px' }}>
        {activeTab === 'tests' ? (
          <>
            {/* Search */}
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search tests..."
              style={{
                width:'100%', padding:'8px 12px', borderRadius:'8px', marginBottom:'10px',
                background:'#F8FAFC', border:'1px solid #E2E8F0',
                color:'#0F172A', fontSize:'12px', outline:'none',
              }}
            />

            {/* SCE Prep */}
            {stage === 'sce' && !scePrepped && (
              <button
                onClick={handlePrepareSCE}
                className="action-btn action-btn-primary"
                style={{ width:'100%', justifyContent:'center', marginBottom:'8px' }}>
                🧫 Prepare SCE First
              </button>
            )}

            {/* Interfering elimination */}
            {stage === 'cations' && interferingToEliminate.length > 0 && !eliminationDone && (
              <div className="info-box info-box-amber" style={{ marginBottom:'10px' }}>
                <div style={{ fontWeight:700, marginBottom:'4px' }}>Eliminate Interfering Radicals</div>
                <div style={{ fontSize:'11px', marginBottom:'6px' }}>Must eliminate before Group III!</div>
                {interferingToEliminate.map(a => (
                  <button key={a} onClick={() => handleElimination(a)}
                    className="action-btn action-btn-warning"
                    style={{ width:'100%', justifyContent:'center', marginBottom:'4px', fontSize:'11px' }}>
                    Eliminate {a}
                  </button>
                ))}
              </div>
            )}
            {stage === 'cations' && interferingToEliminate.length > 0 && eliminationDone && (
              <div className="info-box info-box-green" style={{ marginBottom:'10px' }}>
                Interfering radicals eliminated — safe to proceed!
              </div>
            )}
            {stage === 'cations' && interferingToEliminate.length > 0 && !eliminationDone && (
              <div className="info-box info-box-red warning-pulse" style={{ marginBottom:'8px', fontSize:'11px' }}>
                Skipping elimination may cause premature co-precipitation!
              </div>
            )}

            {/* Test list */}
            <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
              {filteredTests.map(test => {
                const done = completedTests.has(test.id);
                const needsSCE = stage === 'sce' && !scePrepped && test.id !== 'prepare_sce';
                const needsElim = stage === 'cations' && interferingToEliminate.length > 0 && !eliminationDone &&
                  ['group3_nh4cl_nh4oh','fe_kscn','fe_k4fe_cn_6','al_aluminon'].includes(test.id);
                return (
                  <button
                    key={test.id}
                    className={`test-item ${done ? 'completed' : ''}`}
                    onClick={() => !done && !needsSCE && !needsElim && handleRunTest(test)}
                    disabled={done || needsSCE || needsElim}
                    style={{ opacity: (needsSCE || needsElim) ? 0.4 : 1 }}
                  >
                    <span style={{ fontSize:'16px' }}>{test.icon}</span>
                    <span style={{ flex:1, textAlign:'left', lineHeight:1.3 }}>{test.label}</span>
                    {done && <span style={{ color:'#059669', fontSize:'14px', fontWeight:700 }}>✓</span>}
                    {test.requiresHeat && !done && <span style={{ fontSize:'12px' }}>🔥</span>}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div style={{ display:'flex', gap:'4px', marginBottom:'10px' }}>
              {Object.entries(REAGENT_CATEGORIES).map(([cat, info]) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                  flex:1, padding:'6px 4px', borderRadius:'8px', border:'1px solid',
                  fontSize:'11px', fontWeight:700, cursor:'pointer',
                  background: activeCategory===cat ? '#F0F9FF' : '#F8FAFC',
                  borderColor: activeCategory===cat ? '#0284C7' : '#E2E8F0',
                  color: activeCategory===cat ? '#0284C7' : '#64748B',
                }}>{CatIcons[cat]}</button>
              ))}
            </div>
            <div style={{ fontSize:'12px', color:'#334155', marginBottom:'8px', fontWeight:700 }}>
              {REAGENT_CATEGORIES[activeCategory].label}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4px' }}>
              {REAGENT_CATEGORIES[activeCategory].items.map(item => (
                <div key={item.id} style={{
                  padding:'7px 9px', borderRadius:'8px', fontSize:'11px',
                  background:'#F8FAFC', border:'1px solid #E2E8F0',
                  color:'#334155', display:'flex', alignItems:'center', gap:'6px',
                }}>
                  <span style={{ width:8, height:8, borderRadius:'50%', background:item.color, flexShrink:0, display:'block' }} />
                  <span style={{ lineHeight:1.3, fontSize:'10px', fontWeight:500 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Mixture info */}
      {mode === 'guided' && (
        <div style={{ padding:'10px 12px', borderTop:'1px solid #E2E8F0', fontSize:'11px', background:'#F8FAFC' }}>
          <div style={{ color:'#334155', fontWeight:700, marginBottom:'4px' }}>Mixture Contents:</div>
          <div style={{ color:'#0284C7', fontWeight:600 }}>Cations: {mixture.cations.join(', ')}</div>
          <div style={{ color:'#059669', fontWeight:600 }}>Anions: {[...mixture.anions, ...mixture.interfering].join(', ')}</div>
        </div>
      )}
    </div>
  );
}
