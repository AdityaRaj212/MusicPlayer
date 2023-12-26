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
