const { Router } = require("express");
const { requireAuth } = require("../middlewares/authMiddleware");

const router = Router();

router.get("/", requireAuth, (req, res) => {
	res.render("Index.hbs", {
		style: "home.css",
	});
});

router.get("/series", requireAuth, (req, res) => {
	res.render("series.hbs", {
		style: "series.css",
	});
});

router.get("/overview", requireAuth, (req, res) => {
	res.render("overview.hbs", {
		style: "overview.css",
	});
});

router.get("/search", requireAuth, (req, res) => {
	res.render("search.hbs", {
		style: "search.css",
	});
});

router.get("/:id", requireAuth, (req, res) => {
	res.render("overview.hbs", {
		style: "overview.css",
	});
});

router.get("/:id/season/:id", requireAuth, (req, res) => {
	res.render("season.hbs", {
		style: "../../../css/season.css",
	});
});

router.get("/:id/season/:id/episode/:id", requireAuth, (req, res) => {
	res.render("episode.hbs", {
		style: "../../../../../css/episode.css",
	});
});

module.exports = router;
