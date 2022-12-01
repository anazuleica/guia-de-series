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

//Login Form
const form = document.getElementById("login-form");
form.addEventListener("submit", loginUser);

async function loginUser(event) {
	event.preventDefault();
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	const result = await fetch("/auth/login", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			username,
			password,
		}),
	}).then((res) => res.json());

	if (result.status === "ok") {
		alert("Sucesso");
	} else {
		alert(result.error);
	}
}
