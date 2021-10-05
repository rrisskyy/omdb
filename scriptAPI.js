// ============================================================================================================
// Menggunakan Jquery
// ============================================================================================================
// $('.search-button').on('click', function() {
//     $.ajax({
//     url: 'http://www.omdbapi.com/?apikey=ff9f2726&s=' + $('.input-keyword').val(),
//     success: results => {
//         const movies = results.Search;
//         let cards = '';
//         movies.forEach((m) => {
//             cards += showCards(m);
//         })
//         // document.querySelector('.movie-container').innerHTML = cards;
//         $('.movie-container').html(cards);

//         // ketika tombol detail di klik
//         $('.modal-detail-button').on('click', function() {
//             $.ajax({
//                 url: 'http://www.omdbapi.com/?apikey=ff9f2726&i=' + $(this).data('imdbid'),
//                 success: (m) => {
//                     moviesDetail = showMovieDetails(m);
//                 // document.querySelector('.modal-body').innerHTML = moviesDetail;
//                 $('.modal-body').html(moviesDetail);
//                 error: (e) => {
//                     console.log(e.responseText);
//                 }   
//                 }
//             })
//         });
//     },
//     error: (e) => {
//         console.log(e.responseText);
//     }
// });
// })
// ============================================================================================================
// Selesai
// ============================================================================================================





// ============================================================================================================
// Menggunakan Fetch
// ============================================================================================================
// const searchButton = document.querySelector('.search-button');
// searchButton.addEventListener('click', function() {
//     const inputKeyword = document.querySelector('.input-keyword');
//     fetch(`http://www.omdbapi.com/?apikey=ff9f2726&s=${inputKeyword.value}`)
//      .then((response) => response.json())
//      .then((response) => {
//         const movies = response.Search;
//         let cards = '';
//         movies.forEach((m) => cards += showCards(m));
//         const movieContainer = document.querySelector('.movie-container').innerHTML = cards;
        
//         // Kalau tombol diklik
//         const modalDetailButton = document.querySelectorAll('.modal-detail-button');
//         modalDetailButton.forEach((e) => {
//             e.addEventListener('click', function(){
//             const imdbid = this.dataset.imdbid;
            // fetch(`http://www.omdbapi.com/?apikey=ff9f2726&i=${imdbid}`)
            //  .then((response) => response.json())
            //  .then((m) => {
                // moviesDetail = showMovieDetails(m);
                // const modalBody = document.querySelector('.modal-body').innerHTML = moviesDetail;
            //  });

//         })
        
// });
//      });
// });
// ============================================================================================================
// Selesai
// ============================================================================================================





// ============================================================================================================
// Menggunakan Fetch, async dan await
// ============================================================================================================
const searchButton = document.querySelector('.search-button');  // action ketika tombol search di klik
searchButton.addEventListener('click', async function(){
    try{
        const inputKeyword = document.querySelector('.input-keyword'); // ambil value dari input pd pencarian 
        const movies = await getMovies(inputKeyword.value);
        updateUI(movies);
    } catch(err) {
        alert(err);
    }
    
});

function getMovies(keyword){
    return fetch(`http://www.omdbapi.com/?apikey=ff9f2726&s=${keyword}`)
    .then((response) => {
        if ( !response.ok){
            throw new Error(response.statusText)
        }
        return response.json()
        })  
    .then((response) => {
        console.log(response.Error)
        if (response.Response === "False") {
            throw new Error(response.Error);
        }
        return response.Search;
    });
};

function updateUI(movies) {
    let cards = '';
    movies.forEach((m) => cards += showCards(m));
    const movieContainer = document.querySelector('.movie-container').innerHTML = cards;
};



// event binding
document.addEventListener('click', async function(e){  //action ketika tombol deatil di klik
    if ( e.target.classList.contains('modal-detail-button')){
        const imdbid = e.target.dataset.imdbid;
        const movieDetails = await getMovieDetails(imdbid);
        updateUIDetails(movieDetails);
    }
});


function getMovieDetails(imdbid){
    return fetch(`http://www.omdbapi.com/?apikey=ff9f2726&i=${imdbid}`)
    .then((response) => response.json())
    .then((m) => m)
}

function updateUIDetails(m){
    moviesDetail = showMovieDetails(m); 
    const modalBody = document.querySelector('.modal-body').innerHTML = moviesDetail;
}
// ============================================================================================================
// Selesai
// ============================================================================================================












function showCards(m){
    return `<div class="col-md-4 my-5">
                <div class="card"">
                    <img src="${m.Poster}" class="card-img-top"">
                    <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid=${m.imdbID}>Show details</a>
                </div>
            </div>
            </div>`
}
function showMovieDetails(m){
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                            <li class="list-group-item"><strong>Director: </strong>${m.Director}</li>
                            <li class="list-group-item"><strong>Actors: </strong>${m.Actors}</li>
                            <li class="list-group-item"><strong>Writer: </strong>${m.Writer}</li>
                            <li class="list-group-item"><strong>Plot </strong> <br>${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`
}