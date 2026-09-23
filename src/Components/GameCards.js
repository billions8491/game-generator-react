import styles from './GameCards.module.css';
import steamLogo from '../images/steam-logo.svg';
import { GameCard } from './GameCard';
import { ArrowButton } from './ArrowButton';
import { OpenButton } from './OpenButton';
import { useLayoutEffect, useRef } from 'react';
import { animateWithFLIP } from '../helpers';

export function GameCards({ activeData, currentGameIndex, setCurrentGameIndex }) {

    const gamesArray = activeData?.items


    const getGame = offset => {
        const index =
            (currentGameIndex + offset + gamesArray.length) %
            gamesArray.length;
        return gamesArray[index]
    };

    const prevPrevGame = getGame(-2);
    const previousGame = getGame(-1);
    const currentGame = getGame(0);
    const nextGame = getGame(1);
    const nextNextGame = getGame(2);

    const prevPrevRef = useRef(null)
    const previousRef = useRef(null);
    const currentRef = useRef(null);
    const nextRef = useRef(null);
    const nextNextRef = useRef(null);

    const oldRectsRef = useRef({})

    function Next() {

        oldRectsRef.current = { // Takes snapshot of positions before positions change
            [prevPrevGame?.id]: {
                rect: prevPrevRef.current?.getBoundingClientRect(),
                width: prevPrevRef.current?.offsetWidth,
                rotateY: 124.3,
                opacity: 0
            },
            [previousGame.id]: {
                rect: previousRef.current?.getBoundingClientRect(),
                width: previousRef.current?.offsetWidth,
                rotateY: 70,
                opacity: 0.5
            },

            [currentGame.id]: {
                rect: currentRef.current.getBoundingClientRect(),
                width: currentRef.current.offsetWidth,
                rotateY: 0,
                opacity: 1
            },

            [nextGame.id]: {
                rect: nextRef.current.getBoundingClientRect(),
                width: nextRef.current.offsetWidth,
                rotateY: -70,
                opacity: 0.5
            },
            [nextNextGame?.id]: {
                rect: nextNextRef.current?.getBoundingClientRect(),
                width: nextNextRef.current?.offsetWidth,
                rotateY: -124.3,
                opacity: 0
            }
        };

        setCurrentGameIndex(prev => prev === gamesArray.length - 1 ? 0 : prev + 1)
    }

    function Previous() {

        oldRectsRef.current = {
            [prevPrevGame?.id]: {
                rect: prevPrevRef.current?.getBoundingClientRect(),
                width: prevPrevRef.current?.offsetWidth,
                rotateY: 124.3,
                opacity: 0
            },
            [previousGame?.id]: {
                rect: previousRef.current?.getBoundingClientRect(),
                width: previousRef.current?.offsetWidth,
                rotateY: 70,
                opacity: 0.5
            },

            [currentGame.id]: {
                rect: currentRef.current?.getBoundingClientRect(),
                width: currentRef.current.offsetWidth,
                rotateY: 0,
                opacity: 1
            },

            [nextGame.id]: {
                rect: nextRef.current.getBoundingClientRect(),
                width: nextRef.current.offsetWidth,
                rotateY: -70,
                opacity: 0.5
            },
            [nextNextGame?.id]: {
                rect: nextNextRef.current?.getBoundingClientRect(),
                width: nextNextRef.current?.offsetWidth,
                rotateY: -124.3,
                opacity: 0
            }
        };
        setCurrentGameIndex(prev => prev === 0 ? gamesArray.length - 1 : prev - 1)
    }

    useLayoutEffect(() => {   // Runs AFTER indexes change

        animateWithFLIP(prevPrevGame.id, prevPrevRef, oldRectsRef)
        animateWithFLIP(previousGame.id, previousRef, oldRectsRef)
        animateWithFLIP(currentGame.id, currentRef, oldRectsRef)
        animateWithFLIP(nextGame.id, nextRef, oldRectsRef)
        animateWithFLIP(nextNextGame.id, nextNextRef, oldRectsRef)

    }, [currentGameIndex])

    return (
        <section className={styles.gameCardSection} >
            <div className={`${styles.gameCards} ${gamesArray.length === 1 ? styles.oneGame : ""}`} >
                {gamesArray.length > 4 ?
                    <div className={`${styles.outerOuterCardContainers} ${styles.prevPrevWrapper}`} ref={prevPrevRef} key={prevPrevGame.id} >
                        <GameCard game={prevPrevGame} carouselPosition="prevPrev" />
                    </div>
                    : null}
                {gamesArray.length > 2 ?
                    <div className={`${styles.outerCardContainers} ${styles.previousWrapper}`} ref={previousRef} key={previousGame.id}>
                        <GameCard game={previousGame} carouselPosition="previous" />
                    </div>
                    : null}
                <div className={styles.currentWrapper} ref={currentRef} key={currentGame.id}>
                    <GameCard game={currentGame} carouselPosition="current" />
                </div>
                {gamesArray.length > 1 ?
                    <div className={`${styles.outerCardContainers} ${styles.nextWrapper}`} ref={nextRef} key={nextGame.id}>
                        <GameCard game={nextGame} carouselPosition="next" />
                    </div>
                    : null}
                {gamesArray.length > 4 ?
                    <div className={`${styles.outerOuterCardContainers} ${styles.nextNextWrapper}`} ref={nextNextRef} key={nextNextGame.id}>
                        <GameCard game={nextNextGame} carouselPosition="nextNext" />
                    </div>
                    : null}
            </div>
            <div className={styles.buttonsDiv} >
                {activeData?.items?.length > 1 ? <ArrowButton direction="left" onClick={Previous} /> : null}
                <div className={styles.buttonsContainer} >
                    <OpenButton type='steam' activeData={activeData} currentGameIndex={currentGameIndex} />
                    <OpenButton type='browser' activeData={activeData} currentGameIndex={currentGameIndex} />
                </div>
                {activeData?.items?.length > 1 ? <ArrowButton direction="right" onClick={Next} /> : null}
            </div>
        </section>
    )
}