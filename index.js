const express = require("express");
const hbs = require("express-handlebars");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const navRoutes = require("./routes/navRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./middlewares/authMiddleware");

require("dotenv").config();

// Connect to DB
dbUser = process.env.DB_USER;
dbPass = process.env.DB_PASSWORD;
mongoose.connect(
	`mongodb+srv://${dbUser}:${dbPass}@cluster0.iqzkooa.mongodb.net/?retryWrites=true&w=majority`,
	() => console.log("DB Connected")
);

// Middleware
app.engine("hbs", hbs.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

// Import Routes
app.use(authRoutes);
app.use(navRoutes);

// Get Routes
app.get("/", requireAuth, (req, res) => {
	res.render("Index", {
		style: "home.css",
	});
});

// Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
