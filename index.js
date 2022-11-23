const express = require("express");
const session = require("express-session");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const { redirect } = require("express/lib/response");
const app = express();
const port = process.env.PORT || 3000;

//BodyParser
app.use(bodyParser.json());

//Dotenv
require("dotenv/config");

//Login
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

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

app.get("/login", (req, res) => {
	res.render("login.hbs", {
		style: "login.css",
	});
});

app.get("/register", (req, res) => {
	res.render("register.hbs", {
		style: "register.css",
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

//Credentials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
	.connect(
		`mongodb+srv://${dbUser}:${dbPassword}@cluster0.iqzkooa.mongodb.net/?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		console.log("Conectado ao banco");
	})
	.catch((err) => console.log(err.message));

//Models
const User = require("./public/models/user");

//Register User
app.post("/auth/register", async (req, res) => {
	const { username, password: PlainTextPassword } = req.body;

	if (!username || typeof username !== "string") {
		return res.json({ status: "error", error: "Nome de usuário inválido" });
	}

	if (!PlainTextPassword || typeof PlainTextPassword !== "string") {
		return res.json({ status: "error", error: "Senha inválida" });
	}

	if (PlainTextPassword.length < 5) {
		return res.json({
			status: "error",
			error: "A senha deve ter no mínimo 5 caracteres",
		});
	}

	const password = await bcrypt.hash(PlainTextPassword, 10);

	try {
		const response = await User.create({
			username,
			password,
		});
		console.log("Usuário criado com sucesso", response);
	} catch (error) {
		if (error.code === 11000) {
			//Usuário duplicado
			return res.json({ status: "error", error: "Nome de usuário já existe" });
		}
		throw error;
	}

	res.json({ status: "ok" });
});

//Listen
app.listen(port, () => {
	console.log("Server up at " + port);
});
