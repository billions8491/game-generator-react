import styles from './GameDisplay.module.css';
import { formatPrice } from '../helpers';
import { useEffect } from 'react';

export function GameDisplay({ activeCategory, steamData }) {

    const activeCategoryKey = Object.keys(steamData).length > 0 ?
        Object.keys(steamData).find(key => steamData[key].name === activeCategory)
        : null;

    const activeData = steamData[activeCategoryKey]

    if(activeData){
        console.log(activeData)
    }

    return (
        <>
            {
                Object.keys(steamData).length > 0 ?
                    <main className={styles.mainContainer} >
                        <div className={styles['pricing-and-img']} >
                            <div className={styles.pricingContainer} >
                                {activeData.items[0].discounted ?
                                    <>
                                        <svg className={styles.spanSVG} viewBox='0 0 100 100' preserveAspectRatio="none">
                                            <defs>
                                                <pattern id='skewedDash' x="2" y="0" width="3" height="5" patternUnits="userSpaceOnUse" >
                                                    <polygon points="1,0 3,0 2,4 0,4" fill="red" />
                                                </pattern>
                                            </defs>
                                            <path className={styles.path}
                                                d="
                                                M100,0 L12,0 L7,5 L7,70 L0,80 L0,95 L4,98 L46,98 L53,93.5 L70,93.5
                                                M105,93.5 L135,93.5 L140,97 L230,97 
                                                M135,93.5 L135,80 L140,75 L260,75

                                                M12,21 L45,21 L50,26 L55,21 L90,21
                                                M17,23 L45,23 L50,28 L55,23 L85,23
                                                "
                                                fill="none"
                                                stroke="rgb(255, 0, 0)"
                                                strokeWidth="2"
                                                vectorEffect="non-scaling-stroke"
                                                strokeLinecap='round'
                                            />
                                            <path className={styles.cyanAccent}
                                                d='M47,21 L50,24 L53,21'
                                                fill="none"
                                                stroke="rgb(122, 255, 255)"
                                                strokeWidth="2"
                                                vectorEffect="non-scaling-stroke"
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                            <path className={styles.angledDashedLine}
                                                d='M71,93 L104,93 L104,94 L71,94 L71,93'
                                                fill='url(#skewedDash)'
                                            />
                                        </svg>
                                        <div className={styles.spanContainer} >
                                            <span className={styles.discount} >NOW {activeData.items[0].discount_percent}% OFF</span>
                                            <div className={styles.prices} >
                                                <div className={styles.originalPriceContainer} >
                                                    <span className={styles.originalPrice} >{formatPrice(activeData.items[0].original_price)}</span>
                                                </div>
                                                <span className={styles.finalPrice} >{formatPrice(activeData.items[0].final_price)}</span>
                                            </div>
                                        </div>
                                    </>
                                    : <span className={styles.onlyFinalPrice} >{formatPrice(activeData.items[0].final_price)}</span>}
                            </div>
                            <a className={styles.link} href={`https://store.steampowered.com/app/${activeData.items[0].id}/`} target='_blank' rel='noreferrer'>
                                <svg className={styles.imgOverlay} viewBox='0 0 460 215' preserveAspectRatio='xMidYMid meet' fill='none'>
                                    <defs>
                                        <clipPath id="gameCardClip">
                                            <path d="M15,0 L445,0 L460,15 L460,200 L445,215 L15,215 L0,200 L0,15 L15,0" />
                                        </clipPath>
                                    </defs>
                                    <image className={styles.svgImage} href={activeData.items[0].header_image} preserveAspectRatio="xMidYMid slice"
                                        clipPath='url(#gameCardClip)'
                                        height="100%"
                                        width="100%"
                                    />
                                    <path className={styles.gameCardPath}
                                        d='M15,0 L445,0 L460, 15 L460,200 L445, 215 L15,215 L0,200 L0,15 L15,0'
                                        fill='none'
                                        stroke="rgba(117, 255, 255, 0.75)"
                                        strokeWidth="3"
                                        vectorEffect="non-scaling-stroke"
                                        strokeLinecap='round'
                                    />
                                </svg>
                            </a>
                        </div>
                    </main>
                    : null
            }

        </>
    )
}