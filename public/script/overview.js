//TMDB BASE
const api_key = "29ef6fb2bf9ae84db4c666371338b57c";
const base_url = "https://api.themoviedb.org/3/tv";
const language_url = "?language=pt-BR&";
const seasons_url = "/season/";
const img_url_original = "https://image.tmdb.org/t/p/original";
const img_url_300 = "https://image.tmdb.org/t/p/w300/";

//FETCHING TV SHOW DETAILS
const tvShow_id = location.pathname;

fetch(
	`${base_url}${tvShow_id}${language_url}` +
		new URLSearchParams({
			api_key: api_key,
			language: "pt-BR",
		})
)
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		setupCard(data);
	});

//ADD INFO TO HTML POSTER
const setupCard = (data) => {
	const posterContainer = document.querySelector(".poster-card");
	const posterTitle = document.querySelector(".poster-title");
	const summary = document.querySelector(".summary");
	const genres = document.querySelector(".genres");
	const seasons = document.querySelector(".seasons");

	if (data.backdrop_path == null) {
		data.backdrop_path = data.poster_path;
	}

	posterContainer.innerHTML = `
    <img class="poster" src="${img_url_original + data.backdrop_path}" alt="" />

    `;

	posterTitle.innerHTML = `	
	<div class="poster-title">
	<h1>${data.name}</h1>
	<h3>${data.first_air_date.split("-")[0]}</h3>
	</div>
	`;

	summary.innerHTML = `
	<h1>Sinopse</h1>
	<p>${data.overview}</p>
	`;

	for (let i = 0; i < data.genres.length; i++) {
		genres.innerHTML += `<p> ${data.genres[i].name} </p>`;
	}

	for (let i = 0; i < data.seasons.length; i++) {
		seasons.innerHTML += `
		<a href="${data.id}/season/${data.seasons[i].season_number}">${data.seasons[i].name}</a>`;
	}
};

//FETCHING TV SHOW CAST
fetch(
	`${base_url}${tvShow_id}/credits${language_url}` +
		new URLSearchParams({
			api_key: api_key,
		})
)
	.then((res) => res.json())
	.then((data) => {
		const cast = document.querySelector(".elenco-itens");

		for (let i = 0; i < 10; i++) {
			if (data.cast[i].profile_path == null) {
				i++;
			}

			cast.innerHTML += `
			<div class="ator">
			<img src="${img_url_300 + data.cast[i].profile_path}" alt="" />
			<p> ${data.cast[i].name} </p>
			</div>
			`;
		}
	});

//FETCHING RECOMMENDATIONS
fetch(
	`${base_url}${tvShow_id}/recommendations${language_url}` +
		new URLSearchParams({
			api_key: api_key,
		})
)
	.then((res) => res.json())
	.then((data) => {
		const recommendations = document.querySelector(".recommend-itens");

		for (let i = 0; i < 8; i++) {
			if (data.results[i].backdrop_path == null) {
				i++;
			}
			recommendations.innerHTML += `
			<div class="movie-recommendation">
			<a href="${data.results[i].id}"> <img src="${
				img_url_300 + data.results[i].backdrop_path
			}" alt="" /> </a>
			<p> ${data.results[i].name} </p>
			</div>

			`;
		}
	});
