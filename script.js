// document.getElementById("lyrics-show").innerHTML = '';
// document.getElementById("songs-list").innerHTML = '';


document.getElementById("search").addEventListener("click", function searchList(){
    const songTitle = document.getElementById("search-area").value;
    fetch(`https://api.lyrics.ovh/suggest/${songTitle}`)
.then(response => response.json())
.then(data => displaySongsList(data));
})

function displaySongsList(songs){
    const listOfSongs = document.getElementById("songs-list");
    let songsList = ``;
    for (let i = 0; i < songs.length; i++ ){
        songsList += `<div class="single-result row align-items-center my-3 p-3">
                        <div class="col-md-6">
                        <h3 class="lyrics-name">${songs[i].title} </h3>
                        <p class="author lead">Album by <span>${songs[i].artist.name}</span></p>
                        </div>
                        <div class="col-md-6 text-md-right text-center">
                                                                        
                        <a href="#lyrics"><button onClick="getLyrics(${songs[i].id})" class="btn btn-success">Get Lyrics</button></a>
                        </div>
                    </div>`;


                    }
    listOfSongs.innerHTML = songsList;
}
    
    


function showLyrics(id){
    for (let i = 0; i < 10; i++){
        if( songs[i].id == id){
            const artistName = songs[i].artist.name;
            const songTitle = songs[i].title;
            fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
            .then(response => response.json())
            .then(songs => {
                let lyrics = songs.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
            
                document.getElementById('lyrics').innerHTML = `<div class="single-lyrics text-center">
                                                                            
                                                            <h2 class="text-success mb-4">Song Lyrics</h2>
                                                            <h5>${lyrics}</h5>
                                                            </div>`
            })
        }
    }
}
    