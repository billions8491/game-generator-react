import styles from './CarousalPosition.module.css'
import { Tooltip } from './Tooltip';

export function CarousalPosition({ gamesArray, currentGameIndex, setCurrentGameIndex, skipAnimationRef, gameData, reviewData }) {

    return (
        <div className={styles.carousalPositionDiv} >
            <div className={styles.lineAndButtons} >
                <div className={styles.linethrough} ></div>
                {gamesArray.map((game, index) => {
                    return (
                        <button
                            onClick={() => {
                                skipAnimationRef.current = true;
                                setCurrentGameIndex(index);
                            }}
                            key={game.id}
                            className={`${styles.carousalDot} ${index === currentGameIndex ? styles.currentGame : ""}`}>
                            <Tooltip gameData={gameData} reviewData={reviewData} game={game} id={game.id} visibility={styles.tooltipVisibility} />
                        </button>
                    )
                })}
            </div>
            <span className={styles.carousalPositionNumbers} >{`${currentGameIndex + 1} / ${gamesArray.length}`}</span>
        </div>
    )
}