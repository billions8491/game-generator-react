import styles from './GameDisplay.module.css';
import { PricingAndInfo } from './PricingAndInfo';
import { GameCards } from './GameCards';
import { getGameData } from '../helpers';
import { useEffect, useState } from 'react';

export function GameDisplay({ activeCategory, steamData, currentGameIndex, setCurrentGameIndex }) {

    const activeCategoryKey = Object.keys(steamData).length > 0 ?
        Object.keys(steamData).find(key => steamData[key].name === activeCategory)
        : null;


    const activeData = steamData[activeCategoryKey];
    let noDupesArr = []

    const filteredActiveDataItems = activeData?.items.filter(item => {
       if(!noDupesArr.includes(item.id)) {
        noDupesArr.push(item.id)
        return true
       } else {
        return false
       }
    })

    const filteredActiveData = activeData ? 
    {...activeData, items: filteredActiveDataItems}
    : activeData

    const [ gameData, setGameData ] = useState(null);
    
    useEffect(() => {
        // Calls the appdetails Steam API for extensive data about the current game
        if (filteredActiveDataItems?.[currentGameIndex]) {
            getGameData(filteredActiveDataItems[currentGameIndex].id).then(response => {
                setGameData(response);
            })
        }

    }, [activeData,  currentGameIndex])

    if (!activeData) return null

    return (
        <main className={styles.mainContainer} >
            <div className={styles['pricing-and-img']} >
                <GameCards activeData={filteredActiveData} currentGameIndex={currentGameIndex} setCurrentGameIndex={setCurrentGameIndex}/>
                <PricingAndInfo activeData={filteredActiveData} currentGameIndex={currentGameIndex} gameData={gameData} />
            </div>
        </main>
    )
}