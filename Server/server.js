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

    const response = await fetch(
        `https://store.steampowered.com/app/${id}/?l=english`,
        {
            headers: {
                Cookie: "birthtime=1"
            }
        }
    );

    const html = await response.text();
    const $ = cheerio.load(html);

    const tags = [];

    $(".glance_tags .app_tag").each((_, element) => {
        tags.push($(element).text().trim());
    });
    res.json(tags);
});


app.get("/steam-deals", async (req, res) => {
    try {
        const response = await fetch('https://store.steampowered.com/api/featuredcategories/?cc=us&l=english');
        const data = await response.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Steam data" })
    }
})

app.get("/steam-game-data", async (req, res) => {
    const id = req.query.id;
    try {
        const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${id}&format=json`);
        const data = await response.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Steam data" })
    }
})

app.get("/steam-reviews", async (req, res) => {
    const id = req.query.id;
    try {
        const response = await fetch(`https://store.steampowered.com/appreviews/${id}?json=1&language=all&purchase_type=steam&filter_offtopic_activity=0`);
        const data = await response.json();
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Steam data" })
    }
})

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log('✅ Server is running on port 5000');
});