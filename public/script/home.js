const express = require("express");
const session = require("express-session");
const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const user = require("./models/user");
const app = express();
const port = 3000;

//Dotenv
require("dotenv/config");

//Mongoose
mongoose.connect(process.env.dbConnection, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

//Middleware
app.engine("hbs", hbs.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(
	session({
		secret: process.env.pass,
		resave: false,
		saveUninitialized: true,
	})
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	const user = require("./models/user");
	user.findById(id, function (err, user) {
		done(err, user);
	});
});

passport.use(
	new localStrategy(function (id, done) {
		user.findOne({ username: username }, function (err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {
					message: "Usuário incorreto ou não existe",
				});
			}

			bcrypt.compare(password, user.password, function (err, res) {
				if (err) return done(err);

				if (res === false) {
					return done(null, false, { message: "Senha incorreta" });
				}

				return done(null, user);
			});
		});
	})
);

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/home.html");
}
