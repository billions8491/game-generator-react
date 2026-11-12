import styles from './GameCards.module.css';
import { GameCard } from './GameCard';
import { CardButton } from './CardButton';
import { CarousalPosition } from './CarousalPosition';
import { OpenButton } from './OpenButton';
import { useLayoutEffect, useRef } from 'react';
import { animateWithFLIP } from '../helpers';

export function GameCards({ activeData, currentGameIndex, setCurrentGameIndex, gameData, reviewData }) {

    const gamesArray = activeData?.items

    const threeGamesArray = activeData.items.slice(0, 2)

    const getGame = offset => {
        const index =
            (currentGameIndex + offset + gamesArray.length) % gamesArray.length;
        return gamesArray[index]
    };

    const prevPrevGame = getGame(-2);
    const previousGame = getGame(-1);
    const currentGame = getGame(0);
    const nextGame = getGame(1);
    const nextNextGame = getGame(2);

    const skipAnimationRef = useRef(false)

    const prevPrevRef = useRef(null)
    const previousRef = useRef(null);
    const currentRef = useRef(null);
    const nextRef = useRef(null);
    const nextNextRef = useRef(null);


    const oldRectsRef = useRef({})

    function navigate(direction) {

        oldRectsRef.current = {};

        function saveSnapshot(game, ref, rotateY, opacity) {
            const element = ref.current;
            if (!element) return

            oldRectsRef.current[game.id] = {
                rect: element.getBoundingClientRect(),
                width: element.offsetWidth,
                rotateY,
                opacity
            }
        }

        saveSnapshot(prevPrevGame, prevPrevRef, 124.3, 0);
        saveSnapshot(previousGame, previousRef, 70, 0.5);
        saveSnapshot(currentGame, currentRef, 0, 1);
        saveSnapshot(nextGame, nextRef, -70, 0.5);
        saveSnapshot(nextNextGame, nextNextRef, -124.3, 0);

        direction === "left" ?
            setCurrentGameIndex(prev => prev === 0 ? gamesArray.length - 1 : prev - 1) :
            setCurrentGameIndex(prev => prev === gamesArray.length - 1 ? 0 : prev + 1)
    }

    useLayoutEffect(() => {   // Runs AFTER indexes change

        if (skipAnimationRef.current) {
            skipAnimationRef.current = false;
            return;
        }

        animateWithFLIP(prevPrevGame.id, prevPrevRef, oldRectsRef)
        animateWithFLIP(previousGame.id, previousRef, oldRectsRef)
        animateWithFLIP(currentGame.id, currentRef, oldRectsRef)
        animateWithFLIP(nextGame.id, nextRef, oldRectsRef)
        animateWithFLIP(nextNextGame.id, nextNextRef, oldRectsRef)

    }, [currentGameIndex])

    return (
        <section className={styles.gameCardSection} >
            <svg className={styles.frameSVG} viewBox='0 0 100 100' preserveAspectRatio="none">
                <defs>
                    <g id="tickGroup" className={styles.tickGroup} >
                        <path d="M0,0 V2" />
                        <path d="M1,0 V2" />
                        <path d="M2,0 V2" />
                        <path d="M3,0 V2" />
                    </g>
                    <g id="plusSymbol" className={styles.plusSymbol}>
                        <path d="M0,-1.5 V1.5 M-0.8,0 H0.8" />
                    </g>
                </defs>
                <g stroke="rgba(0,225,225)" strokeWidth="1.5">
                    <use
                        href="#plusSymbol"
                        x="50"
                        y="0"
                    />
                    <use
                        href="#plusSymbol"
                        x="50"
                        y="100"
                    />
                </g>

                <g stroke="rgba(0,225,225)" strokeWidth="1.5">
                    <use href="#tickGroup" x="32" y="-1" />
                    <use href="#tickGroup" x="65" y="-1" />
                    <use href="#tickGroup" x="32" y="99" />
                    <use href="#tickGroup" x="65" y="99" />
                </g>
                <path className={styles.mainFrame}
                    d={`
                        M5,25 L5,2 L6,0 L94,0 L95,2 L95,25
                        M95,52 L95,98 L94,100 L6,100 L5,98  L5,52
                 ${gamesArray.length === 1 ? 'M95,24 L95,53 M5,53 L5,24' : null}
                `}

                    filter="url(#cyanGlow)"
                />
                <path className={styles.boldAccents}
                    d='
                M5,7 L5,2 L6,0 L10,0
                M90,0 L94,0 L95,2 L95,7
                M95,93 L95,98 L94,100 L90,100
                M10,100 L6,100 L5,98 L5,93
                '
                />
            </svg>
            {gamesArray.length ? <div className={`${styles.gameCards}  ${gamesArray.length === 1 ? styles.oneGame :
                gamesArray.length === 2 ? styles.twoGames :
                    gamesArray.length === 3 ? styles.threeGames : ""}`}
            >
                {gamesArray.length > 4 ? // prevPrev
                    <div className={`${styles.outerOuterCardContainers} ${styles.prevPrevWrapper}`} ref={prevPrevRef} key={prevPrevGame.id} >
                        <GameCard game={prevPrevGame} carouselPosition="prevPrev" />
                    </div>
                    : null}
                {gamesArray.length > 2 ? // prevGame
                    <div className={`${styles.outerCardContainers} ${styles.previousWrapper}`} ref={previousRef} key={previousGame.id}>
                        <GameCard game={previousGame} carouselPosition="previous" />
                        <CardButton direction='left' navigate={navigate} />
                    </div>
                    : null}
                <div className={styles.currentWrapper} ref={currentRef} key={currentGame.id}> {/* CURRENT GAME */}
                    <GameCard game={currentGame} carouselPosition="current" />
                </div>
                {gamesArray.length > 1 ? // nextGame
                    <div className={`${styles.outerCardContainers} ${styles.nextWrapper}`} ref={nextRef} key={nextGame.id}>
                        <GameCard game={nextGame} carouselPosition="next" />
                        <CardButton direction='right' navigate={navigate} />
                    </div>
                    : null}
                {gamesArray.length > 4 ? // nextNext
                    <div className={`${styles.outerOuterCardContainers} ${styles.nextNextWrapper}`} ref={nextNextRef} key={nextNextGame.id}>
                        <GameCard game={nextNextGame} carouselPosition="nextNext" />
                    </div>
                    : null}
            </div> : null}
            

            <div className={styles.positionAndButtons} >
                {gamesArray.length > 1 ?
                 <CarousalPosition currentGameIndex={currentGameIndex} setCurrentGameIndex={setCurrentGameIndex} skipAnimationRef={skipAnimationRef} gamesArray={gamesArray} gameData={gameData} reviewData={reviewData}/> 
                 : null}
                <div className={styles.buttonsDiv} >
                    <div className={styles.OpenButtonsContainer} >
                        <OpenButton type='steam' activeData={activeData} currentGameIndex={currentGameIndex} />
                        <OpenButton type='browser' activeData={activeData} currentGameIndex={currentGameIndex} />
                    </div>
                </div>
            </div>
        </section>
    )
}