import styles from './CardButton.module.css'

export function CardButton({ direction, navigate }) {
    return (
        <>
            <button className={styles.cardButton}
                onClick={() => navigate(direction)}>
            </button>
            <svg className={styles.svg} viewBox='0 0 460 215'>
                <path className={styles.overlayShape}
                    fill='none'
                    d="M10,0 L450,0 L460,10 L460,205 L450,215 L10,215 L0,205 L0,10 Z"
                    stroke='transparent'
                    strokeWidth='1'
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                />
                <path className={styles.thickBorders}
                    fill='none'
                    d='
                    M0,30 L0,10 L10,0 L40,0
                    M460,30 L460,10 L450,0 L420,0
                    M460,185 L460,205 L450,215 L420,215
                    M0,185 L0,205 L10,215 L40,215'
                    stroke='transparent'
                    strokeWidth="5"
                    strokeLinejoin='round'
                    strokeLinecap="round"
                />
            </svg>
        </>

    )
}