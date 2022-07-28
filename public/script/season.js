//TMDB BASE
const api_key = "29ef6fb2bf9ae84db4c666371338b57c";
const base_url = "https://api.themoviedb.org/3/tv";
const img_url_original = "https://image.tmdb.org/t/p/original";
const img_url_300 = "https://image.tmdb.org/t/p/w300";

//FETCHING TV SHOW DETAILS
const tvShow_id = location.pathname.split("/")[1];
const tvShow_season = location.pathname;

fetch(
	`${base_url}/${tvShow_id}?` +
		new URLSearchParams({
			api_key: api_key,
			language: "pt-BR",
		})
)
	.then((res) => res.json())
	.then((data) => {
		setupCard(data);
	});

fetch(
	`${base_url}${tvShow_season}?` +
		new URLSearchParams({
			api_key: api_key,
			language: "pt-BR",
		})
)
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		setupSeason(data);
		setupEpisodes(data);
	});

//ADD INFO TO HTML POSTER
const setupCard = (data) => {
	const posterTitle = document.querySelector(".poster-title");
	const seasons = document.querySelector(".seasons");

	posterTitle.innerHTML = `	
	<div class="poster-title">
	<a href="/${tvShow_id}"> <h1>${data.name}</h1> </a>
	<h3>${data.first_air_date.split("-")[0]}</h3>
	</div>
	`;

	for (let i = 0; i < data.seasons.length; i++) {
		seasons.innerHTML += `
		<a href="${data.seasons[i].season_number}">${data.seasons[i].name}</a>`;
	}
};

//FETCHING SEASON DETAILS AND AND TO HTML
const setupSeason = (data) => {
	const posterContainer = document.querySelector(".poster-card");
	const summary = document.querySelector(".summary");

	if (data.backdrop_path == null) {
		data.backdrop_path = data.poster_path;
	}

	posterContainer.innerHTML = `
    <img class="poster" src="${img_url_original + data.backdrop_path}" alt="" />

    `;

	summary.innerHTML = `
	<h1>${data.name} <span>(${data.air_date.split("-")[0]})</span></h1>
	<p>${data.overview}</p>
	`;
};

//ADD EPISODES TO HTML
const setupEpisodes = (data) => {
	const episodes = document.querySelector(".episodes-itens");
	const progress = document.querySelector(".progress-bar");

	for (let i = 0; i < data.episodes.length; i++) {
		episodes.innerHTML += `
        <div class="episode">
        <a href="${tvShow_season}/episode/${data.episodes[i].episode_number}"> <h3>${data.episodes[i].episode_number}. ${data.episodes[i].name}</h3></a>
        <button id="myButton"><i class="fa-solid fa-circle-check"></i></button>
        </div>
        `;
	}

	const checkboxes = document.querySelectorAll(".fa-circle-check");
	var watchedEpisodes = 0;

	for (const box of checkboxes) {
		box.addEventListener("click", () => {
			box.classList.add("watched");
		});
	}

	progress.innerHTML = `
    <div class="total-bar">
        <div class="watched-bar"></div>
    </div>
    <p>0/${data.episodes.length}</p>
    
    `;
};
