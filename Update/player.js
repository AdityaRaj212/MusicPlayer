let songs = [
    {id:0 ,title:'After Life' ,artist:'Avenged Sevenfold' ,genre:'Heavy Metal' ,image:'Files/afterLife.jpeg', source: 'Files/Afterlife - Avenged Sevenfold.mp3' },
    {id:1 ,title:'Shepherd of Fire' ,artist:'Avenged Sevenfold' ,genre:'Heavy Metal' ,image:'Files/ShepherdOfFire.jpg', source: 'Files/Shepherd of Fire - Avenged Sevenfold.mp3'},
    {id:2 ,title:'So Far Away' ,artist:'Avenged Sevenfold' ,genre:'Rock' ,image:'Files/soFarAway.jpeg', source: 'Files/So Far Away - Avenged Sevenfold.mp3' },    
];

let playlists = [];

function renderCurrentSong(id){
    const songImg = document.getElementById('songImg');
    const songName = document.getElementById('songName');
    const artistName = document.getElementById('artistName');
    const player = document.getElementById('player');

    songImg.innerHTML = '';
    songName.innerHTML = '';
    artistName.innerHTML = '';

    player.src = songs[id].source;

    const image = document.createElement('img');
    image.src = songs[id].image;
    // image.style.objectFit = 'contain';
    image.style.width = '100%';
    songImg.append(image);

    const sName = document.createElement('p');
    sName.textContent = songs[id].title;
    sName.style.fontWeight = 'bold';
    sName.style.fontSize = '25px';
    songName.append(sName);

    const aName = document.createElement('p');
    aName.textContent = songs[id].artist;
    aName.style.fontSize = '20px';
    artistName.append(aName);
}



const nextBtn = document.getElementById('nextSong');
nextBtn.addEventListener('click',()=>{
    playNextSong(currSong);
});

const prevBtn = document.getElementById('prevSong');
prevBtn.addEventListener('click',()=>{
    playPrevSong(currSong);
});

function playNextSong(id){
    id = (id+1) % songs.length;
    currSong = id;
    const songImg = document.getElementById('songImg');
    const songName = document.getElementById('songName');
    const artistName = document.getElementById('artistName');
    const player = document.getElementById('player');
    songImg.textContent = '';
    songName.textContent = '';
    artistName.textContent = '';
    // player
    renderCurrentSong(currSong);
}

function playPrevSong(id){
    id = id - 1;
    if(id<0){
        id = songs.length-1;
    }
    currSong = id;
    const songImg = document.getElementById('songImg');
    const songName = document.getElementById('songName');
    const artistName = document.getElementById('artistName');
    const player = document.getElementById('player');
    songImg.textContent = '';
    songName.textContent = '';
    artistName.textContent = '';
    // player
    renderCurrentSong(currSong);
}

function updateOptions(){
    const selectedSong = document.getElementById('genre');
    selectedSong.innerHTML = '';
    const allOption = document.createElement('option');
    allOption.textContent = 'All';
    selectedSong.append(allOption);
    const avlGenre = [];
    songs.forEach((obj)=>{
        if(!avlGenre.includes(obj.genre)){
            avlGenre.push(obj.genre);
            const option = document.createElement('option');
            option.textContent = obj.genre;
            selectedSong.append(option);
        }
    });
    selectedSong.addEventListener('change',updateSongs);
}

function updateSongs(){
    const songContainer = document.getElementById('songs');
    songContainer.innerHTML = '';
    const genre = document.getElementById('genre');
    songs.forEach((obj)=>{
        const currGenre = genre.value;
        const song = document.createElement('button');
        song.classList.add('buttons');
        song.id = obj.id;
        song.addEventListener('click',()=>{
            currSong = obj.id;
            renderCurrentSong(obj.id);
        });
        if(currGenre === 'All'){
            song.textContent = obj.title;           
            songContainer.append(song);
        }
        else if(currGenre===obj.genre){
            song.textContent = obj.title;
            songContainer.append(song);
        }
    });
}

let currPlaylistId;

function createPlaylist(){
    const dynamicSongBtn = document.createElement('div');
    dynamicSongBtn.classList.add('dynamicSongBtn');
    dynamicSongBtn.classList.add('buttons');

    const playlistSearch = document.getElementById('playlistSearch');
    const playlistEl = document.getElementById('playlistName');
    const playlistObj = {id: playlists.length, playlistName: '', playlistSongs: []};
    playlistObj.playlistName = playlistEl.value;
    playlistEl.value = '';

    const allPlaylists = document.getElementById('allPlaylists');
    const playlistBtn = document.createElement('button');
    playlistBtn.textContent = playlistObj.playlistName;
    if(playlists.length===0){
        playlistBtn.id = 0;
    }
    else{
        playlistBtn.id = playlists[playlists.length-1].id+1; //id of a playlist should be equal to prev song id + 1
    }
    playlistBtn.classList.add('buttons');
    playlistBtn.addEventListener('click',()=>{
        const currPlaylistName = document.querySelector('#playlist .heading');
        currPlaylistName.textContent = '';
        currPlaylistName.textContent = `Current Playlist - ${playlistObj.playlistName}`;
        if(playlists.length===0){
            currPlaylistId = 0;
        }
        else{
            currPlaylistId = playlists[playlists.length-1].id+1; //id of a playlist should be equal to prev song id + 1
        }
        updateCurrentPlaylist();
    });
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('removeBtn');
    removeBtn.classList.add('buttons');
    removeBtn.textContent = '❌';
    removeBtn.addEventListener('click',()=>{
        deletePlaylist(playlistEl.value);
    });

    if(playlistObj.playlistName!=''){
        dynamicSongBtn.append(playlistBtn,removeBtn);
        allPlaylists.append(dynamicSongBtn);
        playlists.push(playlistObj);
    }   
}

function updateCurrentPlaylist(){
    const currPlaylist = document.getElementById('currPlaylist');
    currPlaylist.innerHTML = '';
    console.log(playlists);
    if(currPlaylistId!=-1){
        playlists[currPlaylistId].playlistSongs.forEach((song)=>{
            const btn = document.createElement('button');
            btn.textContent = song.title;
            btn.id = song.id;
            btn.classList.add('buttons');
            btn.addEventListener('click',()=>{
                currSong = song.id;
                renderCurrentSong(currSong);
            })
            currPlaylist.append(btn);
        });    
    }   
}

function addSongToPlaylist(){
    const currPlaylist = playlists[currPlaylistId];

    const currPlaylistName = document.querySelector('#playlist .heading');
    currPlaylistName.textContent = '';
    currPlaylistName.textContent = `Current Playlist - ${currPlaylist.playlistName}`;

    if(!currPlaylist.playlistSongs.includes(songs[currSong])){
        currPlaylist.playlistSongs.push(songs[currSong]);
    }
    else{
        const ind = currPlaylist.playlistSongs.indexOf(songs[currSong]);
        currPlaylist.playlistSongs.splice(ind,1);
        const addBtn = document.getElementById('addPlay');
    }   
    updateCurrentPlaylist();
}

function toggleTheme(){
    const element = document.body;
    element.classList.toggle('darkTheme');
}

function searchSong(){
    let input = document.getElementById('songNameSearch').value;
    input = input.toLowerCase();

    const songContainer = document.getElementById('songs');
    songContainer.innerHTML = '';

    const currGenre = document.getElementById('genre').value;

    const filteredSongs = songs.filter((song)=>{
        if(currGenre==='All' || currGenre === song.genre){
            return true;
        }
        else{
            return false;
        }
    });

    for(let i=0;i<filteredSongs.length;i++){
        if(filteredSongs[i].title.toLowerCase().includes(input)){
            const song = document.createElement('button');
            song.classList.add('buttons');
            song.addEventListener('click',()=>{
                currSong = filteredSongs[i].id;
                renderCurrentSong(filteredSongs[i].id);
            });
            song.textContent = filteredSongs[i].title;
            songContainer.append(song);
            
        }
    }
}

function updatePlaylists(){
    const allPlaylists = document.getElementById('allPlaylists');
    allPlaylists.innerHTML = '';
    playlists.forEach((playlist)=>{
        const dynamicSongBtn = document.createElement('div');
        dynamicSongBtn.classList.add('dynamicSongBtn');

        const playlistBtn = document.createElement('button');
        playlistBtn.textContent = playlist.playlistName;
        playlistBtn.classList.add('buttons');
        playlistBtn.id = playlist.id;
        playlistBtn.addEventListener('click',()=>{
            currPlaylistId = playlistBtn.id;
            updateCurrentPlaylist();
        });

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('removeBtn');
        removeBtn.textContent = '❌';
        removeBtn.addEventListener('click',()=>{
            deletePlaylist(playlist.playlistName);
        });

        dynamicSongBtn.append(playlistBtn,removeBtn);
        allPlaylists.append(dynamicSongBtn);
    });
}

function searchPlaylist(){
    let input = document.getElementById('playlistNameSearch').value;
    input = input.toLowerCase();

    const allPlaylists = document.getElementById('allPlaylists');
    allPlaylists.innerHTML = '';


    
    for(let i=0;i<playlists.length;i++){
        if(playlists[i].playlistName.toLowerCase().includes(input)){
            const dynamicSongBtn = document.createElement('div');
            dynamicSongBtn.classList.add('dynamicSongBtn');

            const playlistBtn = document.createElement('button');
            playlistBtn.textContent = playlists[i].playlistName;
            playlistBtn.classList.add('buttons');
            playlistBtn.id = playlists[i].id;
            playlistBtn.addEventListener('click',()=>{
                currPlaylistId = playlistBtn.id;
                updateCurrentPlaylist();
            });

            const removeBtn = document.createElement('button');
            removeBtn.classList.add('removeBtn');
            removeBtn.textContent = '❌';
            removeBtn.addEventListener('click',()=>{
                deletePlaylist(playlists[i].playlistName);
            });

            dynamicSongBtn.append(playlistBtn,removeBtn);
            allPlaylists.append(dynamicSongBtn);
        }
    }
}

function deletePlaylist(playlistName){
    let ind;
    for(let i=0;i<playlists.length;i++){
        if(playlists[i].playlistName===playlistName){
            ind = i;
            break;
        }
    }
    playlists.splice(ind,1);
    if(playlists.length===0){
        currPlaylistId = -1;
    }
    else if(currPlaylistId === ind){
        currPlaylistId = playlists[0].id;
    }
    console.log(currPlaylistId);
    updateCurrentPlaylist();
    updatePlaylists();
}

const addToPlaylist = document.getElementById('addPlay');
addToPlaylist.addEventListener('click',addSongToPlaylist);

const save = document.getElementById('save');
save.addEventListener('click',createPlaylist);

// changeTheme();

// add song functionality to playlist songs 

const themeBtn = document.querySelector('.switch-input');
themeBtn.addEventListener('change',toggleTheme);

let currSong = 0;
renderCurrentSong(currSong);
updateOptions();
updateSongs();

// Add these functions at the end of your existing JS

// Function to clear the song search
function clearSearch() {
    document.getElementById('songNameSearch').value = '';
    searchSong();
}

// Function to clear the playlist search
function clearPlaylistSearch() {
    document.getElementById('playlistNameSearch').value = '';
    searchPlaylist();
}