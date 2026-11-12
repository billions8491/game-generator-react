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

            <svg className={styles[`${type}OuterGlowSVG`]} viewBox="0 0 100 100" preserveAspectRatio="none">
                <use href="#buttonFrame" fill='transparent' strokeWidth='1' stroke='rgba(1,1,1)' />
            </svg>

            <svg className={styles[`${type}ButtonSVG`]} viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    {/*  Main Gradients for background glow  */}
                    <linearGradient id={`${type}HorizontalBackground`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={type === "steam" ? "cyan" : "red"} stopOpacity=".08" />
                        <stop offset="12%" stopColor='black' stopOpacity=".3" />
                        <stop offset="30%" stopColor='black' stopOpacity=".15" />
                        <stop offset="50%" stopColor={type === "steam" ? "cyan" : "red"} stopOpacity=".10" />
                        <stop offset="90%" stopColor='black' stopOpacity=".2" />

                        <stop offset="100%" stopColor={type === "steam" ? "cyan" : "red"} stopOpacity=".08" />
                    </linearGradient>
                    <linearGradient id={`${type}VerticalBackground`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={type === "steam" ? "cyan" : "red"} stopOpacity=".08" />
                        <stop offset="25%" stopColor='black' stopOpacity=".25" />
                        <stop offset="50%" stopColor={type === "steam" ? "cyan" : "red"} stopOpacity=".05" />
                        <stop offset="70%" stopColor='black' stopOpacity=".25" />
                        <stop offset="90%" stopColor='black' stopOpacity=".25" />
                        <stop offset="100%" stopColor={type === "steam" ? "cyan" : "red"} stopOpacity=".08" />
                    </linearGradient>

                    {/* Gradients used by mask elements for perpendicular fading of the Main Gradients */}
                    <linearGradient id={`${type}VerticalFade`} x1="0%" y1="25%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="black" />
                        <stop offset="50%" stopColor="white" />
                        <stop offset="100%" stopColor="black" />
                    </linearGradient>

                    <linearGradient id={`${type}HorizontalFade`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="30%" stopColor="black" />
                        <stop offset="70%" stopColor="white" />
                        <stop offset="100%" stopColor="black" />
                    </linearGradient>

                    <mask id={`${type}VerticalFadeMask`}>
                        <rect
                            width="100%"
                            height="100%"
                            fill={`url(#${type}VerticalFade)`}
                        />
                    </mask>

                    <mask id={`${type}HorizontalFadeMask`}>
                        <rect
                            width="100%"
                            height="100%"
                            fill={`url(#${type}HorizontalFade)`}
                        />
                    </mask>

                    <path id="buttonFrame"
                        d="M6,0 L94,0 L100,20 L100,80 L94,100 L6,100 L0,80 L0,20 Z"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path id="buttonInnerFrame"
                        d="M8,10 L44,9 L45,14 L55,14 L56,9 L92,9 L97.5,28 L97.5,72 L92,91 L8,91 L2.5,72 L 2.5,28 Z"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path id="buttonCornerAccents"
                        d="
                        M6,0 L16,0 L14,4 L7,4 L0,27 L0,20
                        M6,100 L16,100 L14,96 L7,96 L0,73 L0,80    
                        M94,0 L84,0 L86,4 L93,4 L100,27 L100,20
                        M94,100 L84,100 L86,96 L93,96 L100,73 L100,80              
                        "
                        vectorEffect="non-scaling-stroke"
                    />
                    <path id="buttonNotches"
                        d="M40,0 L43,8 H57 L60,0 M40,100 L43,92 H57 L60,100"
                        vectorEffect="non-scaling-stroke"
                    />
                    <clipPath id={`${type}NoiseClip`}>
                        <use href="#buttonFrame" />
                    </clipPath>
                </defs>
                <use
                    href="#buttonFrame"
                    fill={`url(#${type}HorizontalBackground)`}
                    mask={`url(#${type}VerticalFadeMask)`}
                />
                <use
                    href="#buttonFrame"
                    fill={`url(#${type}VerticalBackground)`}
                    mask={`url(#${type}HorizontalFadeMask)`}
                />
                <rect
                    width="100"
                    height="100"
                    filter={`url(#${type}Noise)`}
                    clipPath={`url(#${type}NoiseClip)`}
                    opacity=".12"
                />
                <use
                    href="#buttonFrame"
                    className={styles[`${type}ButtonFrame`]}
                    fill="none"
                    strokeWidth="1"
                />
                
                <use
                    href="#buttonCornerAccents"
                    className={styles[`${type}ButtonCornerAccents`]}
                />
                <use
                    href="#buttonNotches"
                    className={styles[`${type}ButtonDetails`]}
                    fill="none"
                    strokeWidth="1"

                />
                <g
                    className={styles[`${type}ButtonDetails`]}
                    fill="none"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    stroke={type === 'steam' ? 'cyan' : 'rgb(255,25,25)'}
                >
                    <path d="M47,4 V10 M50,4 V10 M53,4 V10" />
                    <path d="M82,80 V87 M85,80 V87 M88,80 V87" />
                </g>
                <path
                    d={type === 'steam' ?
                         'M30 30 V60' :
                          'M32 30 V60'}
                    fill="none"
                    stroke={type === "steam" ? "cyan" : "red"}
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap='round'
                />
                <path className={styles[`${type}BrightDivider`]}
                    d={type === 'steam' ?
                         'M30 35 V50 M30 65 V70' :
                          'M32 35 V50 M32 65 V70'}
                    fill="none"
                    stroke={type === "steam" ? "rgb(150,255,255)" : "rgb(255,150,150)"}
                    strokeWidth="2.5"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap='round'
                />
                <use
                    href="#buttonInnerFrame"
                    className={styles[`${type}ButtonInnerFrame`]}
                    fill="none"
                    strokeWidth="1"
                />
            </svg>
            <div className={styles.iconAndSpan} >
                {/* Conditional below determines the logo being used */}
                <div className={styles.iconsWrapper} >
                    {type === 'steam' ?
                        <>
                            <img src={steamLogo} className={styles.steamImg} alt='Steam logo' />
                            <svg className={styles.steamImgRingSVG} viewBox='0 0 100 100' preserveAspectRatio='none'>
                                <path className={styles.brightSteamImgRing}
                                    // bright portions of ring
                                    d="
                                    M50,8 A42,42 0 0 1 66.16,11 
                                    M74.09,15.60 A42,42 0 0 1 90.57,39.13
                                    M33.14,88.10 A42,42 0 0 1 8.03,51.47
                                    "
                                    fill="none"
                                    stroke="cyan"
                                    strokeWidth="4.5"
                                />
                                <path
                                    // dim portions of ring
                                    d="
                                    M91.75,46.00 A42,42 0 0 1 88.00,68
                                    M86.40,72.09 A42,42 0 0 1 72.10,85.81
                                    M68.41,87.75 A42,42 0 0 1 35.95,89
                                    M8,49 A42,42 0 0 1 11.5,32.5
                                    M12.58,30.93 A42,42 0 0 1 18.30,22.45
                                    M20.82,19.79 A42,42 0 0 1 44.28,8.2
                                    "
                                    fill="none"
                                    stroke="rgb(0,100,100)"
                                    strokeWidth="4"
                                />
                            </svg>
                        </>
                        :
                        <>
                            <svg viewBox="0 0 24 24" className={styles.browserButtonIcon}>
                                <circle cx="12" cy="12" r="9" />
                                <ellipse cx="12" cy="12" rx="3" ry="9" />
                                <path d="M3 12 L21 12" />
                                <path d="M5 7 Q12 10 19 7" />
                                <path d='M5 17 Q12 14 19 17' />
                            </svg>
                            <svg className={styles.browserIconRingSVG} viewBox='0 0 100 100' preserveAspectRatio='none' >
                                <g transform='rotate(180 50 50)' >
                                    <path className={styles.brightBrowserIconRing}
                                        d="
                                    M50,8 A42,42 0 0 1 66.16,11 
                                    M74.09,15.60 A42,42 0 0 1 90.57,39.13
                                    M33.14,88.10 A42,42 0 0 1 8.03,51.47
                                    "
                                        fill="none"
                                        stroke="rgb(255,195,195)"
                                        strokeWidth="4.5"
                                    />
                                    <path
                                        d="
                                    M91.75,46.00 A42,42 0 0 1 88.00,68
                                    M86.40,72.09 A42,42 0 0 1 72.10,85.81
                                    M68.41,87.75 A42,42 0 0 1 35.95,89
                                    M8,49 A42,42 0 0 1 11.5,32.5
                                    M12.58,30.93 A42,42 0 0 1 18.30,22.45
                                    M20.82,19.79 A42,42 0 0 1 44.28,8.2
                                    "
                                        fill="none"
                                        stroke="rgb(130,0,0)"
                                        strokeWidth="4"
                                    />
                                </g>
                            </svg>
                        </>
                    }
                </div>
                <span className={styles[`${type}Span`]} >{type === 'steam' ? 'Open in Steam App' : 'Open in Browser'}</span>
            </div>
        </button>
    )
}