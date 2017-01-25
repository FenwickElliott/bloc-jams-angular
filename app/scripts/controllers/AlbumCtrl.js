(function() {
    function AlbumCtrl() {
        var albumData = angular.copy(albumGrey);
        console.log(albumData);
        this.albumData = albumData;
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();
