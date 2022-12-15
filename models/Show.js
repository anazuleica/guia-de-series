const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectId;

const showSchema = new mongoose.Schema({
	owner: {
		type: ObjectID,
		required: true,
		ref: "User",
	},

	id: {
		type: String,
	},

	name: {
		type: String,
	},
});

module.exports = mongoose.model("Show", showSchema);
