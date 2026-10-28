import React, { useState } from 'react';
import { PRESET_MIXTURES } from '../engine/chemistryEngine';

export default function NavBar({ mode, setMode, mixture, onMixtureChange, onRandom, stage, setStage, stages, onShowReport }) {
  const [showMixtures, setShowMixtures] = useState(false);
  const [showStages, setShowStages] = useState(false);
  const [showModeMenu, setShowModeMenu] = useState(false);

  const stageOrder = ['preliminary','sce','cations','report'];
  const currentIdx = stageOrder.indexOf(stage);

  return (
    <nav style={{
      background: 'rgba(255,255,255,0.97)',
      borderBottom: '1px solid #E2E8F0',
      backdropFilter: 'blur(16px)',
      padding: '0 12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      minHeight: '52px',
      flexWrap: 'nowrap',
    }}>
      {/* Brand */}
      <div style={{ display:'flex', alignItems:'center', gap:'8px', flexShrink:0 }}>
        <div style={{
          width:34, height:34, borderRadius:'9px',
          background:'linear-gradient(135deg,#0284C7,#7C3AED)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'17px', flexShrink:0,
          boxShadow:'0 2px 8px rgba(2,132,199,0.3)',
        }}>⚗️</div>
        <div>
          <div style={{ fontSize:'15px', fontWeight:800, color:'#0F172A', letterSpacing:'-0.02em', lineHeight:1.1 }}>
            kathukkuvom
          </div>
          <div className="hide-mobile" style={{ fontSize:'10px', color:'#64748B', fontWeight:500 }}>
            Inorganic QA Lab
          </div>
        </div>
      </div>

      <div className="hide-mobile" style={{ width:1, height:28, background:'#E2E8F0', flexShrink:0 }} />

      {/* Mode toggle - desktop */}
      <div className="hide-mobile" style={{ display:'flex', gap:'2px', background:'#F1F5F9', borderRadius:'9px', padding:'3px', border:'1px solid #E2E8F0', flexShrink:0 }}>
        {[['guided','🔓 Guided'],['exam','🔒 Exam']].map(([m,label]) => (
          <button key={m} onClick={() => setMode(m)} style={{
            padding:'4px 10px', borderRadius:'6px', border:'none', cursor:'pointer',
            fontSize:'11px', fontWeight:600,
            background: mode===m ? '#FFFFFF' : 'transparent',
            color: mode===m ? '#0284C7' : '#64748B',
            boxShadow: mode===m ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            transition:'all 0.15s', whiteSpace:'nowrap',
          }}>{label}</button>
        ))}
      </div>

      {/* Mixture selector */}
      <div style={{ position:'relative', flexShrink:0 }}>
        <button onClick={() => { setShowMixtures(!showMixtures); setShowStages(false); }} style={{
          padding:'6px 10px', borderRadius:'8px', border:'1px solid #CBD5E1',
          background:'#FFFFFF', color:'#0F172A', cursor:'pointer', fontSize:'11px',
          display:'flex', alignItems:'center', gap:'5px', fontWeight:600,
          boxShadow:'0 1px 2px rgba(0,0,0,0.05)', whiteSpace:'nowrap',
        }}>
          🧫 <span className="hide-mobile">{mixture.name || 'Select'}</span><span className="show-mobile">Mix</span>
          <span style={{ color:'#94A3B8', fontSize:'9px' }}>▼</span>
        </button>
        {showMixtures && (
          <div style={{
            position:'absolute', top:'calc(100% + 6px)', left:0, zIndex:200,
            background:'#FFFFFF', border:'1px solid #CBD5E1', borderRadius:'12px',
            padding:'8px', minWidth:'200px', boxShadow:'0 12px 28px -4px rgba(15,23,42,0.14)',
          }}>
            <div style={{ fontSize:'10px', fontWeight:700, color:'#64748B', padding:'3px 8px 6px', textTransform:'uppercase' }}>Standard Mixtures</div>
            {PRESET_MIXTURES.map(m => (
              <button key={m.id} onClick={() => { onMixtureChange(m); setShowMixtures(false); }} style={{
                display:'block', width:'100%', padding:'7px 10px', borderRadius:'7px', border:'none',
                background: mixture.id===m.id ? '#F0F9FF' : 'transparent',
                color: mixture.id===m.id ? '#0284C7' : '#1E293B',
                cursor:'pointer', fontSize:'12px', textAlign:'left', fontWeight: mixture.id===m.id ? 700 : 500,
              }}>{m.name}</button>
            ))}
            <div style={{ borderTop:'1px solid #E2E8F0', marginTop:'4px', paddingTop:'4px' }}>
              <button onClick={() => { onRandom(); setShowMixtures(false); }} style={{
                display:'block', width:'100%', padding:'7px 10px', borderRadius:'7px', border:'none',
                background:'#FAF5FF', color:'#7C3AED', cursor:'pointer', fontSize:'12px', textAlign:'left', fontWeight:700,
              }}>🎲 Random Mixture</button>
            </div>
          </div>
        )}
      </div>

      {/* Stage selector - desktop inline pills */}
      <div className="hide-mobile" style={{ display:'flex', gap:'5px', flex:1, justifyContent:'center', flexWrap:'nowrap', overflow:'hidden' }}>
        {stages.map((s) => {
          const thisIdx = stageOrder.indexOf(s.id);
          const isDone = thisIdx < currentIdx;
          const isActive = s.id === stage;
          return (
            <button key={s.id} onClick={() => setStage(s.id)}
              className={`stage-pill ${isDone ? 'stage-pill-done' : isActive ? 'stage-pill-active' : 'stage-pill-inactive'}`}
              style={{ fontSize:'11px', padding:'4px 10px' }}>
              {isDone ? '✓ ' : ''}{s.label}
            </button>
          );
        })}
      </div>

      {/* Stage selector - mobile dropdown */}
      <div className="show-mobile" style={{ position:'relative', flex:1 }}>
        <button onClick={() => { setShowStages(!showStages); setShowMixtures(false); }} style={{
          width:'100%', padding:'6px 10px', borderRadius:'8px', border:'1px solid #CBD5E1',
          background:'#F0F9FF', color:'#0284C7', cursor:'pointer', fontSize:'11px',
          display:'flex', alignItems:'center', justifyContent:'space-between', fontWeight:700,
        }}>
          <span>{stages.find(s=>s.id===stage)?.label || 'Stage'}</span>
          <span style={{ fontSize:'9px' }}>▼</span>
        </button>
        {showStages && (
          <div style={{
            position:'absolute', top:'calc(100% + 6px)', left:0, right:0, zIndex:200,
            background:'#FFFFFF', border:'1px solid #CBD5E1', borderRadius:'12px',
            padding:'6px', boxShadow:'0 12px 28px rgba(15,23,42,0.14)',
          }}>
            {stages.map((s) => {
              const thisIdx = stageOrder.indexOf(s.id);
              const isDone = thisIdx < currentIdx;
              const isActive = s.id === stage;
              return (
                <button key={s.id} onClick={() => { setStage(s.id); setShowStages(false); }} style={{
                  display:'block', width:'100%', padding:'8px 10px', borderRadius:'7px', border:'none',
                  background: isActive ? '#F0F9FF' : isDone ? '#F0FDF4' : 'transparent',
                  color: isActive ? '#0284C7' : isDone ? '#059669' : '#1E293B',
                  cursor:'pointer', fontSize:'12px', textAlign:'left', fontWeight: isActive ? 700 : 500,
                }}>{isDone ? '✓ ' : ''}{s.label}</button>
              );
            })}
          </div>
        )}
      </div>

      {/* Report button - desktop */}
      <button className="hide-mobile" onClick={onShowReport}
        className="action-btn action-btn-success hide-mobile"
        style={{ flexShrink:0, fontWeight:700, whiteSpace:'nowrap' }}>
        📋 Final Report
      </button>

      {/* Mode button mobile */}
      <button className="show-mobile" onClick={() => setMode(mode==='guided' ? 'exam' : 'guided')} style={{
        padding:'6px 10px', borderRadius:'8px', border:'1px solid #E2E8F0',
        background: mode==='guided' ? '#F0FDF4' : '#FEF2F2',
        color: mode==='guided' ? '#059669' : '#DC2626',
        fontSize:'11px', fontWeight:700, cursor:'pointer', flexShrink:0,
      }}>
        {mode==='guided' ? '🔓' : '🔒'}
      </button>
    </nav>
  );
}
