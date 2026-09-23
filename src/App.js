import styles from './App.module.css';
import { CategoryBar } from './Components/CategoryBar';
import { GameDisplay } from './Components/GameDisplay.js';
import { useEffect, useState } from 'react';
import { getDeals } from './helpers.js';

function App() {

  const [steamData, setSteamData] = useState({});
  const [activeCategory, setActiveCategory] = useState('');
  const [ currentGameIndex, setCurrentGameIndex ] = useState(0)

  useEffect(() => {
    getDeals().then(response => {
      setSteamData(response)
    })
  }, [])




  return (
    <>
      <div className={styles.header} >
        <span className={styles.cyanHeader} >D</span>
        <span className={styles.redHeader} >EAL </span>
        <span className={styles.cyanHeader} >R</span>
        <span className={styles.redHeader}>UNNER</span>
      </div>
      <div className={styles['main-container']} >
        <svg className={styles['bg-shape']} viewBox='0 0 100 100' preserveAspectRatio='none' >
          <defs>
            <pattern id='skewedDash' x="3" y="0" width="2" height="5" patternUnits="userSpaceOnUse" >
              <polygon points="1,0 2,0 1,4 0,4" fill="rgba(255,0,0,.7" />
            </pattern>
          </defs>
          <path className={styles.mainPath}
            d="
            M0,0 L100,0 L100,97 L98.5,100  L1.5,100 L0,97 L0,0
            M0,88 L3,95 L25,95 L27,98 L97,98 L100,92
            "
            fill="none" stroke='rgb(150,0,0)' strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin='round' strokeLinecap='round'
          />
          <path className={styles.angledDashedLine}
          d='M5,96.5 L21.7,96.5 L22.2,98.5 L5,98.5 L5,96.5'
          fill="url(#skewedDash)" 
          />
        </svg>
        <CategoryBar steamData={steamData} setActiveCategory={setActiveCategory} activeCategory={activeCategory} setCurrentGameIndex={setCurrentGameIndex} />
        <GameDisplay steamData={steamData} activeCategory={activeCategory} currentGameIndex={currentGameIndex} setCurrentGameIndex={setCurrentGameIndex} />
      </div>
    </>
  );
}

export default App;