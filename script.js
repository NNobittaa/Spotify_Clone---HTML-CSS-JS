console.log("let's write something");
let currentSong = new Audio();

async function getSongs() {
  //Fetching songs from the files
  let a = await fetch("http://192.168.56.1:3000/songs/");
  let response = await a.text();

  // console.log(response)
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith("mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  // console.log(as);
  // console.log(songs)
  return songs;
}

const playMusic = (track, pause=false) => {
  // let audio = new Audio("/songs/"+track)
  currentSong.src = "/songs/" + track;
  if (!pause) {
    currentSong.play();
    play.src = "logo_svg/pause-filled-svgrepo-com.svg";
  }

  currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${formatSecondsToMinutes(currentSong.currentTime)}/${formatSecondsToMinutes(currentSong.duration)}` 
        document.querySelector(".circle").style.left = (
          (currentSong.currentTime/currentSong.duration)*100+"%"
        );
      });

  // currentSong.play();
  document.querySelector(".songinfo").innerHTML = decodeURI(track);
  document.querySelector(".songtime").innerHTML = "00:00/00:00";
};

/**
 * Converts a number of seconds into a formatted string in the "MM:SS" format.
 * * @param {number} totalSeconds The total number of seconds to convert.
 * @returns {string} The formatted time string in "MM:SS" format.
 */
const formatSecondsToMinutes = (totalSeconds) => {
  // Ensure the input is a non-negative number
  if (totalSeconds < 0 || typeof totalSeconds !== 'number') {
    return '00:00';
  }

  // Calculate minutes and remaining seconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = parseInt(totalSeconds % 60)

  // Use padStart() to ensure both minutes and seconds have two digits
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};


async function main() {
  // Get songs
  let songs = await getSongs();
  playMusic(songs[0], true)
  // console.log(songs)

  // Show all the songs int the playlist
  let songUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li>
                <div class="flex">
                  <img class="invert" src="logo_svg/music-svgrepo-com (1).svg" alt="">
                  <div class="currentSongInfo">
                    <div class="currentSongInfo-name">
                      ${song.replaceAll("%20", " ")}
                    </div>
                    <div class="currentSongInfo-artist">
                      Rajat
                    </div>
                  </div>
                </div>
                
                <div class="playNow flex">
                  <span>Play Now</span>
                  <img src="logo_svg/play-button-svgrepo-com.svg" alt="">
                </div>
            </li>`;
  }

  // Attach an event listener to each song
  Array.from(
    document.querySelector(".songList").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      console.log(
        e.querySelector(".currentSongInfo").firstElementChild.innerHTML
      );
      playMusic(
        e.querySelector(".currentSongInfo").firstElementChild.innerHTML.trim()
      );
      //  Listen for time update event
      currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration);
      });
      currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${formatSecondsToMinutes(currentSong.currentTime)}/${formatSecondsToMinutes(currentSong.duration)}`
        document.querySelector(".circle").style.left = (
          (currentSong.currentTime/currentSong.duration)*100+"%"
        );
      });
    });
  });

  // Attach an event listener to play buttons
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "logo_svg/pause-filled-svgrepo-com.svg";
      
    } else {
      currentSong.pause();
      play.src = "logo_svg/play-svgrepo-com.svg";

      //  Listen for time update event
      
    }
  });

  // Add an event listener to seekbar 
  document.querySelector(".seekBar").addEventListener("click", e=>{
    let percentage =(e.offsetX/e.target.getBoundingClientRect().width)*100
    console.log((e.offsetX/e.target.getBoundingClientRect().width)*100);
    document.querySelector(".circle").style.left = (e.offsetX/e.target.getBoundingClientRect().width)*100 + "%"
    currentSong.currentTime = ((currentSong.duration)*percentage)/100
  })
}
main();


// Responsiveness