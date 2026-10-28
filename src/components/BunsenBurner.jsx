
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BunsenBurner({ isOn, flameColor, onClick }) {
  const outerFlameColor = flameColor || '#FF6F00';
  const innerFlameColor = flameColor === '#76FF03' ? '#CCFF90' :
                          flameColor === '#FF3D00' ? '#FF6D00' :
                          flameColor === '#D50000' ? '#FF1744' :
                          '#FDD835';

  return (
    <div
      style={{ display:'flex', flexDirection:'column', alignItems:'center', cursor:'pointer', userSelect:'none' }}
      onClick={onClick}
      title={isOn ? 'Burner is on (click to toggle)' : 'Click to heat'}
    >
      {/* Flame */}
      <AnimatePresence>
        {isOn && (
          <div style={{ position:'relative', width:32, height:56 }}>
            {/* Outer flame */}
            <motion.div
              className="flame-outer"
              style={{
                position:'absolute', bottom:0, left:4, right:4,
                height:50, borderRadius:'50% 50% 20% 20%',
                background:`radial-gradient(ellipse at 50% 100%, ${outerFlameColor}, transparent 70%)`,
                filter:'blur(2px)',
              }}
              initial={{ scaleY:0 }}
              animate={{ scaleY:1 }}
              exit={{ scaleY:0 }}
            />
            {/* Inner flame */}
            <motion.div
              className="flame-inner"
              style={{
                position:'absolute', bottom:0, left:8, right:8,
                height:36, borderRadius:'50% 50% 20% 20%',
                background:`radial-gradient(ellipse at 50% 100%, ${innerFlameColor}, transparent 60%)`,
                filter:'blur(1px)',
              }}
              initial={{ scaleY:0 }}
              animate={{ scaleY:1 }}
              exit={{ scaleY:0 }}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Burner barrel */}
      <div style={{
        width:20, height:40, borderRadius:'4px', marginTop:0,
        background:'linear-gradient(to right,#37474F,#546E7A,#37474F)',
        border:'1px solid rgba(0,0,0,0.3)',
      }} />
      {/* Gas adjustment collar */}
      <div style={{ width:26, height:10, borderRadius:'2px', background:'#263238', border:'1px solid rgba(0,0,0,0.3)' }} />
      {/* Base */}
      <div style={{ width:40, height:8, borderRadius:'4px 4px 2px 2px', background:'#1C313A', border:'1px solid rgba(0,0,0,0.3)' }} />
      <div style={{ width:48, height:4, borderRadius:'2px', background:'#263238', border:'1px solid rgba(0,0,0,0.3)' }} />

      <div style={{ fontSize:'10px', color: isOn ? '#F59E0B' : '#475569', marginTop:'4px', fontWeight:600 }}>
        {isOn ? '🔥 ON' : 'Burner'}
      </div>
    </div>
  );
}
