import styles from './GameCard.module.css'

export function GameCard({ game, carouselPosition, ref }) {

     return (
        
        <div ref={ref} className={`${styles.gameCard} ${styles[carouselPosition]}`}>
            <svg className={styles.imgOverlay} viewBox='0 0 460 215' fill='none'>
                <defs>
                    <path
                        id="gameCardShape"
                        d="M10,0 L450,0 L460,10 L460,205 L450,215 L10,215 L0,205 L0,10 Z"
                    />
                    <clipPath id="gameCardClip">
                        <use
                            href="#gameCardShape"
                            transform="translate(7 6) scale(.97 .94)"
                        />
                    </clipPath>
                </defs>
                <use className={styles.gameCardShape}
                    href="#gameCardShape"
                    fill="rgba(0, 0, 0, 0.65)"
                />
                <image className={styles.svgImage} href={game.header_image} preserveAspectRatio="xMidYMid slice"
                    clipPath='url(#gameCardClip)'
                    height="100%"
                    width="100%"
                />
                <use
                    href="#gameCardShape"
                    className={styles.gameCardPath}
                    fill="none"
                    stroke="rgba(117, 255, 255)"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                />
                <path // border thickening accent segments
                    className={styles.thickBorders}
                    d='
                    M0,30 L0,10 L10,0 L40,0
                    M460,30 L460,10 L450,0 L420,0
                    M460,185 L460,205 L450,215 L420,215
                    M0,185 L0,205 L10,215 L40,215'
                    fill="none"
                    stroke="rgba(117, 255, 255)"
                    strokeWidth="2.5"
                    strokeLinejoin='round'
                    strokeLinecap="round"
                />
            </svg>
        </div>
    )
}