import { useState } from 'react'
import styles from './ArrowButton.module.css'

export function ArrowButton({ direction, onClick }) {

    const [isBeingClicked, setIsBeingClicked] = useState(false);

    function clickAnimation() {
        setIsBeingClicked(true);
        setTimeout(() => {
            setIsBeingClicked(false)
        }, 300);
    }

    return (
        <button onClick={() => {
            onClick(direction)
            clickAnimation()
        }}
        className={`${styles[`${direction}ArrowButton`]} ${isBeingClicked ? styles[`${direction}ButtonIsBeingClicked`] : ""}`}>
            <svg viewBox='0 0 100 100' preserveAspectRatio='none'>
                <defs>
                    <linearGradient
                        id="redGradient"
                        x1="10"
                        x2="70"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="red" stopOpacity="0" />
                        <stop offset="100%" stopColor="red" stopOpacity="1" />
                    </linearGradient>
                </defs>
                <g transform={direction === "left" ? " translate(100 0) scale(-1 1)" : undefined} >
                    <path // main inner arrow
                        d='
                                M45,25 L60,50 L45,75 L35,75 L50,50 L35,25'
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
                                M10,0 L70,0
                                M10,100 L70,100
                                '
                        fill='none'
                        stroke='url(#redGradient)'
                        strokeWidth='2'
                        strokeLinecap='round'
                    />
                </g>

            </svg>

            {/*************************************** HOVERED OVERLAY ************************************/}

            <svg className={styles[`${direction}ArrowOverlay`]} viewBox='0 0 100 100' preserveAspectRatio='none' >
                <defs>
                    <linearGradient
                        id="whiteGradient"
                        x1="10"
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
                                M45,25 L60,50 L45,75 L35,75 L50,50 L35,25'
                        fill='rgba(255,185,185)' />
                    <path // angled solid accent border
                        d='M70,0 L100,50 L70,100'
                        fill='none'
                        stroke='rgba(255,185,185)'
                        strokeWidth='2'
                        strokeLinecap='round'
                    />
                    <path // horizontal gradient accent borders
                        d='
                                M10,0 L70,0
                                M10,100 L70,100
                                '
                        fill='none'
                        stroke='url(#whiteGradient)'
                        strokeWidth='2'
                        strokeLinecap='round'
                    />
                </g>
            </svg>
            <svg className={styles[`${direction}CyanAccents`]} viewBox='0 0 100 100' preserveAspectRatio='none'>
                <g transform={direction === "left" ? " translate(100 0) scale(-1 1)" : undefined}>
                    <path className={styles.mainCyanAccents} // main cyan accents
                        d='
                        M25,10 L12,10 L0,25
                        M25,90 L12,90 L0,75
                        '
                        fill='none'
                        stroke='rgba(0,255,255)'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                    />
                    <path className={styles.thinCyanAccent} // thin cyan accent
                        d='M0,26 L-7,36 L-7,64 L0,74'
                        fill='none'
                        stroke='rgba(0,255,255,.3'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                    />
                </g>
            </svg >

            {/*************************************** CLICKED OVERLAY ************************************/}

            <svg className={`${styles[`${direction}ClickedOverlay`]} ${isBeingClicked ? styles.isBeingClickedOverlay : ""}`} viewBox='0 0 100 100' preserveAspectRatio='none'>
                <defs>
                    <linearGradient
                        id="whiteGradient"
                        x1="10"
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
                                M45,25 L60,50 L45,75 L35,75 L50,50 L35,25'
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
                                M10,0 L70,0
                                M10,100 L70,100
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