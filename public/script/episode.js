//TMDB BASE
const api_key = "29ef6fb2bf9ae84db4c666371338b57c";
const base_url = "https://api.themoviedb.org/3/tv";
const language_url = "?language=pt-BR&";
const img_url_original = "https://image.tmdb.org/t/p/original";
const img_url_300 = "https://image.tmdb.org/t/p/w300";

//FETCHING TV SHOW DETAILS
const tvShow_id = "/" + location.pathname.split("/")[1];
const tvShow_episode = location.pathname;

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
		console.log(tvShow_id);
	});

fetch(
	`${base_url}${tvShow_episode}?` +
		new URLSearchParams({
			api_key: api_key,
			language: "pt-BR",
		})
)
	.then((res) => res.json())
	.then((data) => {
		setupEpisode(data);
		console.log(data);
	});

//ADD INFO TO HTML POSTER
const setupCard = (data) => {
	const posterTitle = document.querySelector(".poster-title");

	posterTitle.innerHTML = `	
	<div class="poster-title">
	<a href="/${tvShow_id}"> <h1>${data.name}</h1> </a>
	<h3>${data.first_air_date.split("-")[0]}</h3>
	</div>
	`;
};

//FETCHING EPISODE DETAILS AND AND TO HTML
const setupEpisode = (data) => {
	const posterContainer = document.querySelector(".poster-card");
	const summary = document.querySelector(".summary");

	posterContainer.innerHTML = `
    <img class="poster" src="${img_url_original + data.still_path}" alt="" />

    `;

	summary.innerHTML = `
	<h1>${data.name}</h1>
	<p>${data.overview}</p>
	`;
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
