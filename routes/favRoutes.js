const { Router } = require("express");
const { requireAuth } = require("../middlewares/authMiddleware");
const Show = require("../models/Show");
const User = require("../models/User");
const router = Router();

router.post("/favs", requireAuth, async (req, res) => {
	try {
		const newShow = new Show({
			id: req.body.id,
			name: req.body.name,
			owner: req.body.owner,
		});
		await newShow.save();
		res.json({ status: "ok" });
	} catch (err) {
		if (err.code === 11000) {
			res.json({ status: "error", error: "Série já adicionada" });
		}
		console.log(err);
	}
});
module.exports = router;

router.get("/favs", async (req, res) => {
	try {
		const favShows = await Show.find({});
		res.status(200).send(favShows);
	} catch (err) {
		res.status(400).send(error);
	}
});
