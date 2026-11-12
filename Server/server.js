require('dotenv').config();

const express = require("express")
const cors = require("cors")
const cheerio = require('cheerio')

const app = express();

const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? 'https://billions8491.github.io'
        : 'http://localhost:3000',
    methods: "GET",
};

app.use(cors(corsOptions));



app.get("/steam-tags", async (req, res) => {
    const id = req.query.id;

    try {
        const response = await fetch(
            `https://store.steampowered.com/app/${id}/?l=english`,
            {
                headers: {
                    Cookie: "birthtime=1"
                }
            }
        );

        if (!response.ok || !response.headers.get("content-type")?.includes("html")) {
            console.error("Unexpected Steam response:", response.status, response.url);
            return res.status(502).json({ error: "Steam tags unavailable" });
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        const tags = [];

        $(".glance_tags .app_tag").each((_, element) => {
            tags.push($(element).text().trim());
        });

        res.json(tags);


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch Steam tags" })
    }
});


app.get("/steam-deals", async (req, res) => {
    try {
        const response = await fetch('https://store.steampowered.com/api/featuredcategories/?cc=us&l=english');

        if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) {
            console.error("Unexpected Steam response:", response.status, response.url);
            return res.status(502).json({ error: "Steam deals unavailable" });
        }

        const data = await response.json();
        res.json(data)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch Steam deals" })
    }
})

app.get("/steam-game-data", async (req, res) => {
    const id = req.query.id;
    try {
        const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${id}&format=json`);

        if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) {
            console.error("Unexpected Steam response:", response.status, response.url);
            return res.status(502).json({ error: "Steam game data unavailable" });
        }

        const data = await response.json();
        res.json(data)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch game data" })
    }
})

app.get("/steam-reviews", async (req, res) => {
    const id = req.query.id;
    try {
        const input = {
            appid: Number(id),
            languages: ["all"],
            purchase_type: 0,
            filter_offtopic_activity: false
        };
        const response = await fetch(
            `https://api.steampowered.com/IUserReviewsService/GetAppReviews/v1/?input_json=${encodeURIComponent(JSON.stringify(input))}`
        );

        if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) {
            console.error("Unexpected Steam response:", response.status, response.url);
            return res.status(502).json({ error: "Steam reviews unavailable" });
        }

        const data = await response.json();
        res.json(data.response)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
})

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log('✅ Server is running on port 5000');
});