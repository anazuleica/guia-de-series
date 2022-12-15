const mongoose = require("mongoose");
const objectID = mongoose.Schema.Types.ObjectId;

const favoriteShows = new mongoose.Schema({
	user: {
		type: objectID,
		required: true,
		ref: "User",
	},

	shows: [
		{
			showId: {
				type: objectID,
				required: true,
				ref: "Show",
			},
			name: String,
			poster: String,
		},
	],
});

module.exports = mongoose.model("Favorites", favoriteSchema);
