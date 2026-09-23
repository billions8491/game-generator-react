
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
        if (response.ok) {
            const data = await response.json();
            return data;
        }

    } catch (error) {
        console.log(error.message)
    }
}

export async function getTags(id) {
    try {
        const response = await fetch(window.location.hostname === 'localhost' ?
            `http://localhost:5000/steam-tags/?id=${id}` :
            'https://game-generator.onrender.com/steam-tags');
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error.message)
    }
}

export function formatPrice(price) {
    if (price) {
        return `$${(price / 100).toFixed(2)}`
    } else {
        return "Currently FREE!"
    }
}

export function animateWithFLIP(id, gameRef, oldRectsRef) {

    if (!gameRef.current || !oldRectsRef.current[id]) return;

    const oldSnapshot = oldRectsRef.current[id];
    const newGameRect = gameRef.current.getBoundingClientRect();

    const oldGameCenter = oldSnapshot.rect.x + oldSnapshot.rect.width / 2;
    const newGameCenter = newGameRect.x + newGameRect.width / 2;
    const deltaX = oldGameCenter - newGameCenter;

    const scaling = oldSnapshot.width / gameRef.current.offsetWidth;

    gameRef.current.style.transition = "none";

    gameRef.current.style.opacity = oldSnapshot.opacity;

    gameRef.current.style.transform =
        `translateX(${deltaX}px) rotateY(${oldSnapshot.rotateY}deg) scale(${scaling})`;

    const invertedRect = gameRef.current.getBoundingClientRect();

    const invertedCenter =
        invertedRect.x + invertedRect.width / 2;

    const correction =
        oldGameCenter - invertedCenter;

        const correctedDeltaX = deltaX + correction

    gameRef.current.style.transform =
        `translateX(${correctedDeltaX}px) rotateY(${oldSnapshot.rotateY}deg) scale(${scaling})`



    gameRef.current.getBoundingClientRect();
    gameRef.current.style.transition = "transform 500ms ease, opacity 500ms ease";
    gameRef.current.style.transform = "";
    gameRef.current.style.opacity = "";
}