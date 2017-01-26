(function() {
    function AlbumCtrl(Fixtures) {
        // var albumData = angular.copy(albumGrey);
        // console.log(albumData);
        // this.albumDasta = albumData;

        this.albumData = Fixtures.getAlbum();
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();
