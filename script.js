console.log("let's write something");
let currentSong = new Audio();

async function getSongs() {
    //Fetching songs from the files 
    let a = await fetch("https://github.com/NNobittaa/Spotify_Clone---HTML-CSS-JS/tree/main/songs/")
    let response = await a.text()
    // console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith("mp3")){
            songs.push(element.href.split("/songs/")[1])
        }
    }
    // console.log(as);
    // console.log(songs)
    return songs
}

const playMusic = (track)=>{
    // let audio = new Audio("/songs/"+track)
    currentSong.src = "/songs/"+track;
    currentSong.play();
}

async function main() {

    


    // Get songs 
    let songs = await getSongs()
    // console.log(songs)

    // Show all the songs int the playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML+`<li>
                
                  <img class="invert" src="logo_svg/music-svgrepo-com.svg" alt="">
                  <div class="currentSongInfo">
                    <div class="currentSongInfo-name">
                      ${song.replaceAll("%20"," ")}
                    </div>
                    <div class="currentSongInfo-artist">
                      Rajat
                    </div>
                </div>
                
                <div class="playNow flex">
                  <span>Play Now</span>
                  <img src="logo_svg/play-button-svgrepo-com.svg" alt="">
                </div></li>`;
    }

    // Attach an event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", element=>{
            console.log(e.querySelector(".currentSongInfo").firstElementChild.innerHTML)
            playMusic(e.querySelector(".currentSongInfo").firstElementChild.innerHTML.trim())
        })
    })

}
main()
