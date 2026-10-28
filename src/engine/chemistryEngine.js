// QualiLab Chemistry Engine
export const IONS = {
  CO3:  { id:'CO3',  name:'Carbonate',  formula:'CO\u2083\u00b2\u207b', type:'simple_anion'      },
  S:    { id:'S',    name:'Sulphide',   formula:'S\u00b2\u207b',    type:'simple_anion'      },
  Cl:   { id:'Cl',   name:'Chloride',   formula:'Cl\u207b',   type:'simple_anion'      },
  Br:   { id:'Br',   name:'Bromide',    formula:'Br\u207b',   type:'simple_anion'      },
  NO3:  { id:'NO3',  name:'Nitrate',    formula:'NO\u2083\u207b',  type:'simple_anion'      },
  SO4:  { id:'SO4',  name:'Sulphate',   formula:'SO\u2084\u00b2\u207b', type:'simple_anion'  },
  C2O4: { id:'C2O4', name:'Oxalate',    formula:'C\u2082O\u2084\u00b2\u207b', type:'interfering_anion' },
  F:    { id:'F',    name:'Fluoride',   formula:'F\u207b',    type:'interfering_anion' },
  BO3:  { id:'BO3',  name:'Borate',     formula:'BO\u2083\u00b3\u207b', type:'interfering_anion' },
  PO4:  { id:'PO4',  name:'Phosphate',  formula:'PO\u2084\u00b3\u207b', type:'interfering_anion' },
  NH4:  { id:'NH4',  name:'Ammonium',   formula:'NH\u2084\u207a', type:'cation', group:0   },
  Pb:   { id:'Pb',   name:'Lead',       formula:'Pb\u00b2\u207a', type:'cation', group:1   },
  Ag:   { id:'Ag',   name:'Silver',     formula:'Ag\u207a',   type:'cation', group:1   },
  Hg2:  { id:'Hg2',  name:'Mercurous',  formula:'Hg\u2082\u00b2\u207a', type:'cation', group:1   },
  Cu:   { id:'Cu',   name:'Copper',     formula:'Cu\u00b2\u207a', type:'cation', group:'2A', solutionColor:'#1E90FF' },
  Cd:   { id:'Cd',   name:'Cadmium',    formula:'Cd\u00b2\u207a', type:'cation', group:'2A' },
  Bi:   { id:'Bi',   name:'Bismuth',    formula:'Bi\u00b3\u207a', type:'cation', group:'2A' },
  As:   { id:'As',   name:'Arsenic',    formula:'As\u00b3\u207a', type:'cation', group:'2B' },
  Sb:   { id:'Sb',   name:'Antimony',   formula:'Sb\u00b3\u207a', type:'cation', group:'2B' },
  Sn:   { id:'Sn',   name:'Tin',        formula:'Sn\u00b2\u207a', type:'cation', group:'2B' },
  Fe:   { id:'Fe',   name:'Iron(III)',   formula:'Fe\u00b3\u207a', type:'cation', group:3,  solutionColor:'#CD853F' },
  Al:   { id:'Al',   name:'Aluminium',  formula:'Al\u00b3\u207a', type:'cation', group:3   },
  Cr:   { id:'Cr',   name:'Chromium',   formula:'Cr\u00b3\u207a', type:'cation', group:3,  solutionColor:'#228B22' },
  Co:   { id:'Co',   name:'Cobalt',     formula:'Co\u00b2\u207a', type:'cation', group:4,  solutionColor:'#FF69B4' },
  Ni:   { id:'Ni',   name:'Nickel',     formula:'Ni\u00b2\u207a', type:'cation', group:4,  solutionColor:'#7CFC00' },
  Mn:   { id:'Mn',   name:'Manganese',  formula:'Mn\u00b2\u207a', type:'cation', group:4   },
  Zn:   { id:'Zn',   name:'Zinc',       formula:'Zn\u00b2\u207a', type:'cation', group:4   },
  Ba:   { id:'Ba',   name:'Barium',     formula:'Ba\u00b2\u207a', type:'cation', group:5   },
  Sr:   { id:'Sr',   name:'Strontium',  formula:'Sr\u00b2\u207a', type:'cation', group:5   },
  Ca:   { id:'Ca',   name:'Calcium',    formula:'Ca\u00b2\u207a', type:'cation', group:5   },
  Mg:   { id:'Mg',   name:'Magnesium',  formula:'Mg\u00b2\u207a', type:'cation', group:6   },
};

export const PRESET_MIXTURES = [
  { id:'mix1', name:'CuSO\u2084 + NH\u2084Cl',      cations:['Cu','NH4'], anions:['SO4'], interfering:[] },
  { id:'mix2', name:'Pb(NO\u2083)\u2082 + BaC\u2082O\u2084', cations:['Pb','Ba'], anions:['NO3'], interfering:['C2O4'] },
  { id:'mix3', name:'NiCl\u2082 + Na\u2083PO\u2084',  cations:['Ni'],      anions:['Cl'],  interfering:['PO4'] },
  { id:'mix4', name:'FeCl\u2083 + Al\u2082(SO\u2084)\u2083', cations:['Fe','Al'], anions:['Cl','SO4'], interfering:[] },
  { id:'mix5', name:'Co(NO\u2083)\u2082 + CaF\u2082', cations:['Co','Ca'], anions:['NO3'], interfering:['F'] },
  { id:'mix6', name:'MnSO\u2084 + ZnCl\u2082',       cations:['Mn','Zn'], anions:['SO4','Cl'], interfering:[] },
  { id:'mix7', name:'AgNO\u2083 + Na\u2082CO\u2083',  cations:['Ag'],      anions:['NO3','CO3'], interfering:[] },
  { id:'mix8', name:'CdCl\u2082 + MgSO\u2084',       cations:['Cd','Mg'], anions:['Cl','SO4'], interfering:[] },
];

export const ELIMINATION_STEPS = {
  F:    'Evaporate Group II filtrate to dryness with Conc. HCl (3-4 times) in a china dish.',
  BO3:  'Evaporate Group II filtrate to dryness with Conc. HCl (3-4 times) in a china dish.',
  C2O4: 'Evaporate Group II filtrate with Conc. HNO3 to oxidise oxalate to CO2.',
  PO4:  'Boil off H2S. Add Conc. HNO3 + ZrOCl2 solution; centrifuge; discard Zr3(PO4)4 precipitate.',
};

export function generateRandomMixture() {
  const simpleAnions = ['CO3','S','Cl','Br','NO3','SO4'];
  const interferingAnions = ['C2O4','F','BO3','PO4'];
  const allCations = Object.values(IONS).filter(i => i.type === 'cation').map(i => i.id);
  const anion = simpleAnions[Math.floor(Math.random() * simpleAnions.length)];
  const interfering = Math.random() > 0.4 ? [interferingAnions[Math.floor(Math.random() * interferingAnions.length)]] : [];
  const c1 = allCations[Math.floor(Math.random() * allCations.length)];
  let c2 = allCations[Math.floor(Math.random() * allCations.length)];
  while (c2 === c1) c2 = allCations[Math.floor(Math.random() * allCations.length)];
  return { cations:[c1,c2], anions:[anion], interfering, name:'Unknown Mixture' };
}

export function getSolutionColor(cations) {
  for (const cId of cations) {
    if (IONS[cId] && IONS[cId].solutionColor) return IONS[cId].solutionColor;
  }
  return '#c8d8f0';
}

export function runReaction(testId, presentIons) {
  const has = (id) => presentIons.includes(id);
  const r = { observation:'No visible change.', inference:'No specific ion indicated.', color:null, precipitate:null, precipitateColor:null, gas:null, gasColor:null, flameColor:null, effervescence:false, fumes:false };
  
  if (testId === 'physical_colour') {
    if (has('Cu')) { r.observation='Blue/blue-green solution.'; r.inference='Cu\u00b2\u207a indicated.'; r.color='#1565C0'; }
    else if (has('Ni')) { r.observation='Green solution.'; r.inference='Ni\u00b2\u207a indicated.'; r.color='#2E7D32'; }
    else if (has('Cr')) { r.observation='Dark green solution.'; r.inference='Cr\u00b3\u207a indicated.'; r.color='#1B5E20'; }
    else if (has('Co')) { r.observation='Pink/rose solution.'; r.inference='Co\u00b2\u207a indicated.'; r.color='#AD1457'; }
    else if (has('Fe')) { r.observation='Yellow-brown solution.'; r.inference='Fe\u00b3\u207a indicated.'; r.color='#BF360C'; }
    else if (has('Mn')) { r.observation='Very pale pink/colourless.'; r.inference='Mn\u00b2\u207a possible (pale).'; r.color='#FCE4EC'; }
    else { r.observation='Colourless or white.'; r.inference='Coloured cations (Cu\u00b2\u207a,Ni\u00b2\u207a,Fe\u00b3\u207a,Co\u00b2\u207a,Cr\u00b3\u207a) absent.'; r.color='#E0E8F0'; }
  }
  else if (testId === 'dry_heating') {
    const obs=[]; const inf=[];
    if (has('CO3')||has('C2O4')) { obs.push('Colourless gas turns lime water milky (CO\u2082).'); inf.push('CO\u2083\u00b2\u207b or C\u2082O\u2084\u00b2\u207b indicated.'); r.gas='CO\u2082'; r.gasColor='#B0BEC5'; r.effervescence=true; }
    if (has('NO3')) { obs.push('Reddish-brown NO\u2082 gas evolved.'); inf.push('NO\u2083\u207b indicated.'); r.gas='NO\u2082'; r.gasColor='#FF6D00'; r.fumes=true; }
    if (has('NH4')) { obs.push('Pungent NH\u2083; white fumes with Conc. HCl rod.'); inf.push('NH\u2084\u207a indicated.'); r.gas='NH\u2083'; }
    r.observation = obs.length ? obs.join(' ') : 'No gas evolved.';
    r.inference = inf.length ? inf.join(' ') : 'CO\u2083\u00b2\u207b, NO\u2083\u207b, NH\u2084\u207a not indicated.';
    r.color='#FFF9C4';
  }
  else if (testId === 'flame_test') {
    if (has('Ba')) { r.observation='Apple-green flame.'; r.inference='Ba\u00b2\u207a indicated.'; r.flameColor='#76FF03'; }
    else if (has('Ca')) { r.observation='Brick-red flame.'; r.inference='Ca\u00b2\u207a indicated.'; r.flameColor='#FF3D00'; }
    else if (has('Sr')) { r.observation='Crimson-red flame.'; r.inference='Sr\u00b2\u207a indicated.'; r.flameColor='#D50000'; }
    else if (has('Cu')) { r.observation='Green/bluish-green flame.'; r.inference='Cu\u00b2\u207a indicated.'; r.flameColor='#00E5FF'; }
    else { r.observation='No characteristic flame colour.'; r.inference='Ba\u00b2\u207a,Ca\u00b2\u207a,Sr\u00b2\u207a,Cu\u00b2\u207a not indicated.'; r.flameColor='#FF6F00'; }
    r.color='#FFF9C4';
  }
  else if (testId === 'warm_naoh') {
    if (has('NH4')) { r.observation='Pungent NH\u2083 smell; dense white fumes with HCl rod.'; r.inference='NH\u2084\u207a confirmed.'; r.gas='NH\u2083'; r.fumes=true; }
    else { r.observation='No pungent gas.'; r.inference='NH\u2084\u207a absent.'; }
    r.color='#E3F2FD';
  }
  else if (testId === 'dil_hcl_test') {
    if (has('CO3')) { r.observation='Brisk effervescence; lime water turns milky.'; r.inference='CO\u2083\u00b2\u207b confirmed.'; r.gas='CO\u2082'; r.effervescence=true; r.color='#E8F5E9'; }
    else if (has('S')) { r.observation='Rotten egg smell; lead acetate paper turns black.'; r.inference='S\u00b2\u207b confirmed.'; r.gas='H\u2082S'; r.color='#FFF9C4'; }
    else { r.observation='No effervescence or rotten-egg smell.'; r.inference='CO\u2083\u00b2\u207b, S\u00b2\u207b absent.'; r.color='#E8F5E9'; }
  }
  else if (testId === 'conc_h2so4_mno2_heat') {
    if (has('Cl')) { r.observation='Greenish-yellow Cl\u2082 gas; starch-iodide paper turns blue.'; r.inference='Cl\u207b confirmed.'; r.gas='Cl\u2082'; r.gasColor='#C6FF00'; r.color='#F1F8E9'; }
    else if (has('Br')) { r.observation='Reddish-brown Br\u2082 gas; fluorescein paper turns red.'; r.inference='Br\u207b confirmed.'; r.gas='Br\u2082'; r.gasColor='#BF360C'; r.color='#FBE9E7'; }
    else { r.observation='No coloured gas.'; r.inference='Cl\u207b, Br\u207b absent.'; r.color='#E8F5E9'; }
  }
  else if (testId === 'conc_h2so4_cu_heat') {
    if (has('NO3')) { r.observation='Reddish-brown NO\u2082 gas evolved.'; r.inference='NO\u2083\u207b confirmed.'; r.gas='NO\u2082'; r.gasColor='#FF6D00'; r.fumes=true; r.color='#FFF3E0'; }
    else { r.observation='No reddish-brown gas.'; r.inference='NO\u2083\u207b absent.'; r.color='#FFF9C4'; }
  }
  else if (testId === 'chromyl_chloride') {
    if (has('Cl')) { r.observation='Red-orange vapours; yellow ppt with alkaline lead acetate.'; r.inference='Cl\u207b confirmed.'; r.precipitate='PbCrO\u2084'; r.precipitateColor='#FDD835'; r.color='#FFF3E0'; }
    else { r.observation='No red-orange vapours.'; r.inference='Cl\u207b absent.'; r.color='#FAFAFA'; }
  }
  else if (testId === 'ethyl_borate') {
    if (has('BO3')) { r.observation='Burns with green-edged flame.'; r.inference='BO\u2083\u00b3\u207b confirmed.'; r.flameColor='#64DD17'; }
    else { r.observation='No green-edged flame.'; r.inference='BO\u2083\u00b3\u207b absent.'; }
    r.color='#FFF9C4';
  }
  else if (testId === 'bf3_flame_borate') {
    if (has('BO3')) { r.observation='Green flame with CaF\u2082 + H\u2082SO\u2084 paste + ethanol.'; r.inference='BO\u2083\u00b3\u207b indicated.'; r.flameColor='#64DD17'; }
    else { r.observation='No green flame.'; r.inference='BO\u2083\u00b3\u207b absent.'; r.flameColor='#FF6F00'; }
    r.color='#FFF9C4';
  }
  else if (testId === 'bf3_flame_fluoride') {
    if (has('F')) { r.observation='Green flame with borax + H\u2082SO\u2084 + ethanol; waxy deposit on glass.'; r.inference='F\u207b indicated.'; r.flameColor='#64DD17'; }
    else { r.observation='No green flame or waxy deposit.'; r.inference='F\u207b absent.'; r.flameColor='#FF6F00'; }
    r.color='#FFF9C4';
  }
  else if (testId === 'dil_h2so4_mno2_heat') {
    if (has('CO3')||has('C2O4')) { r.observation='CO\u2082 gas; lime water turns milky.'; r.inference=has('CO3')?'CO\u2083\u00b2\u207b confirmed.':'C\u2082O\u2084\u00b2\u207b confirmed.'; r.gas='CO\u2082'; r.effervescence=true; r.color='#E8F5E9'; }
    else { r.observation='No CO\u2082 effervescence.'; r.inference='CO\u2083\u00b2\u207b, C\u2082O\u2084\u00b2\u207b absent.'; r.color='#E8F5E9'; }
  }
  else if (testId === 'sce_agno3') {
    if (has('Cl')) { r.observation='Curdy white ppt; soluble in NH\u2084OH.'; r.inference='Cl\u207b confirmed (AgCl\u2193).'; r.precipitate='AgCl'; r.precipitateColor='#F5F5F5'; r.color='#F5F5F5'; }
    else if (has('Br')) { r.observation='Pale yellow ppt; insoluble in NH\u2084OH.'; r.inference='Br\u207b confirmed (AgBr\u2193).'; r.precipitate='AgBr'; r.precipitateColor='#FFF9C4'; r.color='#FFF9C4'; }
    else if (has('S')) { r.observation='Black ppt (Ag\u2082S).'; r.inference='S\u00b2\u207b confirmed.'; r.precipitate='Ag\u2082S'; r.precipitateColor='#212121'; r.color='#212121'; }
    else { r.observation='No significant ppt.'; r.inference='Cl\u207b, Br\u207b, S\u00b2\u207b absent.'; r.color='#FAFAFA'; }
  }
  else if (testId === 'sce_bacl2') {
    if (has('SO4')) { r.observation='White ppt insoluble in Conc. HCl.'; r.inference='SO\u2084\u00b2\u207b confirmed (BaSO\u2084\u2193).'; r.precipitate='BaSO\u2084'; r.precipitateColor='#FAFAFA'; r.color='#FAFAFA'; }
    else { r.observation='No ppt in acidified solution.'; r.inference='SO\u2084\u00b2\u207b absent.'; r.color='#E8F5E9'; }
  }
  else if (testId === 'sce_cacl2') {
    if (has('C2O4')) { r.observation='White ppt (CaC\u2082O\u2084); dissolves in H\u2082SO\u2084.'; r.inference='C\u2082O\u2084\u00b2\u207b or F\u207b indicated.'; r.precipitate='CaC\u2082O\u2084'; r.precipitateColor='#FAFAFA'; r.color='#FAFAFA'; }
    else if (has('F')) { r.observation='White ppt (CaF\u2082).'; r.inference='F\u207b indicated (differentiate with KMnO\u2084).'; r.precipitate='CaF\u2082'; r.precipitateColor='#FAFAFA'; r.color='#FAFAFA'; }
    else { r.observation='No ppt.'; r.inference='C\u2082O\u2084\u00b2\u207b, F\u207b absent.'; r.color='#E8F5E9'; }
  }
  else if (testId === 'kmno4_diff') {
    if (has('C2O4')) { r.observation='KMnO\u2084 colour is decolourised/disappears.'; r.inference='C\u2082O\u2084\u00b2\u207b confirmed (reduces KMnO\u2084).'; r.color='#E8F5E9'; }
    else if (has('F')) { r.observation='KMnO\u2084 colour persists.'; r.inference='F\u207b confirmed (does not reduce KMnO\u2084).'; r.color='#EDE7F6'; }
    else { r.observation='Inconclusive (run CaCl\u2082 test first).'; r.inference='No C\u2082O\u2084\u00b2\u207b or F\u207b present.'; r.color='#F3E5F5'; }
  }
  else if (testId === 'brown_ring') {
    if (has('NO3')) { r.observation='Brown ring at interface of FeSO\u2084 and Conc. H\u2082SO\u2084 layers.'; r.inference='NO\u2083\u207b confirmed ([Fe(NO)]\u00b2\u207a brown ring).'; r.color='#4E342E'; }
    else { r.observation='No brown ring.'; r.inference='NO\u2083\u207b absent.'; r.color='#FAFAFA'; }
  }
  else if (testId === 'am_molybdate_test') {
    if (has('PO4')) { r.observation='Canary yellow ppt on heating.'; r.inference='PO\u2084\u00b3\u207b confirmed (phosphomolybdate).'; r.precipitate='(NH\u2084)\u2083PO\u2084\u00b712MoO\u2083'; r.precipitateColor='#FFD600'; r.color='#FFFDE7'; }
    else { r.observation='No canary yellow ppt.'; r.inference='PO\u2084\u00b3\u207b absent.'; r.color='#FAFAFA'; }
  }
  else if (testId === 'magnesia_mixture_test') {
    if (has('PO4')) { r.observation='White crystalline ppt (MgNH\u2084PO\u2084).'; r.inference='PO\u2084\u00b3\u207b confirmed.'; r.precipitate='MgNH\u2084PO\u2084'; r.precipitateColor='#FAFAFA'; r.color='#FAFAFA'; }
    else { r.observation='No ppt.'; r.inference='PO\u2084\u00b3\u207b absent.'; r.color='#E8F5E9'; }
  }
  else if (testId === 'group1_dil_hcl') {
    const grp1=['Pb','Ag','Hg2'].filter(has);
    if (grp1.length) { r.observation='White precipitate forms.'; r.inference=`Group I (${grp1.join(',')} ) indicated.`; r.precipitate='Group I Cl ppts'; r.precipitateColor='#F5F5F5'; r.color='#F5F5F5'; }
    else { r.observation='No ppt.'; r.inference='Pb\u00b2\u207a, Ag\u207a, Hg\u2082\u00b2\u207a absent.'; r.color='#E8F5E9'; }
  }
  else if (testId === 'pb_k2cro4') {
    if (has('Pb')) { r.observation='Yellow ppt (PbCrO\u2084).'; r.inference='Pb\u00b2\u207a confirmed.'; r.precipitate='PbCrO\u2084'; r.precipitateColor='#FFD600'; r.color='#FFFDE7'; }
    else { r.observation='No yellow ppt.'; r.inference='Pb\u00b2\u207a absent.'; r.color='#FAFAFA'; }
  }
  else if (testId === 'pb_ki') {
    if (has('Pb')) { r.observation='Yellow ppt; dissolves in boiling water; golden spangles on cooling.'; r.inference='Pb\u00b2\u207a confirmed (PbI\u2082).'; r.precipitate='PbI\u2082'; r.precipitateColor='#FFD54F'; r.color='#FFF9C4'; }
    else { r.observation='No yellow ppt.'; r.inference='Pb\u00b2\u207a absent.'; r.color='#FAFAFA'; }
  }
  else if (testId === 'group2a_h2s') {
    const g=['Cu','Cd','Bi'].filter(has);
    if (g.length) { r.observation=g.map(x=>({Cu:'Black CuS',Cd:'Yellow CdS',Bi:'Black Bi\u2082S\u2083'}[x])).join('; ')+' ppt.'; r.inference=`Group IIA: ${g.join(',')} present.`; r.precipitate='Sulphide ppts'; r.precipitateColor=(g.includes('Cd')&&g.length===1)?'#FFD600':'#212121'; r.color='#212121'; }
    else { r.observation='No sulphide ppt.'; r.inference='Cu\u00b2\u207a,Cd\u00b2\u207a,Bi\u00b3\u207a absent.'; r.color='#E8F5E9'; }
  }
  else if (testId === 'cu_nh4oh_excess') {
    if (has('Cu')) { r.observation='Deep blue solution ([Cu(NH\u2083)\u2084]\u00b2\u207a).'; r.inference='Cu\u00b2\u207a confirmed.'; r.color='#1565C0'; }
    else { r.observation='No deep blue colour.'; r.inference='Cu\u00b2\u207a absent.'; r.color='#E8F5E9'; }
  }
  else if (testId === 'cu_k4fe_cn_6') {
    if (has('Cu')) { r.observation='Chocolate-brown ppt.'; r.inference='Cu\u00b2\u207a confirmed.'; r.precipitate='Cu\u2082[Fe(CN)\u2086]'; r.precipitateColor='#6D4C41'; r.color='#6D4C41'; }
    else { r.observation='No brown ppt.'; r.inference='Cu\u00b2\u207a absent.'; r.color='#FAFAFA'; }
  }
  else if (testId === 'ni_dmg') {
    if (has('Ni')) { r.observation='Rosy-red ppt (Ni-DMG complex).'; r.inference='Ni\u00b2\u207a confirmed.'; r.precipitate='Ni(DMG)\u2082'; r.precipitateColor='#E91E63'; r.color='#FCE4EC'; }
    else { r.observation='No rosy-red ppt.'; r.inference='Ni\u00b2\u207a absent.'; r.color='#FAFAFA'; }
  }
  else if (testId === 'group3_nh4cl_nh4oh') {
    const g=['Fe','Al','Cr'].filter(has);
    if (g.length) { r.observation='Gelatinous precipitate.'; r.inference=`Group III: ${g.join(',')} indicated.`; r.precipitate='Group III hydroxides'; r.precipitateColor=g.includes('Fe')?'#BF360C':'#FAFAFA'; r.color='#FBE9E7'; }
    else { r.observation='No ppt.'; r.inference='Fe\u00b3\u207a,Al\u00b3\u207a,Cr\u00b3\u207a absent.'; r.color='#E8F5E9'; }
  }
  else if (testId === 'fe_kscn') {
    if (has('Fe')) { r.observation='Blood-red colour.'; r.inference='Fe\u00b3\u207a confirmed (Fe(SCN)\u2083).'; r.color='#B71C1C'; }
    else { r.observation='No blood-red colour.'; r.inference='Fe\u00b3\u207a absent.'; r.color='#FAFAFA'; }
  }
  else if (testId === 'fe_k4fe_cn_6') {
    if (has('Fe')) { r.observation='Prussian blue ppt.'; r.inference='Fe\u00b3\u207a confirmed.'; r.precipitate='Prussian blue'; r.precipitateColor='#1565C0'; r.color='#1A237E'; }
    else { r.observation='No Prussian blue ppt.'; r.inference='Fe\u00b3\u207a absent.'; r.color='#FAFAFA'; }
  }
  else if (testId === 'al_aluminon') {
    if (has('Al')) { r.observation='Red lake ppt.'; r.inference='Al\u00b3\u207a confirmed.'; r.precipitate='Al-aluminon lake'; r.precipitateColor='#FF5722'; r.color='#FBE9E7'; }
    else { r.observation='No red lake.'; r.inference='Al\u00b3\u207a absent.'; r.color='#FAFAFA'; }
  }
  else if (testId === 'group4_h2s_am') {
    const g=['Co','Ni','Mn','Zn'].filter(has);
    if (g.length) { r.observation='Precipitate forms.'; r.inference=`Group IV: ${g.join(',')} indicated.`; r.precipitate='Group IV sulphides'; r.precipitateColor='#212121'; r.color='#212121'; }
    else { r.observation='No ppt.'; r.inference='Group IV cations absent.'; r.color='#E8F5E9'; }
  }
  else if (testId === 'co_k3fe_cn_6') {
    if (has('Co')) { r.observation='Red-brown precipitate.'; r.inference='Co\u00b2\u207a indicated.'; r.precipitate='Co-ferricyanide'; r.precipitateColor='#BF360C'; r.color='#BF360C'; }
    else { r.observation='No characteristic ppt.'; r.inference='Co\u00b2\u207a absent.'; r.color='#FAFAFA'; }
  }
  else if (testId === 'mn_pbo2') {
    if (has('Mn')) { r.observation='Violet/purple supernatant (MnO\u2084\u207b).'; r.inference='Mn\u00b2\u207a confirmed.'; r.color='#6A1B9A'; }
    else { r.observation='No violet colour.'; r.inference='Mn\u00b2\u207a absent.'; r.color='#FAFAFA'; }
  }
  else if (testId === 'zn_h2s') {
    if (has('Zn')) { r.observation='White ppt (ZnS).'; r.inference='Zn\u00b2\u207a confirmed.'; r.precipitate='ZnS'; r.precipitateColor='#FAFAFA'; r.color='#FAFAFA'; }
    else { r.observation='No white ppt.'; r.inference='Zn\u00b2\u207a absent.'; r.color='#FAFAFA'; }
  }
  else if (testId === 'group5_am_carbonate') {
    const g=['Ba','Sr','Ca'].filter(has);
    if (g.length) { r.observation='White carbonate ppt.'; r.inference=`Group V: ${g.join(',')} indicated.`; r.precipitate='Group V carbonates'; r.precipitateColor='#FAFAFA'; r.color='#FAFAFA'; }
    else { r.observation='No ppt.'; r.inference='Ba\u00b2\u207a,Sr\u00b2\u207a,Ca\u00b2\u207a absent.'; r.color='#E8F5E9'; }
  }
  else if (testId === 'ba_k2cro4') {
    if (has('Ba')) { r.observation='Yellow ppt (BaCrO\u2084) insoluble in acetic acid.'; r.inference='Ba\u00b2\u207a confirmed.'; r.precipitate='BaCrO\u2084'; r.precipitateColor='#FFD600'; r.color='#FFFDE7'; }
    else { r.observation='No yellow ppt.'; r.inference='Ba\u00b2\u207a absent.'; r.color='#FAFAFA'; }
  }
  else if (testId === 'sr_am_sulfate') {
    if (has('Sr')) { r.observation='White ppt (SrSO\u2084) + crimson flame.'; r.inference='Sr\u00b2\u207a confirmed.'; r.precipitate='SrSO\u2084'; r.precipitateColor='#FAFAFA'; r.flameColor='#D50000'; r.color='#FAFAFA'; }
    else { r.observation='No white ppt.'; r.inference='Sr\u00b2\u207a absent.'; r.color='#FAFAFA'; }
  }
  else if (testId === 'ca_am_oxalate') {
    if (has('Ca')) { r.observation='White ppt (CaC\u2082O\u2084).'; r.inference='Ca\u00b2\u207a confirmed.'; r.precipitate='CaC\u2082O\u2084'; r.precipitateColor='#FAFAFA'; r.color='#FAFAFA'; }
    else { r.observation='No white ppt.'; r.inference='Ca\u00b2\u207a absent.'; r.color='#FAFAFA'; }
  }
  else if (testId === 'group6_na2hpo4') {
    if (has('Mg')) { r.observation='White crystalline ppt (MgNH\u2084PO\u2084).'; r.inference='Mg\u00b2\u207a confirmed.'; r.precipitate='MgNH\u2084PO\u2084'; r.precipitateColor='#FAFAFA'; r.color='#FAFAFA'; }
    else { r.observation='No crystalline ppt.'; r.inference='Mg\u00b2\u207a absent.'; r.color='#E8F5E9'; }
  }
  else if (testId === 'mg_na2hpo4') {
    if (has('Mg')) { r.observation='White crystalline ppt after scratching glass rod.'; r.inference='Mg\u00b2\u207a confirmed (MgNH\u2084PO\u2084).'; r.precipitate='MgNH\u2084PO\u2084'; r.precipitateColor='#FAFAFA'; r.color='#FAFAFA'; }
    else { r.observation='No ppt.'; r.inference='Mg\u00b2\u207a absent.'; r.color='#FAFAFA'; }
  }
  else if (testId === 'nh4_nesslers') {
    if (has('NH4')) { r.observation='Brown/reddish-brown ppt with Nessler\'s reagent.'; r.inference='NH\u2084\u207a confirmed.'; r.precipitate='OHg\u2082NH\u2082I'; r.precipitateColor='#BF360C'; r.color='#BF360C'; }
    else { r.observation='No brown ppt.'; r.inference='NH\u2084\u207a absent.'; r.color='#FAFAFA'; }
  }
  else if (testId === 'conc_h2so4_alone') {
    const obs=[]; const inf=[];
    if (has('F')) { obs.push('Waxy white deposit on glass rod (SiF\u2084 fumes).'); inf.push('F\u207b indicated.'); }
    if (has('Cl')) { obs.push('Pungent HCl fumes; white fumes with NH\u2084OH rod.'); inf.push('Cl\u207b indicated.'); r.gas='HCl'; r.fumes=true; }
    if (has('Br')) { obs.push('Reddish-brown Br\u2082 fumes; fluorescein paper turns red.'); inf.push('Br\u207b indicated.'); r.gas='Br\u2082'; r.gasColor='#BF360C'; }
    if (has('C2O4')||has('CO3')) { obs.push('Colourless gas; lime water turns milky.'); inf.push('C\u2082O\u2084\u00b2\u207b or CO\u2083\u00b2\u207b indicated.'); r.effervescence=true; }
    r.observation = obs.length ? obs.join(' ') : 'No characteristic reaction.';
    r.inference = inf.length ? inf.join(' ') : 'No specific anion indicated.';
    r.color='#FFF9C4';
  }
  return r;
}

export const TEST_CATALOGUE = {
  preliminary: [
    { id:'physical_colour',       label:'Physical Colour Check',           stage:'preliminary', icon:'🎨' },
    { id:'dry_heating',           label:'Dry Heating (+ lime water)',       stage:'preliminary', icon:'🔥', requiresHeat:true },
    { id:'flame_test',            label:'Flame Test (Conc. HCl paste)',     stage:'preliminary', icon:'🕯️', requiresHeat:true },
    { id:'bf3_flame_borate',      label:'BF\u2083 Flame (CaF\u2082 + H\u2082SO\u2084)',   stage:'preliminary', icon:'🌿', requiresHeat:true },
    { id:'bf3_flame_fluoride',    label:'BF\u2083 Flame (Borax + H\u2082SO\u2084)',       stage:'preliminary', icon:'🌿', requiresHeat:true },
    { id:'warm_naoh',             label:'Warm with NaOH',                  stage:'preliminary', icon:'🧪', requiresHeat:true },
    { id:'dil_hcl_test',          label:'Dil. HCl Test',                   stage:'preliminary', icon:'🧪' },
    { id:'dil_h2so4_mno2_heat',   label:'Dil. H\u2082SO\u2084 + MnO\u2082 (Heat)',       stage:'preliminary', icon:'🔥', requiresHeat:true },
    { id:'conc_h2so4_mno2_heat',  label:'Conc. H\u2082SO\u2084 + MnO\u2082 (Heat)',      stage:'preliminary', icon:'⚠️', requiresHeat:true },
    { id:'conc_h2so4_alone',      label:'Conc. H\u2082SO\u2084 (alone)',              stage:'preliminary', icon:'⚠️' },
    { id:'conc_h2so4_cu_heat',    label:'Conc. H\u2082SO\u2084 + Cu (Heat)',           stage:'preliminary', icon:'🔥', requiresHeat:true },
    { id:'chromyl_chloride',      label:'Chromyl Chloride Test',           stage:'preliminary', icon:'🧫' },
    { id:'ethyl_borate',          label:'Ethyl Borate (green flame)',       stage:'preliminary', icon:'🌿' },
  ],
  sce: [
    { id:'sce_agno3',             label:'AgNO\u2083 on SCE',                      stage:'sce', icon:'🥈' },
    { id:'sce_bacl2',             label:'BaCl\u2082 on SCE (SO\u2084\u00b2\u207b)',        stage:'sce', icon:'🧪' },
    { id:'sce_cacl2',             label:'CaCl\u2082 on SCE (C\u2082O\u2084/F\u207b)',     stage:'sce', icon:'🧪' },
    { id:'kmno4_diff',            label:'KMnO\u2084 Differentiation',             stage:'sce', icon:'🔮' },
    { id:'brown_ring',            label:'Brown Ring Test (NO\u2083\u207b)',         stage:'sce', icon:'🟤' },
    { id:'am_molybdate_test',     label:'Ammonium Molybdate (PO\u2084\u00b3\u207b)',      stage:'sce', icon:'🟡', requiresHeat:true },
    { id:'magnesia_mixture_test', label:'Magnesia Mixture (PO\u2084\u00b3\u207b)',       stage:'sce', icon:'⚗️' },
  ],
  cations: [
    { id:'nh4_nesslers',       label:"Nessler's (NH\u2084\u207a)",          stage:'cations', icon:'🟤', group:0 },
    { id:'group1_dil_hcl',    label:'Group I: Dil. HCl',            stage:'cations', icon:'🧪', group:1 },
    { id:'pb_k2cro4',         label:'Pb\u00b2\u207a: K\u2082CrO\u2084',             stage:'cations', icon:'🟡', group:1 },
    { id:'pb_ki',             label:'Pb\u00b2\u207a: KI (golden spangles)',  stage:'cations', icon:'✨', group:1 },
    { id:'group2a_h2s',       label:'Group IIA: H\u2082S / dil. HCl',   stage:'cations', icon:'🖤', group:'2A' },
    { id:'cu_nh4oh_excess',   label:'Cu\u00b2\u207a: excess NH\u2084OH',       stage:'cations', icon:'💙', group:'2A' },
    { id:'cu_k4fe_cn_6',      label:'Cu\u00b2\u207a: K\u2084[Fe(CN)\u2086]',       stage:'cations', icon:'🟫', group:'2A' },
    { id:'group3_nh4cl_nh4oh',label:'Group III: NH\u2084Cl + NH\u2084OH',    stage:'cations', icon:'🧪', group:3 },
    { id:'fe_kscn',           label:'Fe\u00b3\u207a: KSCN (blood-red)',      stage:'cations', icon:'🔴', group:3 },
    { id:'fe_k4fe_cn_6',      label:'Fe\u00b3\u207a: K\u2084[Fe(CN)\u2086]',        stage:'cations', icon:'🔵', group:3 },
    { id:'al_aluminon',       label:'Al\u00b3\u207a: Aluminon (red lake)',  stage:'cations', icon:'🟠', group:3 },
    { id:'ni_dmg',            label:'Ni\u00b2\u207a: DMG (rosy-red)',        stage:'cations', icon:'🌸', group:4 },
    { id:'group4_h2s_am',     label:'Group IV: H\u2082S + NH\u2084OH',        stage:'cations', icon:'🧪', group:4 },
    { id:'co_k3fe_cn_6',      label:'Co\u00b2\u207a: K\u2083[Fe(CN)\u2086]',       stage:'cations', icon:'🟤', group:4 },
    { id:'mn_pbo2',           label:'Mn\u00b2\u207a: PbO\u2082 (violet)',         stage:'cations', icon:'🟣', group:4 },
    { id:'zn_h2s',            label:'Zn\u00b2\u207a: H\u2082S (white ZnS)',      stage:'cations', icon:'⬜', group:4 },
    { id:'group5_am_carbonate',label:'Group V: (NH\u2084)\u2082CO\u2083',        stage:'cations', icon:'🧪', group:5 },
    { id:'ba_k2cro4',         label:'Ba\u00b2\u207a: K\u2082CrO\u2084 (yellow)',    stage:'cations', icon:'🟡', group:5 },
    { id:'sr_am_sulfate',     label:'Sr\u00b2\u207a: (NH\u2084)\u2082SO\u2084',      stage:'cations', icon:'⬜', group:5 },
    { id:'ca_am_oxalate',     label:'Ca\u00b2\u207a: Ammonium Oxalate',    stage:'cations', icon:'⬜', group:5 },
    { id:'group6_na2hpo4',    label:'Group VI: Na\u2082HPO\u2084 + NH\u2084OH',    stage:'cations', icon:'🧪', group:6 },
    { id:'mg_na2hpo4',        label:'Mg\u00b2\u207a: Na\u2082HPO\u2084 (crystalline)',stage:'cations', icon:'⬜', group:6 },
  ],
};
