import styles from './OpenButton.module.css'
import steamLogo from '../images/steam-logo.svg';

export function OpenButton({ type, activeData, currentGameIndex }) {

    const gameId = activeData.items[currentGameIndex].id;

    return (
        <button
            className={styles[`${type}Button`]}
            onClick={() => {
                type === "steam" ?
                    window.location.href = `steam://store/${gameId}` :
                    window.open(`https://store.steampowered.com/app/${gameId}`, "_blank")
            }}>
            <svg className={styles.buttonSVG} viewBox='0 0 100 100' preserveAspectRatio='none'>
                <path className={styles[`${type}ButtonPath`]}
                    d='M7,0 L96,0 L100,15 L100,72 L93,100 L4,100 L0,85 L0,28 L7,0'
                    fill='none'
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap='round' />
            </svg>
            <div className={styles.iconAndSpan} >
                {type === 'steam' ? <img src={steamLogo} className={styles.steamImg} alt='Steam logo' /> : <svg viewBox="0 0 24 24" className={styles.browserButtonIcon}>
                    <circle cx="12" cy="12" r="9" />
                    <ellipse cx="12" cy="12" rx="3" ry="9" />
                    <path d="M3 12 L21 12" />
                    <path d="M5 7 Q12 10 19 7" />
                    <path d='M5 17 Q12 14 19 17' />
                </svg>}
                <span className={styles[`${type}Span`]} >{type === 'steam' ? 'Open in Steam App' : 'Open in Browser'}</span>
            </div>
        </button>
    )
}