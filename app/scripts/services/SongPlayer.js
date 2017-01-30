(function() {
  function SongPlayer($rootScope, Fixtures) {

    /**
    * @desc SongPlayer object to hold and return relavent data for this service
    * @type {Object}
    */
    var SongPlayer = {};

    /**
    * @desc gets current album from Fixtures.js
    * @type {Object}
    */
    var currentAlbum = Fixtures.getAlbum();

    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song){
      if(currentBuzzObject){
        stopSong(song);
      }

      currentBuzzObject = new buzz.sound(song.audioUrl,{
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    };

    /**
    * @function playSong
    * @desc private function to play specified song
    * @param {Object} song
    */
    var playSong = function(song){
        currentBuzzObject.play();
        song.playing = true;
    };

    /**
    * @function stopSong
    * @desc private function to stop currently playing song
    * @param {Object} song
    */
    var stopSong = function(song){
        currentBuzzObject.stop();
        // song.playing = null;
        SongPlayer.currentSong.playing = null;
    };

    /**
    * @function getSongIndex
    * @desc gets the index of the given song
    * @param {Object} song
    */
    var getSongIndex = function(song) {
        return currentAlbum.songs.indexOf(song);
    };

    /**
    * @desc Object to hold currently playing song
    * @type {Object}
    */
    SongPlayer.currentSong = null;

    /**
    * @function SongPlayer.play
    * @desc method to play specified song
    * @param {Object} song
    */
    SongPlayer.play = function(song){
        song = song || SongPlayer.currentSong;
      if(SongPlayer.currentSong !==song){
        setSong(song);
        playSong(song);

      } else if (SongPlayer.currentSong === song){
        if (currentBuzzObject.isPaused()){
        currentBuzzObject.play();
        }
      }
    };

    /**
    * @function SongPlayer.pause
    * @desc method to pause specified song
    * @param {Object} song
    */
    SongPlayer.pause = function(song){
        song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
    * @function SongPlayer.previous
    * @desc method to skip back one song
    */
    SongPlayer.previous = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex--;

        if (currentSongIndex < 0) {
        song = song || SongPlayer.currentSong;
        stopSong(song);
        } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        }
    };

    /**
    * @function SongPlayer.next
    * @desc method to skip forward one song
    */
    SongPlayer.next = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex++;

        if (currentSongIndex >= currentAlbum.songs.length) {
        song = song || SongPlayer.currentSong;
        stopSong(song);
        } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        }
    };

    return SongPlayer;
  }

  angular
      .module('blocJams')
      .factory('SongPlayer', ['$rootScope','Fixtures', SongPlayer]);
})();
