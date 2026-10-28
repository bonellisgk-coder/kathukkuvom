import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlowChart from './FlowChart';

export default function ObservationLog({ observations, mode, completedTests, stage, mixture, onShowReport }) {
  const [activeView, setActiveView] = useState('log');
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior:'smooth' });
  }, [observations]);

  const stageColors = {
    preliminary: '#0284C7',
    sce: '#7C3AED',
    cations: '#D97706',
    report: '#059669',
  };

  return (
    <div className="glass-card-bright" style={{ display:'flex', flexDirection:'column', height:'100%', overflow:'hidden' }}>
      {/* Header */}
      <div style={{ padding:'10px 12px', borderBottom:'1px solid #E2E8F0', display:'flex', alignItems:'center', gap:'8px', background:'#FAFAFA' }}>
        <span style={{ fontSize:'18px' }}>📋</span>
        <span style={{ fontSize:'13px', fontWeight:800, color:'#0F172A', flex:1 }}>Lab Record</span>
        <span style={{ fontSize:'11px', color:'#64748B', background:'#F1F5F9', padding:'2px 8px', borderRadius:'9999px', fontWeight:600, border:'1px solid #E2E8F0' }}>
          {observations.length} tests
        </span>
      </div>

      {/* View toggle */}
      <div style={{ display:'flex', borderBottom:'1px solid #E2E8F0', padding:'0 12px', background:'#FAFAFA' }}>
        {[['log','📋 Log'],['flowchart','🗺️ Flow']].map(([v,label]) => (
          <button key={v} onClick={() => setActiveView(v)} style={{
            padding:'8px 12px', border:'none', background:'transparent', cursor:'pointer',
            fontSize:'11px', fontWeight:700,
            color: activeView===v ? '#7C3AED' : '#64748B',
            borderBottom: activeView===v ? '2px solid #7C3AED' : '2px solid transparent',
            transition:'all 0.2s',
          }}>{label}</button>
        ))}
      </div>

      <div style={{ flex:1, overflow:'auto', padding:'8px' }}>
        {activeView === 'log' ? (
          <>
            {observations.length === 0 ? (
              <div style={{ textAlign:'center', color:'#94A3B8', fontSize:'12px', padding:'40px 20px' }}>
                <div style={{ fontSize:'44px', marginBottom:'12px' }}>🔬</div>
                <div style={{ fontWeight:600, color:'#64748B' }}>Run tests from the left panel</div>
                <div style={{ color:'#94A3B8', marginTop:'4px' }}>Observations will be auto-logged here</div>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
                {/* Column headers */}
                <div style={{
                  display:'grid', gridTemplateColumns:'2fr 2.5fr 2fr', gap:'6px',
                  padding:'7px 10px', fontSize:'10px', fontWeight:700, color:'#64748B',
                  textTransform:'uppercase', letterSpacing:'0.06em',
                  borderBottom:'1px solid #E2E8F0',
                  background:'#F8FAFC', borderRadius:'8px 8px 0 0',
                  position:'sticky', top:0, zIndex:1,
                }}>
                  <span>Experiment</span>
                  <span>Observation</span>
                  <span>{mode==='exam' ? '(Inference hidden)' : 'Inference'}</span>
                </div>

                <AnimatePresence>
                  {observations.map((obs, idx) => (
                    <motion.div
                      key={obs.id}
                      initial={{ opacity:0, x:10 }}
                      animate={{ opacity:1, x:0 }}
                      transition={{ duration:0.25 }}
                      className={idx === observations.length-1 ? 'log-row-new' : ''}
                      style={{
                        display:'grid', gridTemplateColumns:'2fr 2.5fr 2fr', gap:'6px',
                        padding:'8px 10px', fontSize:'11px', borderRadius:'8px',
                        borderLeft: `3px solid ${stageColors[obs.stage] || '#CBD5E1'}`,
                        marginBottom:'2px',
                        background: idx%2===0 ? '#FFFFFF' : '#F8FAFC',
                        border: '1px solid #F1F5F9',
                        borderLeft: `3px solid ${stageColors[obs.stage] || '#CBD5E1'}`,
                      }}>
                      <div style={{ color:'#0F172A', lineHeight:1.4, fontSize:'10px', fontWeight:600 }}>
                        {obs.experiment}
                        {obs.result?.requiresHeat && <span style={{ color:'#D97706', marginLeft:'4px' }}>🔥</span>}
                      </div>
                      <div style={{ color:'#334155', lineHeight:1.4, fontSize:'10px' }}>
                        {obs.observation}
                        {obs.result?.precipitate && (
                          <span style={{
                            display:'inline-flex', alignItems:'center', gap:'3px',
                            marginLeft:'4px', padding:'1px 5px', borderRadius:'4px',
                            background: obs.result.precipitateColor || '#E2E8F0',
                            fontSize:'9px', fontWeight:700,
                            color: obs.result.precipitateColor === '#212121' ? '#fff' : '#1E293B',
                          }}>
                            ↓ {obs.result.precipitate}
                          </span>
                        )}
                        {obs.result?.gas && (
                          <span style={{ color:'#D97706', marginLeft:'4px', fontSize:'9px', fontWeight:700 }}>
                            ↑{obs.result.gas}
                          </span>
                        )}
                      </div>
                      {mode === 'guided' ? (
                        <div style={{ color:'#7C3AED', lineHeight:1.4, fontSize:'10px', fontWeight:500 }}>
                          {obs.inference}
                        </div>
                      ) : (
                        <div style={{ color:'#94A3B8', fontSize:'10px', fontStyle:'italic' }}>
                          [hidden in exam mode]
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={logEndRef} />
              </div>
            )}
          </>
        ) : (
          <FlowChart mixture={mixture} completedTests={completedTests} mode={mode} />
        )}
      </div>

      {/* Footer */}
      <div style={{ padding:'10px 12px', borderTop:'1px solid #E2E8F0', display:'flex', gap:'6px', background:'#FAFAFA' }}>
        <button className="action-btn action-btn-success" onClick={onShowReport} style={{ flex:1, justifyContent:'center', fontWeight:700 }}>
          📝 Submit Report
        </button>
      </div>
    </div>
  );
}
