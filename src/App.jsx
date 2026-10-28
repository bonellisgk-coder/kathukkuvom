import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from './components/NavBar';
import ReagentSidebar from './components/ReagentSidebar';
import Workbench from './components/Workbench';
import ObservationLog from './components/ObservationLog';
import FinalReportModal from './components/FinalReportModal';
import { PRESET_MIXTURES, generateRandomMixture, IONS } from './engine/chemistryEngine';

const STAGES = [
  { id: 'preliminary', label: '1. Preliminary & Anions' },
  { id: 'sce',         label: '2. SCE Confirmatory' },
  { id: 'cations',     label: '3. Cation Group Analysis' },
  { id: 'report',      label: '4. Final Report' },
];

const MOBILE_TABS = [
  { id: 'tests',     icon: '🔬', label: 'Tests' },
  { id: 'bench',     icon: '⚗️',  label: 'Bench' },
  { id: 'log',       icon: '📋', label: 'Log' },
];

export default function App() {
  const [mode, setMode]                 = useState('guided');
  const [mixture, setMixture]           = useState(PRESET_MIXTURES[0]);
  const [stage, setStage]               = useState('preliminary');
  const [observations, setObservations] = useState([]);
  const [completedTests, setCompletedTests] = useState(new Set());
  const [showReport, setShowReport]     = useState(false);
  const [userFindings, setUserFindings] = useState({ simpleAnion:'', interferingAnion:'', cation1:'', cation2:'' });
  const [eliminationDone, setEliminationDone] = useState(false);
  const [scePrepped, setScePrepped]     = useState(false);
  const [workbenchState, setWorkbenchState] = useState({ vessel:'test-tube', ions:[] });
  const [mobileTab, setMobileTab]       = useState('bench');

  const allIons = [...mixture.cations, ...mixture.anions, ...mixture.interfering];

  const addObservation = useCallback((entry) => {
    setObservations(prev => [
      ...prev,
      { ...entry, id: Date.now() + Math.random(), timestamp: new Date().toLocaleTimeString() }
    ]);
    // Auto-switch to log on mobile after a test runs
    if (window.innerWidth < 768) {
      setTimeout(() => setMobileTab('log'), 400);
    }
  }, []);

  const markTestDone = useCallback((testId) => {
    setCompletedTests(prev => new Set([...prev, testId]));
  }, []);

  const handleMixtureChange = (mix) => {
    setMixture(mix);
    setObservations([]);
    setCompletedTests(new Set());
    setStage('preliminary');
    setEliminationDone(false);
    setScePrepped(false);
    setWorkbenchState({ vessel:'test-tube', ions:[] });
    setUserFindings({ simpleAnion:'', interferingAnion:'', cation1:'', cation2:'' });
  };

  const handleRandomMixture = () => handleMixtureChange({ ...generateRandomMixture(), id:'random' });

  const sharedProps = {
    mixture, allIons, workbenchState, setWorkbenchState,
    addObservation, markTestDone, completedTests, stage, mode,
    eliminationDone, setEliminationDone, scePrepped, setScePrepped,
  };

  return (
    <div className="bg-animated" style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      <NavBar
        mode={mode} setMode={setMode}
        mixture={mixture} onMixtureChange={handleMixtureChange} onRandom={handleRandomMixture}
        stage={stage} setStage={setStage} stages={STAGES}
        onShowReport={() => setShowReport(true)}
      />

      {/* ── Desktop layout (3 columns) ─────────────────── */}
      <div className="desktop-layout" style={{
        display:'grid',
        gridTemplateColumns:'260px 1fr 300px',
        gap:'10px',
        padding:'10px',
        flex:1,
        minHeight:0,
        overflow:'hidden',
      }}>
        <ReagentSidebar {...sharedProps} />
        <Workbench {...sharedProps} />
        <ObservationLog
          observations={observations} mode={mode} completedTests={completedTests}
          stage={stage} mixture={mixture} onShowReport={() => setShowReport(true)}
        />
      </div>

      {/* ── Mobile layout (single panel + bottom tabs) ─── */}
      <div className="mobile-layout" style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <div style={{ flex:1, overflow:'hidden', padding:'8px 8px 0' }}>
          <AnimatePresence mode="wait">
            {mobileTab === 'tests' && (
              <motion.div key="tests" initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:16 }} transition={{ duration:0.18 }} style={{ height:'100%' }}>
                <ReagentSidebar {...sharedProps} />
              </motion.div>
            )}
            {mobileTab === 'bench' && (
              <motion.div key="bench" initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:16 }} transition={{ duration:0.18 }} style={{ height:'100%' }}>
                <Workbench {...sharedProps} />
              </motion.div>
            )}
            {mobileTab === 'log' && (
              <motion.div key="log" initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:16 }} transition={{ duration:0.18 }} style={{ height:'100%' }}>
                <ObservationLog
                  observations={observations} mode={mode} completedTests={completedTests}
                  stage={stage} mixture={mixture} onShowReport={() => setShowReport(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom tab bar */}
        <nav style={{
          display:'flex', background:'#FFFFFF',
          borderTop:'1px solid #E2E8F0',
          boxShadow:'0 -2px 10px rgba(15,23,42,0.06)',
          padding:'0',
          flexShrink:0,
        }}>
          {MOBILE_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setMobileTab(tab.id)}
              style={{
                flex:1, display:'flex', flexDirection:'column', alignItems:'center',
                justifyContent:'center', gap:'3px', padding:'10px 4px',
                border:'none', background:'transparent', cursor:'pointer',
                color: mobileTab===tab.id ? '#0284C7' : '#94A3B8',
                borderTop: mobileTab===tab.id ? '2px solid #0284C7' : '2px solid transparent',
                transition:'all 0.15s',
                fontSize:'10px', fontWeight: mobileTab===tab.id ? 700 : 500,
              }}>
              <span style={{ fontSize:'20px', lineHeight:1 }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
          <button
            onClick={() => setShowReport(true)}
            style={{
              flex:1, display:'flex', flexDirection:'column', alignItems:'center',
              justifyContent:'center', gap:'3px', padding:'10px 4px',
              border:'none', background:'transparent', cursor:'pointer',
              color:'#059669',
              borderTop:'2px solid transparent',
              fontSize:'10px', fontWeight:500,
            }}>
            <span style={{ fontSize:'20px', lineHeight:1 }}>📝</span>
            Report
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {showReport && (
          <FinalReportModal
            mixture={mixture} observations={observations}
            userFindings={userFindings} setUserFindings={setUserFindings}
            onClose={() => setShowReport(false)} mode={mode}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
