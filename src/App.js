import styles from './App.module.css';
import { CategoryBar } from './Components/CategoryBar';
import { GameDisplay } from './Components/GameDisplay.js';
import { useEffect, useState } from 'react';
import { getDeals } from './helpers.js';

function App() {

  const [steamData, setSteamData] = useState({});
  const [activeCategory, setActiveCategory] = useState('Daily Deal');
  const [activeCategoryData, setActiveCategoryData] = useState();
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    getDeals().then(response => {

      const activeCategoryKey = Object.keys(response).find(key => response[key].name === activeCategory)

      setSteamData(response);
      setActiveCategoryData(response[activeCategoryKey].items)
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
          {/* <defs>
            <linearGradient id="topAccentGrad" gradientUnits="userSpaceOnUse" x1="68" y1="2" x2="88" y2="2">
              <stop offset="0%" stopColor="rgb(250, 10, 10)" />
              <stop offset="45%" stopColor="rgb(250, 10, 10)" />
              <stop offset="50%" stopColor="white" />
              <stop offset="55%" stopColor="rgb(250, 10, 10)" />
              <stop offset="100%" stopColor="rgb(250, 10, 10)" />
              <animate attributeName='x1' values='68;88' dur='3s' repeatCount='indefinite' />
              <animate attributeName="x2" values="88;108" dur="3s" repeatCount='indefinite' />
            </linearGradient>
            <linearGradient id='bottomAccentGrad' gradientUnits="userSpaceOnUse" x1='95' y1='-6.1' x2='98.5' y2='0.2' >
              <stop offset="0%" stopColor="rgb(250, 10, 10)" />
              <stop offset="50%" stopColor="white" />
              <stop offset="100%" stopColor="rgb(250, 10, 10)" />
              <animate attributeName='x1' values='95;100' dur='1.5s' repeatCount='indefinite' />
              <animate attributeName="x2" values="98.5;102" dur="1.5s" repeatCount='indefinite' />
            </linearGradient>
          </defs> */}
          <path className={styles.mainPath}
            d="
            M0,0.2
            L99,0.2
            L100,2
            L100,88
            L99,90
            L90,90
            L85,97
            L21,97
            L19,100
            L1.6,100
            L0,97
            L0,0.2
            "
            fill="none" stroke='red' strokeWidth="2" vectorEffect="non-scaling-stroke"
          />

        </svg>
        <CategoryBar steamData={steamData} setActiveCategory={setActiveCategory} activeCategory={activeCategory} />
        <GameDisplay activeCategoryData={activeCategoryData} steamData={steamData} activeCategory={activeCategory} />
      </div>
    </>
  );
}

export default App;