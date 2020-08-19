document.getElementById('search').addEventListener('click', findSongs);

function findSongs(){
    document.getElementById('songs-list').innerHTML = '';
    document.getElementById('lyrics-show').innerHTML = '';
    const inputMusic = document.getElementById('search-area');
    const keyword = inputMusic.value;
    fetch(`https://api.lyrics.ovh/suggest/${keyword}`)
    .then(res => res.json())
    .then(data => {   
        songsList = data;
        for (let i = 0; i < songsList.data.length; i++) {
            const title = songsList.data[i].title;
            const artistName = songsList.data[i].artist.name;
            const id = songsList.data[i].id;
            document.getElementById('songs-list').innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                                                                    <div class="col-md-6">
                                                                        <h3 class="lyrics-name">${title}</h3>
                                                                        <p class="author lead">Album by <span>${artistName}</span></p>
                                                                    </div>
                                                                    <div class="col-md-6 text-md-right text-center">
                                                                        
                                                                        <a href="#lyrics"><button onClick="getLyrics(${id})" class="btn btn-success">Get Lyrics</button></a>
                                                                    </div>
                                                                </div>`
            if(i == 9){
                break;
            }   
        }
        
    })
}
function getLyrics(id){
    for (let i = 0; i < 10; i++) {
        if(songsList.data[i].id == id){
            const artistName = songsList.data[i].artist.name;
            const songTitle = songsList.data[i].title;
            fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
            .then(res => res.json())
            .then(data => {
                let lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
                document.getElementById('lyrics-show').innerHTML = `<div class="single-lyrics text-center">
                                                                        <h2 class="text-success mb-4">Song Lyrics</h2>
                                                                        <h5>${lyrics}</h5>
                                                                    </div>`
            })
    }
    } 
}