import styles from './Tooltip.module.css'
import { useId, useEffect, useState } from 'react'
import { getRecommendationData } from '../helpers'

export function Tooltip({ game, id, visibility }) {

    const [reviewData, setReviewData] = useState(null)

    const uid = useId()
    const ids = {
        bg: `${uid}-tooltipBg`,
        pointer: `${uid}-pointerGradient`,
        divider: `${uid}-dividerGradient`,
        noise: `${uid}-noise`,
        gameCard: `${uid}-gameCard`,
        gameClip: `${uid}-gameClip`
    };

    function camelCase(description) {
        return description.toLowerCase().replace(/ (.)/g, (_, letter) => letter.toUpperCase());
    }

    useEffect(() => {
        getRecommendationData(id).then(response => {
            if (!response?.query_summary) {
                setReviewData(null);
                return;
            }
            setReviewData(response.query_summary);
        });
    }, [id])

    const total = reviewData?.total_reviews;
    const percentage = reviewData ? (reviewData.total_positive / total) * 100 : null;
    const desc = reviewData?.review_score_desc;

    return (
        <div className={`${styles.tooltipContainer} ${visibility}`} >
            <svg className={styles.tooltipSVG} viewBox='0 0 300 100' >
                <defs>
                    <radialGradient id={ids.bg} cx='50%' cy='42%' >
                        <stop offset="0%" stopColor="rgba(0, 5, 5, 1)" />
                        <stop offset="65%" stopColor="rgba(0, 10, 10, 1)" />
                        <stop offset="100%" stopColor="rgba(0, 25, 25, 1)" />
                    </radialGradient>
                    <linearGradient id={ids.pointer} x1="0%" y1="0%" x2="0%" y2="100%" >
                        <stop offset="0%" stopColor="rgba(0,0,0,0)" />
                        <stop offset='50%' stopColor='rgba(0,255,255,0.25)' />
                        <stop offset="100%" stopColor="rgba(0, 255, 255)" />
                    </linearGradient>
                    <linearGradient id={ids.divider} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(100,255,255,1)" />
                        <stop offset='50%' stopColor='rgba(0,255,255,0.25)' />
                        <stop offset="100%" stopColor="rgba(0, 255, 255,0.2)" />
                    </linearGradient>
                    <filter id={ids.noise} x="0%" y="0%" width="100%" height="100%">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.05 0.05"
                            numOctaves="999"
                            seed="99"
                            result="turbulence"
                        />
                        <feColorMatrix
                            in="turbulence"
                            type="luminanceToAlpha"
                            result="noiseAlpha"
                        />
                        <feFlood
                            floodColor="cyan"
                            result="cyanFill"
                        />
                        <feComposite
                            in="cyanFill"
                            in2="noiseAlpha"
                            operator="in"
                            result="cyanNoise"
                        />
                        <feComposite
                            in="cyanNoise"
                            in2="SourceAlpha"
                            operator="in"
                        />
                    </filter>
                </defs>
                <path className={styles.tooltipMainPath} // This is just for the background with no border
                    fill={`url(#${ids.bg})`}
                    d='M15,0 L285,0 L300,15 L300,85 L285,100 L160,100 L150,110 L140,100 L15,100 L0,85 L0,15 Z'

                />
                <path  // noise overlay
                    d='M15,0 L285,0 L300,15 L300,85 L285,100 L160,100 L150,110 L140,100 L15,100 L0,85 L0,15 Z'
                    filter={`url(#${ids.noise})`}
                    opacity=".03"
                />
                <path className={styles.tooltipMainBorder}  // thin outermost/main border
                    d='M15,0 L285,0 L300,15 L300,85 L285,100 L160,100 L150,110 L140,100 L15,100 L0,85 L0,15 Z'
                    fill='none'
                    stroke='rgb(100,255,255)'
                    strokeWidth='1'
                    vectorEffect='non-scaling-stroke'
                />
                <path className={styles.cornerAccents}  // thick corner accents on main border
                    d='
                                        M0,30 L0,15 L15,0 L30,0
                                        M270,0 L285,0 L300,15 L300,30
                                        M300,70 L300,85 L285,100 L270,100
                                        M30,100 L15,100 L0,85 L0,70
                                        '
                    fill='none'
                    stroke='rgb(150,255,255)'
                    strokeWidth='4'
                    strokeLinecap='round'
                    vectorEffect='non-scaling-stroke'
                />
                <path className={styles.tooltipPointer}
                    d='M160,100 L150,110 L140,100 Z'
                    fill={`url(#${ids.pointer})`}
                />
            </svg>
            {/* Below contains Game Cover Image, Title and Review Data */}
            <div className={styles.tooltipContent}>
                <svg className={styles.tooltipImageSVG} viewBox='0 0 300 225'>
                    <defs>
                        <path
                            id={ids.gameCard}
                            d="M10,0 L290,0 L300,10 L300,215 L290,225 L10,225 L0,215 L0,10 Z"
                        />
                        <clipPath id={ids.gameClip}>
                            <use
                                href={`#${ids.gameCard}`}
                            />
                        </clipPath>
                    </defs>
                    <image className={styles.tooltipImage} href={game.header_image} clipPath={`url(#${ids.gameClip})`} />
                    <use
                        href={`#${ids.gameCard}`}
                        className={styles.gameCardPath}
                        fill="none"
                        stroke="rgba(117, 255, 255)"
                        strokeWidth="3"
                        vectorEffect="non-scaling-stroke"
                        strokeLinecap="round"
                    />
                    <path
                        className={styles.thickBorders}
                        d="
                        M0,30 L0,10 L10,0 L40,0
                        M300,30 L300,10 L290,0 L260,0
                        M300,195 L300,215 L290,225 L260,225
                        M0,195 L0,215 L10,225 L40,225
                        "
                        fill="none"
                        stroke="rgba(117, 255, 255)"
                        strokeWidth="5"
                        strokeLinejoin='round'
                        strokeLinecap="round"
                    />
                </svg>
                {/*********          Tooltip Game Title/Review Data           *********/}
                <div className={styles.tooltipTitleDiv} >
                    <span className={styles.tooltipTitle}>
                        {game.name}
                    </span>
                    <svg className={styles.dividerSVG} viewBox='0 0 100 10'>
                        <path
                            d='M0,4.5 L100,4.75 L100,5.25 L0,5.5 Z'
                            fill={`url(#${ids.divider})`}
                            vectorEffect='non-scaling-stroke'
                        />
                    </svg>
                    {reviewData ?
                        <div className={styles.reviewsContainer} >
                            {percentage ? <span className={styles.percentage} >{`${percentage.toFixed(2)}% `}</span> : null}
                            <span className={`${styles[camelCase(desc)]} ${styles.ratingDesc}`} >{desc}</span>
                        </div>
                        : null}
                </div>
            </div>
        </div>

    )
}