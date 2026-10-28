import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TestTube from './TestTube';
import BunsenBurner from './BunsenBurner';
import { getSolutionColor } from '../engine/chemistryEngine';

export default function Workbench({
  mixture, allIons, workbenchState, setWorkbenchState,
  addObservation, markTestDone, completedTests, stage, mode,
  eliminationDone, scePrepped, setScePrepped
}) {
  const [heating, setHeating] = useState(false);
  const [centrifuging, setCentrifuging] = useState(false);
  const [centrifugeSplit, setCentrifugeSplit] = useState(false);
  const [evaporating, setEvaporating] = useState(false);
  const [showFume, setShowFume] = useState(false);

  const lastResult = workbenchState.lastResult;
  const baseColor = getSolutionColor(mixture.cations);
  const liquidColor = lastResult?.color || baseColor;
  const hasPrecipitate = !!(lastResult?.precipitate);
  const hasEffervescence = !!(lastResult?.effervescence);
  const hasFumes = !!(lastResult?.fumes);
  const hasGas = !!(lastResult?.gas);
  const flameColor = lastResult?.flameColor;

  useEffect(() => {
    if (hasGas || hasFumes) {
      setShowFume(true);
      const t = setTimeout(() => setShowFume(false), 4000);
      return () => clearTimeout(t);
    }
  }, [lastResult]);

  const handleHeat = () => {
    setHeating(true);
    setTimeout(() => setHeating(false), 3000);
    addObservation({
      experiment: 'Heat on Bunsen Burner',
      observation: heating ? 'Heating continued.' : 'Applied heat.',
      inference: 'Temperature raised to accelerate reaction.',
      stage,
      testId: 'heat_action',
      result: { color: liquidColor },
    });
  };

  const handleCentrifuge = () => {
    setCentrifuging(true);
    setTimeout(() => {
      setCentrifuging(false);
      setCentrifugeSplit(true);
    }, 2000);
    addObservation({
      experiment: 'Centrifuge',
      observation: hasPrecipitate ? `Precipitate collected at bottom: ${lastResult.precipitate}.` : 'No visible precipitate.',
      inference: hasPrecipitate ? 'Residue separated from centrifugate.' : 'No separation needed.',
      stage,
      testId: 'centrifuge_action',
      result: { color: liquidColor },
    });
  };

  const handleEvaporate = () => {
    setEvaporating(true);
    setTimeout(() => setEvaporating(false), 2500);
    addObservation({
      experiment: 'Evaporate in China Dish',
      observation: 'Heated gently until volume reduced.',
      inference: 'Concentration increased; volatile interfering radicals removed.',
      stage,
      testId: 'evaporate_action',
      result: { color: liquidColor },
    });
  };

  const handleBoilCool = () => {
    setHeating(true);
    setTimeout(() => setHeating(false), 2000);
    addObservation({
      experiment: 'Boil & Cool',
      observation: 'Solution boiled and cooled to room temperature.',
      inference: 'CO2 expelled from SCE; ready for confirmatory tests.',
      stage,
      testId: 'boil_cool_action',
      result: { color: liquidColor },
    });
  };

  const handleFilter = () => {
    addObservation({
      experiment: 'Filter',
      observation: 'Passed through filter paper. Clear filtrate collected.',
      inference: 'Residue on filter paper; filtrate ready for further tests.',
      stage,
      testId: 'filter_action',
      result: { color: liquidColor },
    });
  };

  const handleReset = () => {
    setCentrifugeSplit(false);
    setWorkbenchState(prev => ({ ...prev, lastResult: null, lastTest: null }));
  };

  return (
    <div className="glass-card-bright" style={{ display:'flex', flexDirection:'column', height:'100%', overflow:'hidden', minHeight:0 }}>
      {/* Header */}
      <div style={{
        padding:'10px 14px',
        borderBottom:'1px solid #E2E8F0',
        display:'flex', alignItems:'center', gap:'10px',
        background:'#FAFAFA', flexShrink:0,
      }}>
        <span style={{ fontSize:'20px' }}>🔬</span>
        <div>
          <div style={{ fontSize:'13px', fontWeight:700, color:'#0F172A' }}>Interactive Workbench</div>
          <div style={{ fontSize:'11px', color:'#64748B' }}>{workbenchState.lastTest || 'Select a test to begin'}</div>
        </div>
        {centrifuging && (
          <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:'6px', color:'#0284C7', fontSize:'12px', fontWeight:600 }}>
            <span className="spin" style={{ fontSize:'16px' }}>⚙️</span> Centrifuging...
          </div>
        )}
        {evaporating && (
          <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:'6px', color:'#D97706', fontSize:'12px', fontWeight:600 }}>
            💨 Evaporating...
          </div>
        )}
      </div>

      {/* Workbench area */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'16px', position:'relative', background:'linear-gradient(160deg,#F8FAFC 0%,#EFF6FF 100%)', overflow:'auto', minHeight:0 }}>

        {/* Result Banner */}
        <AnimatePresence>
          {lastResult && (
            <motion.div
              initial={{ opacity:0, y:-12 }}
              animate={{ opacity:1, y:0 }}
              exit={{ opacity:0 }}
              style={{
                position:'absolute', top:'12px', left:'12px', right:'12px',
                background:'#FFFFFF',
                border:'1px solid #BAE6FD',
                borderRadius:'12px', padding:'12px 16px', fontSize:'12px',
                boxShadow:'0 4px 12px rgba(2,132,199,0.1)',
              }}>
              <div style={{ fontWeight:700, color:'#0284C7', marginBottom:'4px' }}>
                🔬 {workbenchState.lastTest}
              </div>
              <div style={{ color:'#1E293B', marginBottom:'3px' }}>
                <span style={{ color:'#64748B', fontWeight:600 }}>Obs: </span>{lastResult.observation}
              </div>
              {mode === 'guided' && (
                <div style={{ color:'#7C3AED' }}>
                  <span style={{ color:'#64748B', fontWeight:600 }}>Inf: </span>{lastResult.inference}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vessels */}
        <div style={{ display:'flex', alignItems:'flex-end', gap:'36px', marginTop: lastResult ? '90px' : '0' }}>
          {centrifugeSplit ? (
            <div style={{ display:'flex', gap:'28px', alignItems:'flex-end' }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'8px' }}>
                <div style={{ fontSize:'11px', color:'#DC2626', fontWeight:700, background:'#FEF2F2', padding:'2px 10px', borderRadius:'20px', border:'1px solid #FECACA' }}>RESIDUE</div>
                <TestTube
                  liquidColor={liquidColor}
                  precipitateColor={lastResult?.precipitateColor}
                  liquidHeight={hasPrecipitate ? 25 : 15}
                  showBubbles={false}
                  showPrecipitate={hasPrecipitate}
                  label="Residue"
                />
              </div>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'8px' }}>
                <div style={{ fontSize:'11px', color:'#0284C7', fontWeight:700, background:'#EFF6FF', padding:'2px 10px', borderRadius:'20px', border:'1px solid #BAE6FD' }}>CENTRIFUGATE</div>
                <TestTube
                  liquidColor={hasPrecipitate ? baseColor : liquidColor}
                  precipitateColor={null}
                  liquidHeight={45}
                  showBubbles={false}
                  showPrecipitate={false}
                  label="Centrifugate"
                />
              </div>
            </div>
          ) : (
            <TestTube
              liquidColor={liquidColor}
              precipitateColor={lastResult?.precipitateColor}
              liquidHeight={lastResult ? 55 : 30}
              showBubbles={hasEffervescence || (heating && !hasPrecipitate)}
              showPrecipitate={hasPrecipitate}
              label={workbenchState.lastTest || 'Sample'}
            />
          )}

          <BunsenBurner isOn={heating} flameColor={flameColor} onClick={handleHeat} />
        </div>

        {/* Gas Fume Indicator */}
        <AnimatePresence>
          {showFume && (
            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              exit={{ opacity:0 }}
              style={{ position:'absolute', right:'60px', top:'50%', display:'flex', flexDirection:'column', gap:'8px' }}>
              {[0,1,2].map(i => (
                <motion.div
                  key={i}
                  style={{
                    width:16, height:16, borderRadius:'50%',
                    background: lastResult?.gasColor || 'rgba(150,150,150,0.5)',
                  }}
                  animate={{ y:[-20*i,-100-20*i], opacity:[0.7,0], scale:[1,2] }}
                  transition={{ duration:2, delay:i*0.4, repeat:Infinity }}
                />
              ))}
              <div style={{ fontSize:'11px', color:'#D97706', textAlign:'center', marginTop:'8px', fontWeight:700 }}>
                {lastResult?.gas} ↑
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Flame colour indicator */}
        <AnimatePresence>
          {flameColor && !heating && (
            <motion.div
              initial={{ opacity:0, scale:0.8 }}
              animate={{ opacity:1, scale:1 }}
              exit={{ opacity:0 }}
              style={{
                position:'absolute', bottom:'70px', left:'50%', transform:'translateX(-50%)',
                background:'#FFFBEB',
                border:`2px solid ${flameColor}`,
                borderRadius:'10px', padding:'6px 14px', fontSize:'12px', fontWeight:700,
                color:'#1E293B',
                boxShadow:`0 4px 12px ${flameColor}40`,
              }}>
              🕯️ Flame: {flameColor === '#76FF03' ? 'Apple-Green (Ba²⁺)' :
                          flameColor === '#FF3D00' ? 'Brick-Red (Ca²⁺)' :
                          flameColor === '#D50000' ? 'Crimson (Sr²⁺)' :
                          flameColor === '#00E5FF' ? 'Bluish-Green (Cu²⁺)' :
                          flameColor === '#64DD17' ? 'Green-Edge (BO₃/F⁻)' :
                          'Characteristic Colour'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Bar */}
      <div style={{ padding:'8px 10px', borderTop:'1px solid #E2E8F0', display:'flex', gap:'5px', flexWrap:'wrap', background:'#FAFAFA', flexShrink:0 }}>
        <button className="action-btn action-btn-warning" onClick={handleHeat} disabled={heating}>
          {heating ? '🔥 Heating...' : '🔥 Heat'}
        </button>
        <button className="action-btn action-btn-primary" onClick={handleBoilCool}>
          ♻️ Boil & Cool
        </button>
        <button className="action-btn action-btn-purple" onClick={handleCentrifuge} disabled={centrifuging}>
          {centrifuging ? '⚙️ Spinning...' : '⚙️ Centrifuge'}
        </button>
        <button className="action-btn action-btn-primary" onClick={handleFilter}>
          🔽 Filter
        </button>
        <button className="action-btn action-btn-warning" onClick={handleEvaporate} disabled={evaporating}>
          {evaporating ? '💨 Evaporating...' : '💨 Evaporate'}
        </button>
        {centrifugeSplit && (
          <button className="action-btn action-btn-danger" onClick={handleReset}>
            🔄 Reset
          </button>
        )}
      </div>
    </div>
  );
}
