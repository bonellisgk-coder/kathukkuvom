import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { IONS } from '../engine/chemistryEngine';

const ANION_OPTIONS = [
  {id:'', label:'-- Select --'},
  {id:'CO3', label:'Carbonate (CO3 2-)'},
  {id:'S', label:'Sulphide (S 2-)'},
  {id:'Cl', label:'Chloride (Cl-)'},
  {id:'Br', label:'Bromide (Br-)'},
  {id:'NO3', label:'Nitrate (NO3-)'},
  {id:'SO4', label:'Sulphate (SO4 2-)'},
  {id:'None', label:'None detected'},
];

const INTERFERING_OPTIONS = [
  {id:'', label:'-- Select --'},
  {id:'C2O4', label:'Oxalate (C2O4 2-)'},
  {id:'F', label:'Fluoride (F-)'},
  {id:'BO3', label:'Borate (BO3 3-)'},
  {id:'PO4', label:'Phosphate (PO4 3-)'},
  {id:'None', label:'None detected'},
];

const CATION_OPTIONS = [
  {id:'', label:'-- Select --'},
  ...Object.values(IONS).filter(i=>i.type==='cation').map(i=>({
    id: i.id,
    label: `${i.name} (${i.formula})`
  })),
  {id:'None', label:'None detected'},
];

function scoreResult(findings, mixture) {
  let correct = 0, total = 4;
  if (findings.simpleAnion && mixture.anions.includes(findings.simpleAnion)) correct++;
  const expectedInterfering = mixture.interfering[0] || 'None';
  if (findings.interferingAnion === expectedInterfering || (!mixture.interfering.length && findings.interferingAnion === 'None')) correct++;
  if (findings.cation1 && mixture.cations.includes(findings.cation1)) correct++;
  if (findings.cation2 && (mixture.cations.includes(findings.cation2) || (mixture.cations.length < 2 && findings.cation2 === 'None'))) correct++;
  return { correct, total, percent: Math.round(correct/total*100) };
}

export default function FinalReportModal({ mixture, observations, userFindings, setUserFindings, onClose, mode }) {
  const printRef = useRef(null);
  const score = scoreResult(userFindings, mixture);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>kathukkuvom Lab Record</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; color: #111; }
          h1 { font-size: 20px; margin-bottom: 4px; }
          h2 { font-size: 13px; color: #555; margin-bottom: 16px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; }
          th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: left; vertical-align: top; }
          th { background: #f5f5f5; font-weight: 700; }
          .final-box { border: 2px solid #333; padding: 16px; margin-top: 20px; }
          .final-box h3 { margin-bottom: 8px; font-size: 14px; }
          .final-box p { margin: 4px 0; font-size: 13px; }
        </style>
      </head>
      <body>
        <h1>kathukkuvom - Inorganic Qualitative Analysis</h1>
        <h2>Lab Record Book | ${new Date().toLocaleDateString()}</h2>
        <table>
          <thead>
            <tr><th>No.</th><th>Experiment</th><th>Observation</th><th>Inference</th></tr>
          </thead>
          <tbody>
            ${observations.map((obs,i)=>`<tr><td>${i+1}</td><td>${obs.experiment}</td><td>${obs.observation}</td><td>${obs.inference}</td></tr>`).join('')}
          </tbody>
        </table>
        <div class="final-box">
          <h3>FINAL RESULT</h3>
          <p><b>Simple Acid Radical:</b> ${userFindings.simpleAnion || 'Not stated'}</p>
          <p><b>Interfering Acid Radical:</b> ${userFindings.interferingAnion || 'Not stated'}</p>
          <p><b>Basic Radical 1:</b> ${userFindings.cation1 || 'Not stated'}</p>
          <p><b>Basic Radical 2:</b> ${userFindings.cation2 || 'Not stated'}</p>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const selStyle = {
    width:'100%', padding:'9px 12px', borderRadius:'8px',
    background:'#F8FAFC', border:'1px solid #CBD5E1',
    color:'#0F172A', fontSize:'13px', cursor:'pointer', outline:'none',
  };

  const sel = (field, options) => (
    <select
      value={userFindings[field]}
      onChange={e => setUserFindings(prev => ({...prev, [field]: e.target.value}))}
      style={selStyle}>
      {options.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
    </select>
  );

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div
        className="modal-panel"
        initial={{ scale:0.92, opacity:0 }}
        animate={{ scale:1, opacity:1 }}
        exit={{ scale:0.92, opacity:0 }}
        transition={{ type:'spring', stiffness:320, damping:28 }}>

        <div ref={printRef}>
          {/* Header */}
          <div style={{ display:'flex', alignItems:'flex-start', gap:'16px', marginBottom:'24px' }}>
            <div style={{
              width:52, height:52, borderRadius:'14px',
              background:'linear-gradient(135deg,#0284C7,#7C3AED)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'26px', flexShrink:0,
              boxShadow:'0 4px 12px rgba(2,132,199,0.25)',
            }}>⚗️</div>
            <div>
              <div style={{ fontSize:'22px', fontWeight:800, color:'#0F172A', letterSpacing:'-0.02em' }}>
                kathukkuvom — Final Report
              </div>
              <div style={{ fontSize:'13px', color:'#64748B', marginTop:'2px' }}>
                Inorganic Qualitative Analysis — Lab Record Book
              </div>
              <div style={{ fontSize:'11px', color:'#94A3B8', marginTop:'2px' }}>
                {new Date().toLocaleString()}
              </div>
            </div>
            <button onClick={onClose} style={{ marginLeft:'auto', border:'none', background:'#F1F5F9', color:'#64748B', fontSize:'16px', cursor:'pointer', width:32, height:32, borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
          </div>

          {/* Observation Table */}
          <div style={{ marginBottom:'24px' }}>
            <div style={{ fontSize:'15px', fontWeight:800, color:'#0F172A', marginBottom:'12px', display:'flex', alignItems:'center', gap:'10px' }}>
              Observation Table
              <span style={{ fontSize:'11px', background:'#EFF6FF', color:'#0284C7', padding:'3px 10px', borderRadius:'9999px', fontWeight:700, border:'1px solid #BAE6FD' }}>
                {observations.length} entries
              </span>
            </div>
            <div style={{ overflowX:'auto', maxHeight:'300px', overflowY:'auto', borderRadius:'12px', border:'1px solid #E2E8F0' }}>
              <table className="obs-table">
                <thead>
                  <tr>
                    <th style={{ position:'sticky', top:0, zIndex:1 }}>No.</th>
                    <th style={{ position:'sticky', top:0, zIndex:1 }}>Experiment</th>
                    <th style={{ position:'sticky', top:0, zIndex:1 }}>Observation</th>
                    <th style={{ position:'sticky', top:0, zIndex:1 }}>Inference</th>
                  </tr>
                </thead>
                <tbody>
                  {observations.map((obs, i) => (
                    <tr key={obs.id}>
                      <td style={{ color:'#94A3B8', width:30, fontWeight:600 }}>{i+1}</td>
                      <td style={{ color:'#0F172A', fontWeight:600 }}>{obs.experiment}</td>
                      <td style={{ color:'#334155' }}>{obs.observation}</td>
                      <td style={{ color:'#7C3AED', fontWeight:500 }}>{obs.inference}</td>
                    </tr>
                  ))}
                  {observations.length === 0 && (
                    <tr><td colSpan={4} style={{ textAlign:'center', color:'#94A3B8', padding:'24px' }}>No tests performed yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Final answer form */}
          <div style={{ background:'#F0F9FF', border:'1px solid #BAE6FD', borderRadius:'14px', padding:'20px', marginBottom:'20px' }}>
            <div style={{ fontSize:'15px', fontWeight:800, color:'#0F172A', marginBottom:'16px' }}>
              Final Result
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
              <div>
                <div style={{ fontSize:'12px', fontWeight:800, color:'#0284C7', marginBottom:'10px', textTransform:'uppercase', letterSpacing:'0.05em' }}>
                  Acid Radicals
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                  <div>
                    <label style={{ fontSize:'11px', color:'#64748B', display:'block', marginBottom:'5px', fontWeight:600 }}>
                      (i) Simple Acid Radical
                    </label>
                    {sel('simpleAnion', ANION_OPTIONS)}
                  </div>
                  <div>
                    <label style={{ fontSize:'11px', color:'#64748B', display:'block', marginBottom:'5px', fontWeight:600 }}>
                      (ii) Interfering Acid Radical (if any)
                    </label>
                    {sel('interferingAnion', INTERFERING_OPTIONS)}
                  </div>
                </div>
              </div>
              <div>
                <div style={{ fontSize:'12px', fontWeight:800, color:'#7C3AED', marginBottom:'10px', textTransform:'uppercase', letterSpacing:'0.05em' }}>
                  Basic Radicals (Cations)
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                  <div>
                    <label style={{ fontSize:'11px', color:'#64748B', display:'block', marginBottom:'5px', fontWeight:600 }}>
                      (i) Basic Radical 1
                    </label>
                    {sel('cation1', CATION_OPTIONS)}
                  </div>
                  <div>
                    <label style={{ fontSize:'11px', color:'#64748B', display:'block', marginBottom:'5px', fontWeight:600 }}>
                      (ii) Basic Radical 2
                    </label>
                    {sel('cation2', CATION_OPTIONS)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Score */}
          {userFindings.simpleAnion && (
            <div style={{
              background: score.percent >= 75 ? '#F0FDF4' : score.percent >= 50 ? '#FFFBEB' : '#FEF2F2',
              border: `1px solid ${score.percent >= 75 ? '#BBF7D0' : score.percent >= 50 ? '#FDE68A' : '#FECACA'}`,
              borderRadius:'14px', padding:'18px', marginBottom:'16px',
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
                <div style={{ fontSize:'36px' }}>{score.percent >= 75 ? '🎉' : score.percent >= 50 ? '🤔' : '😅'}</div>
                <div>
                  <div style={{ fontSize:'18px', fontWeight:800, color:'#0F172A' }}>
                    {score.correct}/{score.total} Correct ({score.percent}%)
                  </div>
                  <div style={{ fontSize:'13px', color:'#334155', marginTop:'4px' }}>
                    {score.percent===100 ? '🏆 Perfect! All radicals identified correctly.' :
                     score.percent>=75 ? 'Great job! Almost there.' :
                     score.percent>=50 ? 'Good attempt. Review your tests.' :
                     'Keep practicing! Run more confirmatory tests.'}
                  </div>
                  {mode === 'guided' && (
                    <div style={{ fontSize:'11px', color:'#64748B', marginTop:'4px' }}>
                      Actual: Anion={mixture.anions.join(',')}, Interfering={mixture.interfering[0]||'None'}, Cations={mixture.cations.join(',')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ display:'flex', gap:'10px', justifyContent:'flex-end' }}>
          <button onClick={onClose} className="action-btn action-btn-primary">Close</button>
          <button onClick={handlePrint} className="action-btn action-btn-success" style={{ fontWeight:700 }}>🖨️ Print / Export PDF</button>
        </div>
      </motion.div>
    </div>
  );
}
