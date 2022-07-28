//TMDB

const api_key = "api_key=29ef6fb2bf9ae84db4c666371338b57c";
const base_url = "https://api.themoviedb.org/3";
const trending_en = base_url + "/trending/tv/day?language=pt-BR&" + api_key;

const img_url_w300 = "https://image.tmdb.org/t/p/w300/";
const search_url = base_url + "/search/tv?language=pt-BR&" + api_key;

const container = document.getElementById("tvShow-container");
const form = document.getElementById("form");
const search = document.getElementById("search");

getTv(trending_en);

function getTv(url) {
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			console.log(data.results);
			showTv(data.results.slice(0, 12));
		});
}

function showTv(data) {
	container.innerHTML = "";

	data.forEach((tvShow) => {
		const { id, name, poster_path, vote_average, overview } = tvShow;
		const tvShowEl = document.createElement("div");
		tvShowEl.innerHTML = `
		<div class="tvShow" onclick="location.href = '/${id}'">
        <a href="${id}"> <img src="${
			img_url_w300 + poster_path
		}" alt="${name}"></a>
        <div class="tvShow-info">
            <h3>${name}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span></div>
        <div class="tvShow-overview">
            <h3>Overview</h3>
            <p>${overview.substring(0, 200) + "..."}</p></div>
        </div>
		</div>

        `;

		container.appendChild(tvShowEl);
	});
}

function getColor(vote) {
	if (vote >= 8) {
		return "green";
	} else if (vote >= 5) {
		return "orange";
	} else {
		return "red";
	}
}

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const searchTerm = search.value;

	if (searchTerm) {
		getTv(search_url + "&query=" + searchTerm);
	}
});
