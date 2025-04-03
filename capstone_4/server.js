// server.js
const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Home route
app.get("/", (req, res) => {
    res.render("index", { joke: null, error: null });
});

// Fetch joke from API
app.post("/getJoke", async (req, res) => {
    const { name } = req.body;
    const url = `https://v2.jokeapi.dev/joke/Any?type=single`;
    
    try {
        const response = await axios.get(url);
        const joke = response.data.joke.replace(/Chuck Norris/g, name || "Someone");
        res.render("index", { joke, error: null });
    } catch (error) {
        res.render("index", { joke: null, error: "Could not fetch a joke!" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
