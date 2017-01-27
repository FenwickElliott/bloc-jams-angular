(function() {
  function SongPlayer() {

    /**
    * @desc SongPlayer object to hold and return relavent data for this service
    * @type {Object}
    */
    var SongPlayer = {};

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
        currentBuzzObject.stop();
        SongPlayer.currentSong.Playing = null;
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
    * @desc Object to hold currently playing song
    * @type {Object}
    */
    SongPlayer.currentSong = null;

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

    SongPlayer.pause = function(song){
        song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    return SongPlayer;
  }

  angular
      .module('blocJams')
      .factory('SongPlayer', SongPlayer);
})();
