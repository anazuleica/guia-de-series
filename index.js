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
app.use(
	session({
		secret: process.env.pass,
		resave: false,
		saveUninitialized: true,
	})
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.get("/", (req, res) => {
	res.render("index", {
		style: "home.css",
	});
});

app.get("/login", (req, res) => {
	res.render("Login", {
		style: "login.css",
	});
});

app.get("/series", (req, res) => {
	res.render("Series", {
		style: "series.css",
	});
});

app.get("/overview", (req, res) => {
	res.render("Overview", {
		style: "overview.css",
	});
});

app.get("/search", (req, res) => {
	res.render("Search", {
		style: "search.css",
	});
});

app.get("/:id", (req, res) => {
	res.render("Overview", {
		style: "overview.css",
	});
});

app.get("/:id/season/:id", (req, res) => {
	res.render("Season", {
		style: "../../../css/season.css",
	});
});

app.get("/:id/season/:id/episode/:id", (req, res) => {
	res.render("Episode", {
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
