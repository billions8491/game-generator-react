const urlToFetch = window.location.hostname === 'localhost' ? 'http://localhost:5000/steam-deals' : 'https://game-generator.onrender.com/steam-deals';

export async function getDeals() {
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const data = await response.json();
            // const dailyDealKey = Object.keys(data).find(key => data[key].name === 'Daily Deal');

            return data
        }
    } catch (error) {
        console.log(error.message);
    }
}

export function formatPrice(price) {
    if (price > 0) {
        return `$${price / 100}`
    } else {
        return "FREE"
    }
}