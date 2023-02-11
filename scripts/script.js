const previous = document.querySelector('#pre');
const play = document.querySelector('#play');
const next = document.querySelector('#pre');
const title = document.querySelector('#title');
const recent_volume = document.querySelector('#volume');
const volume_show = document.querySelector('#volume_show')
const slider = document.querySelector('#duration_slider');
const show_duration = document.querySelector('#show_duration');
const track_image = document.querySelector('#track_image');
const auto_play = document.querySelector('#auto');
const present = document.querySelector('#present');
const total = document.querySelector('#total');
const artist = document.querySelector('#artist');

let timer;
let autoplay = 0;
let index_no = 0;
let playing_song = false;

//Create an audio Element
let track = document.createElement('audio');

//All songs list
let All_song = [
    {
        name: "Bicicleta",
        path: "music/song1.mp3",
        img: "img/img1.jpg",
        singer: "Dillom"
    },
    {
        name: "Nomu",
        path: "music/song2.mp3",
        img: "img/img2.jpg",
        singer: "Good Kid"
    },
    {
        name: "We Got The Power",
        path: "music/song3.mp3",
        img: "img/img3.jpg",
        singer: "Gorillaz, Jehnny Beth, Claptone"
    },
    {
        name: "Electric Relaxation",
        path: "music/song4.mp3",
        img: "img/img4.jpg",
        singer: "A Tribe Called Quest"
    },
    {
        name: "I Could Have Lied",
        path: "music/song5.mp3",
        img: "img/img5.jpg",
        singer: "Red Hot Chille Peppers"
    }
];

// All Functions

//Load the track

function load_track(index_no){
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;	
	track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();

	timer = setInterval(range_slider ,1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}

load_track(index_no);

//Mute Sound
function mute_sound(){
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
}


//Reset song slider
function reset_slider(){
    slider.value = 0;
}

//Chack the song is playing

function justplay(){
    if(playing_song == false){
        playSong();
    } else {
        pauseSong();
    }
}

//Play 

function playSong(){
    track.play();
    playing_song = true;
    play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
  }

//Pause

function pauseSong(){
	track.pause();
	playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

//Next

function next_song(){
    if (index_no < All_song.length -1) {
        index_no += 1;
        load_track(index_no);
        playSong();
    } else {
        index_no = 0;
        load_track(index_no);
        playSong();
    }
}

//Previous

function previous_song(){
    if (index_no > 0){
        index_no -= 1;
        load_track(index_no);
        playSong();
    } else {
        index_no = All_song.length;
        load_track(index_no);
        playSong();
    }
}

//Change Volume

function volume_change(){
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}

// Autoplay
function autoplay_switch(){
    if (autoplay == 1) {
        autoplay = 0;
        auto_play.style.background = "rgba(255,255,255,0.2)";
    } else {
        autoplay = 1;
        auto_play.style.background = "#FF8A65";
    }
}

//Change slider position

function change_duration(){
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

function range_slider(){
    let position = 0;

    //Update slide position
    if(!isNaN(track.duration)){
        position = track.currentTime * (100 / track.duration)
        slider.value = position;
    }

    //Function will run when the song is over
    if (track.ended){
        play.innerHTML = '<i class="fa fa-play"></i>'
        if (autoplay == 1){
            index_no += 1;
            load_track(index_no);
            playSong();
        }
    }
}

