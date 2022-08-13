const express = require("express");
const session = require("express-session");
const hbs = require("express-handlebars");
const { redirect } = require("express/lib/response");
const app = express();
const port = process.env.PORT || 3000;

//Dotenv
require("dotenv/config");

//Middleware
app.engine("hbs", hbs.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.get("/", (req, res) => {
	res.render("index", {
		style: "home.css",
	});
});

app.get("/login.hbs", (req, res) => {
	res.render("Login", {
		style: "login.css",
	});
});

app.get("/series", (req, res) => {
	res.render("series.hbs", {
		style: "series.css",
	});
});

app.get("/overview", (req, res) => {
	res.render("overview.hbs", {
		style: "overview.css",
	});
});

app.get("/search", (req, res) => {
	res.render("search.hbs", {
		style: "search.css",
	});
});

app.get("/:id", (req, res) => {
	res.render("overview.hbs", {
		style: "overview.css",
	});
});

app.get("/:id/season/:id", (req, res) => {
	res.render("season.hbs", {
		style: "../../../css/season.css",
	});
});

app.get("/:id/season/:id/episode/:id", (req, res) => {
	res.render("episode.hbs", {
		style: "../../../../../css/episode.css",
	});
});

app.use((req, res) => {
	res.json("404");
});

//Listen
app.listen(port, () => {
	console.log(`Server online on port ${port}`);
});
