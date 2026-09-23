import { useState, useEffect } from "react";
import styles from './CategoryBar.module.css'

export function CategoryBar({ steamData, activeCategory, setActiveCategory, setCurrentGameIndex }) {

    let noDupesArr = [];

    const categories = steamData ?
        // filters out duplicate categories as well as categories with no data, 
        // and generates a button for each passing category
        Object.values(steamData)
            .filter(item => item.items?.length > 0)
            .filter(item => {
                if (noDupesArr.includes(item.name)) return false
                noDupesArr.push(item.name);
                return true;
            })
            .map(item => ({ name: item.name, id: item.id }))
        : [];

    const dailyDealCat = categories.find(item => item.name === 'Daily Deal')

    const categoriesMinusDailyDeal = noDupesArr.includes('Daily Deal') ?
        categories.filter(item => item.name !== "Daily Deal")
        : categories;

    const orderedCategories = [dailyDealCat, ...categoriesMinusDailyDeal].filter(Boolean);

    const [isBeingClicked, setIsBeingClicked] = useState(false);
    const [hoveredCategory, sethoveredCategory] = useState(null)

    useEffect(() => {
        if (dailyDealCat) {
            setActiveCategory('Daily Deal')
            setCurrentGameIndex(0)
        } else if (orderedCategories.length > 0) {
            setActiveCategory(orderedCategories[0].name)
            setCurrentGameIndex(0)
        }
    }, [steamData])

    function handleClick(category) {
        setActiveCategory(category);
        setCurrentGameIndex(0);
        setIsBeingClicked(true);
        setTimeout(() => {
            setIsBeingClicked(false)
        }, 250);
    }
    
    return (
        <nav className={styles.nav} >
            <div className={styles.buttonsContainer} >
                {steamData ?
                    orderedCategories.map(category => {
                        return (
                            <button
                                key={category.id}
                                onClick={() => handleClick(category.name)}
                                onMouseEnter={() => sethoveredCategory(category.name)}
                                onMouseLeave={() => sethoveredCategory(null)}
                                className={isBeingClicked && activeCategory === category.name
                                    // handles the transition from a button being both clicked and subsequently becoming active, 
                                    // to the button simply being active after the click is "over" (after 175ms in setTimeout)
                                    ? styles.clickedAnimation
                                    : activeCategory === category.name
                                        ? styles.isActive
                                        : ''}
                            >
                                {category.name}
                                <svg className={styles['button-shape']} viewBox='0 0 100 100' preserveAspectRatio="none">
                                    <defs>
                                        <radialGradient id="btnGrad" cx="50%" cy="50%" r="70%">
                                            <stop offset="20%" stopColor="rgb(0,0,0)" />
                                            <stop offset="80%" stopColor="rgb(60,10,10)" />
                                            <stop offset="100%" stopColor="rgb(132, 13, 13)" />
                                        </radialGradient>
                                        <radialGradient id="hoveredGrad" cx="50%" cy="45%" r="70%">
                                            <stop offset="30%" stopColor="rgb(62, 0, 0)" />
                                            <stop offset="70%" stopColor="rgb(100, 0, 0)" />
                                            <stop offset="100%" stopColor="rgb(150, 0, 0)" />
                                        </radialGradient>
                                        <radialGradient id="overlayGrad" cx="50%" cy="45%" r="70%">
                                            <stop offset="50%" stopColor="rgb(80, 225, 200)" />
                                            <stop offset="100%" stopColor="rgb(100, 255, 235)" />
                                        </radialGradient>
                                    </defs>
                                    <polygon className={styles.firstPolygon}
                                        points="0 0, 100 0, 100 10, 85 100, 15 100, 0 10"
                                        fill={hoveredCategory === category.name ? `url(#hoveredGrad)` : `url(#btnGrad)`}
                                    />
                                    <polygon className={
                                        activeCategory === category.name ?
                                            `${styles.isClicked}` :
                                            `${styles.inactiveSecondPolygon}`
                                    }
                                        points="0 0, 100 0, 100 10, 85 100, 15 100, 0 10"
                                        fill="url(#overlayGrad)"
                                    />
                                </svg>
                            </button>
                        )
                    })
                    : null
                }
            </div>
        </nav>
    )
}