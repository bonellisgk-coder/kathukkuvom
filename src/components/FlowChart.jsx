import React from 'react';

const GROUPS = [
  { id:'0',   label:'Group 0',   color:'#7C3AED', desc:"NH4OH - Nessler's",           ions:['NH4'] },
  { id:'1',   label:'Group I',   color:'#DC2626', desc:'Dil. HCl -> white ppt',        ions:['Pb','Ag','Hg2'] },
  { id:'2A',  label:'Group IIA', color:'#EA580C', desc:'H2S/dil.HCl -> coloured ppt', ions:['Cu','Cd','Bi'] },
  { id:'2B',  label:'Group IIB', color:'#CA8A04', desc:'H2S/dil.HCl -> acid-soluble', ions:['As','Sb','Sn'] },
  { id:'3',   label:'Group III', color:'#0284C7', desc:'NH4Cl + NH4OH -> gel.ppt',    ions:['Fe','Al','Cr'] },
  { id:'4',   label:'Group IV',  color:'#059669', desc:'H2S/am. -> coloured ppt',      ions:['Co','Ni','Mn','Zn'] },
  { id:'5',   label:'Group V',   color:'#2563EB', desc:'(NH4)2CO3 -> white ppt',       ions:['Ba','Sr','Ca'] },
  { id:'6',   label:'Group VI',  color:'#64748B', desc:'Na2HPO4 + NH4OH -> ppt',      ions:['Mg'] },
];

const GROUP_TEST_IDS = {
  '0':  ['nh4_nesslers'],
  '1':  ['group1_dil_hcl','pb_k2cro4','pb_ki'],
  '2A': ['group2a_h2s','cu_nh4oh_excess','cu_k4fe_cn_6'],
  '2B': [],
  '3':  ['group3_nh4cl_nh4oh','fe_kscn','fe_k4fe_cn_6','al_aluminon'],
  '4':  ['group4_h2s_am','ni_dmg','co_k3fe_cn_6','mn_pbo2','zn_h2s'],
  '5':  ['group5_am_carbonate','ba_k2cro4','sr_am_sulfate','ca_am_oxalate'],
  '6':  ['group6_na2hpo4','mg_na2hpo4'],
};

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

export default function FlowChart({ mixture, completedTests }) {
  return (
    <div style={{ padding:'8px' }}>
      <div style={{ fontSize:'13px', fontWeight:800, color:'#0F172A', marginBottom:'12px' }}>
        Group Separation Flowchart
      </div>

      <div style={{
        background:'#EFF6FF', border:'1px solid #BAE6FD',
        borderRadius:'10px', padding:'8px 12px', fontSize:'11px', color:'#1D4ED8',
        fontWeight:700, marginBottom:'12px', textAlign:'center',
      }}>
        Original Solution
      </div>

      <div style={{ textAlign:'center', color:'#94A3B8', fontSize:'16px', marginBottom:'8px' }}>↓</div>

      {GROUPS.map((grp, idx) => {
        const relevantTests = GROUP_TEST_IDS[grp.id] || [];
        const done = relevantTests.some(t => completedTests.has(t));
        const presentIons = grp.ions.filter(ion => mixture.cations.includes(ion));
        const relevant = presentIons.length > 0;

        return (
          <div key={grp.id} style={{ marginBottom:'6px' }}>
            <div style={{
              background: relevant ? `rgba(${hexToRgb(grp.color)},0.08)` : '#F8FAFC',
              border: `1px solid ${relevant ? `rgba(${hexToRgb(grp.color)},0.35)` : '#E2E8F0'}`,
              borderRadius:'10px', padding:'8px 12px',
              opacity: relevant ? 1 : 0.55,
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom: relevant ? '6px' : '0' }}>
                <span style={{
                  padding:'2px 8px', borderRadius:'6px', fontSize:'10px', fontWeight:800,
                  background:`rgba(${hexToRgb(grp.color)},0.12)`, color:grp.color,
                }}>
                  {grp.label}
                </span>
                <span style={{ fontSize:'10px', color:'#475569', flex:1 }}>{grp.desc}</span>
                {done && <span style={{ color:'#059669', fontSize:'14px', fontWeight:700 }}>✓</span>}
              </div>
              {relevant && (
                <div style={{ display:'flex', gap:'4px', flexWrap:'wrap' }}>
                  {presentIons.map(ion => (
                    <span key={ion} style={{
                      padding:'2px 7px', borderRadius:'5px', fontSize:'10px', fontWeight:700,
                      background:`rgba(${hexToRgb(grp.color)},0.12)`, color:grp.color,
                    }}>{ion}</span>
                  ))}
                </div>
              )}
            </div>
            {idx < GROUPS.length-1 && (
              <div style={{ textAlign:'center', color:'#CBD5E1', fontSize:'14px', margin:'3px 0' }}>↓</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
