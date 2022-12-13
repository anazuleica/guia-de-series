const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const schema = mongoose.Schema;

const showSchema = new mongoose.Schema({
	userFrom: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],

	id: {
		type: String,
	},

	name: {
		type: String,
	},

	poster: {
		type: String,
	},
});

module.exports = mongoose.model("Show", showSchema);
