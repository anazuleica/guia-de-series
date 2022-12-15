const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// handle errors
const handleErrors = (err) => {
	console.log(err.message, err.code);
	let errors = { username: "", password: "" };

	// incorrect email
	if (err.message == "Usuário incorreto") {
		errors.username = "Usuário não encontrado";
	}

	// incorrect password
	if (err.message == "Senha incorreta") {
		errors.password = "Senha incorreta";
	}

	// duplicate email error
	if (err.code === 11000) {
		errors.username = "Esse nome de usuário já existe";
		return errors;
	}

	// validation errors
	if (err.message.includes("User validation failed")) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}

	return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: maxAge,
	});
};

// controller actions
module.exports.register_get = (req, res) => {
	res.render("register", {
		style: "register.css",
	});
};

module.exports.login_get = (req, res) => {
	res.render("login", {
		style: "login.css",
	});
};

module.exports.register_post = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.create({ username, password });
		const token = createToken(user._id);
		res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.cookie("userId", user._id);
		res.status(201).json(user);
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.login_post = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.login(username, password);
		const token = createToken(user._id);
		res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.cookie("userId", user._id);
		res.status(200).json({ user: user._id });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};
