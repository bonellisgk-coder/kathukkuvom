import React from 'react';
import { motion } from 'framer-motion';

export default function TestTube({ liquidColor, precipitateColor, liquidHeight = 40, showBubbles, showPrecipitate, label }) {
  const bubblePositions = [
    { left:'20%', delay:'0s' },
    { left:'40%', delay:'0.4s' },
    { left:'60%', delay:'0.8s' },
    { left:'75%', delay:'1.2s' },
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'4px' }}>
      {/* Rim */}
      <div style={{
        width:70, height:7, background:'rgba(100,116,139,0.25)',
        borderRadius:'5px 5px 0 0',
        border:'1.5px solid rgba(100,116,139,0.4)',
        borderBottom:'none',
      }} />

      {/* Body */}
      <div className="test-tube" style={{ position:'relative' }}>
        {/* Liquid */}
        <motion.div
          className="test-tube-liquid"
          animate={{ height: `${liquidHeight}%`, backgroundColor: liquidColor }}
          transition={{ duration:0.8, ease:[0.4,0,0.2,1] }}
          style={{ background: liquidColor, position:'absolute', bottom:0, left:0, right:0, borderRadius:'0 0 30px 30px' }}>
          {/* Shine */}
          <div style={{
            position:'absolute', top:0, left:'8%', width:'18%', bottom:0,
            background:'linear-gradient(to right,rgba(255,255,255,0.35),rgba(255,255,255,0.05))',
            borderRadius:'3px',
          }} />
          {/* Bubbles */}
          {showBubbles && bubblePositions.map((b, i) => (
            <motion.div
              key={i}
              style={{
                position:'absolute', bottom:0, left:b.left,
                width:6+i%3*2, height:6+i%3*2, borderRadius:'50%',
                background:'rgba(255,255,255,0.65)',
              }}
              animate={{ y:[-100, 0], opacity:[0, 0.9, 0] }}
              transition={{ duration:1.5, delay:i*0.4, repeat:Infinity, ease:'easeOut' }}
            />
          ))}
        </motion.div>

        {/* Precipitate */}
        {showPrecipitate && precipitateColor && (
          <motion.div
            className="test-tube-precipitate settling"
            style={{
              background: precipitateColor, position:'absolute',
              bottom:0, left:0, right:0, height:24,
              borderRadius:'0 0 30px 30px', opacity:0.92,
            }}
            initial={{ y:-10, opacity:0 }}
            animate={{ y:0, opacity:0.92 }}
            transition={{ duration:0.8 }}
          />
        )}

        {/* Right reflection */}
        <div style={{
          position:'absolute', top:0, right:'7%', width:'10%', bottom:0,
          background:'linear-gradient(to right,transparent,rgba(255,255,255,0.2))',
          pointerEvents:'none',
        }} />
      </div>

      {/* Label */}
      {label && (
        <div style={{ fontSize:'10px', color:'#64748B', textAlign:'center', maxWidth:84, lineHeight:1.3, marginTop:'2px', fontWeight:600 }}>
          {label}
        </div>
      )}
    </div>
  );
}
