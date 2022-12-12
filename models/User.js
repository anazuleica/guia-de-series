const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Nome de usuário é obrigatório"],
		unique: true,
		lowercase: true,
		minLength: [5, "Usuário deve ter pelo menos 5 caracteres"],
	},
	password: {
		type: String,
		required: [true, "Senha é obrigatória"],
		minLength: [5, "Senha deve ter pelo menos 5 caracteres"],
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

// Função antes do usuário ser adicionado ao DB
userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// Método para logar usuário
userSchema.statics.login = async function (username, password) {
	const user = await this.findOne({ username });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);

		if (auth) {
			return user;
		}
		throw Error("Senha incorreta");
	}
	throw Error("Usuário incorreto");
};

module.exports = mongoose.model("User", userSchema);
