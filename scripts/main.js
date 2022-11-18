import { global } from "./global.js";

// cambio de idioma
document.getElementById("select-lang").addEventListener("change", (ev) => {
  const lan = ev.target.value;
  console.log("Nuevo idioma:", lan);
  getPopularMovies(lan);
});

// llamada a la API para las peliculas
const getPopularMovies = (lan = "es-ES") => {
  fetch(
    `${global.baseUrl}/movie/popular?api_key=${global.apiKey}&language=${lan}&page=1`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("Datos listos");
      const movies = data.results;
      renderMovies(movies);
      console.log(data.results);
    })
    .catch((err) => console.log(err));
};

// renderizar las peliculas en el html
const renderMovies = (movies) => {
  const root = document.getElementById("movies");

  //root.innerHTML = movies.length;

  // limpiar el html
  root.innerHTML = "";

  for (const movie of movies) {
    root.innerHTML += `
    <div class="movie">
        <img src="${global.imageUrl}/w185/${movie.poster_path}" alt="" />
        <h3>${movie.title}</h3>
        <p>${movie.release_date}</p>
    </div>
    `;
  }
};

const userLang = navigator.language;
console.log("Idioma del navegador:", userLang);

console.log("Cargando datos...");
getPopularMovies();
