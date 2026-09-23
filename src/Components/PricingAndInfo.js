import styles from './PricingAndInfo.module.css'
import { useEffect, useState } from 'react'
import { formatPrice, getRecommendationData, getTags } from '../helpers';
import steamLogo from '../images/steam-logo.svg';

export function PricingAndInfo({ activeData, currentGameIndex, gameData }) {

    const [tags, setTags] = useState([])
    const [reviewData, setReviewData] = useState(null);
    const total = reviewData?.total_reviews;
    const percentage = reviewData ? (reviewData.total_positive / total) * 100 : null;
    const desc = reviewData?.review_score_desc;

    const currentGame = activeData?.items?.[currentGameIndex]

    function camelCase(description) {
        return description.toLowerCase().replace(/ (.)/g, (_, letter) => letter.toUpperCase());
    }

    function decodeHtml(text) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    }

    useEffect(() => {

        if (gameData) {

            getRecommendationData(gameData.steam_appid).then(response => {
                setReviewData(response.query_summary)
            })
            getTags(gameData.steam_appid).then(response => {
                setTags(response.slice(0, 3))
            })
        }
    }, [gameData])


    return (

        <div className={styles.borderContainer} >
            <svg className={styles.mainSVG} viewBox='0 0 100 100' preserveAspectRatio='none' >
                <defs>
                    <pattern id='verticalDash' x="1" y="1" width="2" height="3" patternUnits="userSpaceOnUse" >
                        <polygon points="0,1 1.75,0.5 1.75,1 0,1.5" fill="rgba(255,0,0,1" />
                    </pattern>
                    <linearGradient id="horizontalRed">
                        <stop offset="0%" stopColor="rgb(55,0,0)" stopOpacity=".35" />
                        <stop offset="20%" stopColor="transparent" />
                        <stop offset="50%" stopColor="rgba(0,40,40,0.15)" />
                        <stop offset="80%" stopColor="transparent" />
                        <stop offset="100%" stopColor="rgb(55,0,0)" stopOpacity=".35" />
                    </linearGradient>
                    <linearGradient id="verticalRed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgb(55,0,0)" stopOpacity=".35" />
                        <stop offset="20%" stopColor="transparent" />
                        <stop offset="50%" stopColor="rgba(0,40,40,0.15)" />
                        <stop offset="80%" stopColor="transparent" />
                        <stop offset="100%" stopColor="rgb(55,0,0)" stopOpacity=".35" />
                    </linearGradient>
                    <path
                        id="innerPanelShape"
                        d='M8,4 L26,4 L28,6 L59,6 L60,5 L71,5 L72,4 L92,4 L96,8 L96,92 L92,96 L8,96 L4,92 L4,8 Z'
                        strokeWidth='1'
                        vectorEffect='non-scaling-stroke'
                        stroke='red'
                    />
                </defs>
                <path className={styles.outerBorderPath}
                    d='M5,0 L95,0 L100,5 L100,37 L99,38 L99,42 L100,43 L100,94 L94,100 L6,100 L0,94 L0,65 L1,64 L1,34 L0,33 L0,5 L5,0'
                />
                <use href='#innerPanelShape' fill="url(#horizontalRed)" />
                <use href='#innerPanelShape' fill="url(#verticalRed)" />
                <path d='M97,10 L97,25 L99,25 L99,10 L97,10    M97,64 L97,85 L99,85 L99,64' fill="url(#verticalDash)" />
            </svg>
            <div className={styles.allInfoContainer}>
                {
                    activeData.name === 'Coming Soon' ?
                        <div className={styles.comingSoon}>
                            <span className={styles.comingSoonMessage} >No pricing info for unreleased games!</span>
                            <span className={styles.comingSoonFollowUp} >{'(Check tomorrow in New Releases tab)'}</span>
                        </div>
                        :   // **********   DISCOUNTED DEALS   ********************   DISCOUNTED DEALS   **********
                        currentGame.discounted ?
                            <div className={styles.allPriceInfo} >
                                <div className={styles.discountContainer} >
                                    <svg className={styles.mainAccentSVG} viewBox='0 0 100 100' preserveAspectRatio='none'>
                                        <path className={styles.mainAccent}
                                            d='
                                        M-20,100 L-18,110 L118,110 L120,100
                                        M-18.5,100 L-17.5,105
                                        M118.5,100 L117.5,105
                                        M-18,50 L-9,50 L-7,60
                                        M-7.5,50 L-6,58
                                        M118,50 L109,50 L107,60
                                        M107.5,50 L106,58
                                        '
                                        />
                                    </svg>
                                    <span className={styles.discountSpan} >NOW {currentGame.discount_percent}% OFF</span>
                                </div>
                                <div className={styles.prices} >
                                    <div className={styles.originalPriceContainer} >
                                        <svg className={styles.chevronSVG} viewBox='0 0 100 100' preserveAspectRatio='none'  >
                                            <defs>
                                                <path
                                                    id="priceChevron"
                                                    d="M115,20 L118,20 L127,50 L118,80 115,80 124,50"
                                                    fill='red'
                                                    stroke='red'
                                                />
                                            </defs>
                                            <use
                                                href='#priceChevron'
                                                transform='translate(12,0)'
                                            />
                                            <use
                                                href='#priceChevron'
                                                transform='translate(24,0)'
                                            />
                                            <path className={styles.lineThrough}
                                                d='M-5,48 L105,48'
                                                fill='none'
                                                stroke="rgba(255,0,0,1)"
                                                strokeWidth="2"
                                                vectorEffect="non-scaling-stroke"
                                                strokeLinecap='round'
                                            />
                                        </svg>
                                        <span className={styles.originalPrice} >{formatPrice(currentGame.original_price)}</span>
                                    </div>
                                    <span className={styles.finalPrice} >{formatPrice(currentGame.final_price)}</span>
                                </div>
                            </div>
                            :
                            <span className={styles.onlyFinalPrice} >{formatPrice(currentGame.final_price)}</span>
                }
                <div className={styles.gameInfo} >
                    <div className={styles.titleAndDesc} >
                        <div className={styles.gameTitleContainer} >
                            <svg className={styles.gameTitleSVGleft} viewBox='0 0 20 100' preserveAspectRatio='none' >
                                <path className={styles.titlePath}
                                    d='
                                        M-25,110 L-25,50 L-5,30 L100,30'
                                    fill='none'
                                    stroke="rgba(100,255,255,1)"
                                    strokeWidth="3"
                                    vectorEffect="non-scaling-stroke"
                                    strokeLinecap='round' />
                                <path className={styles.titlePath}
                                    d='
                                        M-15,70 L-15,55 L0,40 L15,40'
                                    fill='none'
                                    stroke="rgba(100,255,255,.75)"
                                    strokeWidth="2"
                                    vectorEffect="non-scaling-stroke"
                                    strokeLinecap='round' />
                            </svg>
                            <span className={styles.gameTitle} >{currentGame.name}</span>
                            <svg className={styles.gameTitleSVGright} viewBox='0 0 6.25 25' preserveAspectRatio='none' >
                                <path className={styles.titlePath}
                                    d='
                                        M40,0 L40,30 L15,50 L-20,50
                                        M55,15 L55,32 L35,50'
                                    fill='none'
                                    stroke="rgba(100,255,255,1)"
                                    strokeWidth="2"
                                    vectorEffect="non-scaling-stroke"
                                    strokeLinecap='round' />
                            </svg>
                        </div>
                        {gameData ? <span className={styles.description}>{decodeHtml(gameData.short_description)}</span> : null}
                        <svg className={styles.belowDescriptionSVG} viewBox='0 0 100 100' preserveAspectRatio='none'>
                            <path d='M0,115 L50,114.5 L100,115 L50,115.5'
                                fill='rgba(255,0,0,.75' />
                        </svg>
                    </div> 
                    {/******************      REVIEWS       **************/}
                    {reviewData ?
                        <div className={styles.reviews} >
                            <div className={styles.logoAndReviewsContainer} >
                                <img src={steamLogo} className={styles.steamLogo} />
                                <div className={styles.reviewsText}>
                                    <div>
                                        <span >Steam Reviews: </span>
                                        <span className={`${styles[camelCase(desc)]} ${styles.ratingDesc}`} >{desc} </span>
                                    </div>
                                    {total ? <span className={styles.reviewsPercentage} >{`(${percentage.toFixed(2)}% out of ${total} reviews)`}</span> : null}
                                </div>
                            </div>
                            {tags ?
                                <div className={styles.aboveTagsSVGcontainer} >
                                    <svg className={styles.aboveTagsSVG} viewBox='0 0 100 100' preserveAspectRatio='none'>
                                        <path
                                            d="M0,50 L50,45 L100,50 L50,55 Z"
                                            fill='rgba(255,0,0)'
                                        />
                                    </svg>
                                </div> : null}
                        </div>
                        : null}
                    <div className={styles.tagsContainer}>
                        {/******           TAGS         ************/}
                        {tags?.map(tag => {
                            return (
                                <div className={styles.tagContainer} key={tag} >
                                    <span>{tag}
                                        <svg className={styles.leftTagSVG} viewBox='0 0 100 100' preserveAspectRatio='none' >
                                            <path
                                                d='M100,0 L50,25 L50,75 L100,100'
                                                stroke='rgba(0,255,255,.8)'
                                                vectorEffect="non-scaling-stroke"
                                                strokeLinecap='round'
                                                fill='none'
                                                strokeWidth='2px' />
                                        </svg>
                                        <svg className={styles.rightTagSVG} viewBox='0 0 100 100' preserveAspectRatio='none'>
                                            <path
                                                d='M0,0 L50,25 L50,75 L0,100'
                                                stroke='rgba(0,255,255,.8)'
                                                vectorEffect="non-scaling-stroke"
                                                strokeLinecap='round'
                                                fill='none'
                                                strokeWidth='2px' />
                                        </svg>
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}