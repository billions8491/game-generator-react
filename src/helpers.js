
export async function getDeals() {
    try {
        const response = await fetch(window.location.hostname === 'localhost' ?
            'http://localhost:5000/steam-deals' :
            'https://game-generator.onrender.com/steam-deals');
        if (response.ok) {
            const data = await response.json();
            // const dailyDealKey = Object.keys(data).find(key => data[key].name === 'Daily Deal');

            return data
        }
    } catch (error) {
        console.log(error.message);
    }
}

export async function getGameData(id) {
    try {
        const response = await fetch(window.location.hostname === 'localhost' ?
            `http://localhost:5000/steam-game-data/?id=${id}` :
            'https://game-generator.onrender.com/steam-game-data');
        if (response.ok) {
            const data = await response.json();
            return data[id].data
        }
    } catch (error) {
        console.log(error.message)
    }
}

export async function getRecommendationData(id) {
    try {
        const response = await fetch(window.location.hostname === 'localhost' ?
            `http://localhost:5000/steam-reviews/?id=${id}` :
            'https://game-generator.onrender.com/steam-reviews');
        if (!response.ok) {
            console.warn(`Steam reviews request failed: ${response.status}`);
            return null;
        }
        if (response.ok) {

            const data = await response.json();
            return data;
        }

    } catch (error) {
        console.log(error.message)
        return null
    }
}

export async function getTags(id) {
    try {
        const response = await fetch(window.location.hostname === 'localhost' ?
            `http://localhost:5000/steam-tags/?id=${id}` :
            `https://game-generator.onrender.com/steam-tags?id=${id}`);

        if (!response.ok) {
            console.warn(`Steam tags request failed: ${response.status}`);
            return null;
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error.message)
        return null
    }
}

export function formatPrice(price) {
    if (price) {
        return `$${(price / 100).toFixed(2)}`
    } else if (price === 0) {
        return "Currently FREE!"
    }
}

export function animateWithFLIP(id, gameRef, oldRectsRef) {

    if (!gameRef.current || !oldRectsRef.current[id]) return;

    const newGame = gameRef.current

    const oldSnapshot = oldRectsRef.current[id];
    const newGameRect = newGame.getBoundingClientRect();

    const oldGameCenter = oldSnapshot.rect.x + oldSnapshot.rect.width / 2;
    const newGameCenter = newGameRect.x + newGameRect.width / 2;
    const deltaX = oldGameCenter - newGameCenter;

    const scaling = oldSnapshot.width / newGame.offsetWidth;

    newGame.style.transition = "none";

    newGame.style.opacity = oldSnapshot.opacity;

    newGame.style.transform = `translateX(${deltaX}px) rotateY(${oldSnapshot.rotateY}deg) scale(${scaling})`;

    const invertedRect = newGame.getBoundingClientRect();

    const invertedCenter =
        invertedRect.x + invertedRect.width / 2;

    const correction =
        oldGameCenter - invertedCenter;

    const correctedDeltaX = deltaX + correction

    newGame.style.transform = `translateX(${correctedDeltaX}px) rotateY(${oldSnapshot.rotateY}deg) scale(${scaling})`

    newGame.style.transition = "transform 500ms ease, opacity 500ms ease";

    const clearTransition = (event) => {
        if (event.target !== newGame || event.propertyName !== "transform") return;
        newGame.style.transition = "";
        newGame.removeEventListener("transitionend", clearTransition);
    };
    newGame.addEventListener("transitionend", clearTransition);

    newGame.style.transform = "";
    newGame.style.opacity = "";
}