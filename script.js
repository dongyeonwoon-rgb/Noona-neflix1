const apiKey = "c1e38213bd386b745e7f07351934b695";
const baseUrl = "https://api.themoviedb.org/3";
const nowPlayingUrl = `${baseUrl}/movie/now_playing?api_key=${apiKey}&language=ko-KR&page=1`;
const moviesContainer = document.getElementById("movies");

async function fetchNowPlaying() {
    try {
        const response = await fetch(nowPlayingUrl);
        if (!response.ok) {
            throw new Error("네트워크 응답에 문제가 있습니다.");
        }
        const data = await response.json();
        displayMovies(data.results);
    } catch (err) {
        console.error(err);
        moviesContainer.innerHTML = "<p>영화를 불러오는 중 문제가 발생했습니다.</p>";
    }
}

function displayMovies(movies) {
    moviesContainer.innerHTML = "";
    movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");
        const img = document.createElement("img");
        if (movie.poster_path) {
            img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            img.alt = movie.title;
        } else {
            img.alt = "포스터 없음";
        }
        const title = document.createElement("div");
        title.classList.add("movie-title");
        title.textContent = movie.title;

        card.appendChild(img);
        card.appendChild(title);
        moviesContainer.appendChild(card);
    });
}

fetchNowPlaying();