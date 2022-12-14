//TMDB BASE
const api_key = "api_key=29ef6fb2bf9ae84db4c666371338b57c";
const base_url = "https://api.themoviedb.org/3";
const img_url = "https://image.tmdb.org/t/p/w300/";

//TMDB URL
const trending_en = base_url + "/trending/tv/day?" + api_key;

const container = document.getElementById("tv-container");
getTv(trending_en);

function getTv(url) {
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			showTv(data.results.slice(0, 15));
		});
}

function showTv(data) {
	container.innerHTML = "";

	data.forEach((tvShow) => {
		const { name, poster_path } = tvShow;
		const tvShowEl = document.createElement("div");
		tvShowEl.classList.add("tvShow");
		tvShowEl.innerHTML = `
        <img src="${img_url + poster_path}" alt="${name}"></div>
    

        `;
		container.appendChild(tvShowEl);
	});
}

// Form Login

const form = document.querySelector("form");
const usernameError = document.querySelector(".username.error");
const passwordError = document.querySelector(".password.error");

form.addEventListener("submit", async (e) => {
	e.preventDefault();

	// Reseta Erros
	usernameError.textContent = "";
	passwordError.textContent = "";

	// Captura Valores
	const username = form.username.value;
	const password = form.password.value;
	try {
		const res = await fetch("/login", {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: { "Content-Type": "application/json" },
		});
		const data = await res.json();
		console.log(data);

		if (data.errors) {
			usernameError.textContent = data.errors.username;
			passwordError.textContent = data.errors.password;
		}

		if (data.user) {
			location.assign("/");
		}
	} catch (err) {
		console.log(err);
	}
});
