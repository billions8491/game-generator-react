import styles from './ArrowButton.module.css'

export function ArrowButton({ direction, onClick }) {
    return (
        <button onClick={() => onClick()} className={styles[`${direction}ArrowButton`]} >
            <svg viewBox='0 0 100 100' preserveAspectRatio='none'>
                <defs>
                    <linearGradient
                        id="redGradient"
                        x1="20"
                        x2="70"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="red" stopOpacity="0" />
                        <stop offset="100%" stopColor="red" stopOpacity="1" />
                    </linearGradient>
                </defs>
                <g transform={direction === "left" ? "rotate(180 50 50)" : undefined} >
                    <path // main inner arrow
                        d='
                                M45,25 L65,50 L45,75 L35,75 L55,50 L35,25'
                        fill='rgba(255,0,0, 0.8)' />
                    <path // angled solid accent border
                        d='M70,0 L100,50 L70,100'
                        fill='none'
                        stroke='red'
                        strokeWidth='2'
                        strokeLinecap='round'
                    />
                    <path // horizontal gradient accent borders
                        d='
                                M20,0 L70,0
                                M20,100 L70,100
                                '
                        fill='none'
                        stroke='url(#redGradient)'
                        strokeWidth='2'
                        strokeLinecap='round'
                    />
                </g>
            </svg>
            <svg className={styles[`${direction}ArrowOverlay`]} viewBox='0 0 100 100' preserveAspectRatio='none' >
                <defs>
                    <linearGradient
                        id="whiteGradient"
                        x1="20"
                        x2="70"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="100%" stopColor="white" stopOpacity="1" />
                    </linearGradient>
                </defs>
                <g transform={direction === "left" ? "rotate(180 50 50)" : undefined}>
                    <path // main inner arrow
                        d='
                                M45,25 L65,50 L45,75 L35,75 L55,50 L35,25'
                        fill='white' />
                    <path // angled solid accent border
                        d='M70,0 L100,50 L70,100'
                        fill='none'
                        stroke='white'
                        strokeWidth='2'
                        strokeLinecap='round'
                    />
                    <path // horizontal gradient accent borders
                        d='
                                M20,0 L70,0
                                M20,100 L70,100
                                '
                        fill='none'
                        stroke='url(#whiteGradient)'
                        strokeWidth='2'
                        strokeLinecap='round'
                    />
                </g>
            </svg>
        </button>
    )
}