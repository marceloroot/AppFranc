
angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {
})

.controller('browseCtrl', function ($scope) {
    var Latitude = undefined;
    var Longitude = undefined;

    // Get geo coordinates

    function getMapLocation() {

        navigator.geolocation.getCurrentPosition
        (onMapSuccess, onMapError, { enableHighAccuracy: true });
    }

    // Success callback for get geo coordinates

    var onMapSuccess = function (position) {

        Latitude = position.coords.latitude;
        Longitude = position.coords.longitude;

        getMap(Latitude, Longitude);

    }

    // Get map by using coordinates

    function getMap(latitude, longitude) {

        var mapOptions = {
            center: new google.maps.LatLng(0, 0),
            zoom: 1,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map
        (document.getElementById("map"), mapOptions);


        var latLong = new google.maps.LatLng(latitude, longitude);

        var marker = new google.maps.Marker({
            position: latLong
        });

        marker.setMap(map);
        map.setZoom(15);
        map.setCenter(marker.getPosition());
    }

    // Success callback for watching your changing position

    var onMapWatchSuccess = function (position) {
        
        var updatedLatitude = position.coords.latitude;
        var updatedLongitude = position.coords.longitude;

        if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

            Latitude = updatedLatitude;
            Longitude = updatedLongitude;

            getMap(updatedLatitude, updatedLongitude);
        }
    }

    // Error callback

    function onMapError(error) {
        console.log('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }

    // Watch your changing position

    function watchMapPosition() {

        return navigator.geolocation.watchPosition
        (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
    }

   

})


.controller('SearchCtrl', function ($scope, $ionicLoading) {
    var calcDistancia = function (p1LA, p1LO, p2LA, p2LO) {

       var r = 6371.0;
       
        p1LA = p1LA *  Math.PI / 180.0;
        p1LO = p1LO *  Math.PI / 180.0;
        p2LA = p2LA *  Math.PI / 180.0;
        p2LO = p2LO * Math.PI / 180.0;
       
        var dLat = p2LA - p1LA;
        var dLong = p2LO - p1LO;
       
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(p1LA) * Math.cos(p2LA) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(r * c * 1000);
       
    };
   
    var calcAngulobearing = function ( x1,  y1,  x2,  y2,heading) {
        var Rad2Deg = 180.0 / Math.PI;
        var Deg2Rad = Math.PI / 180.0;
        var dx = x2 - x1;
        var dy = y2 - y1;
        var Angle = (Math.atan2(dy, dx)) * Rad2Deg;
        if (Angle < 0)
        {
            Angle = Angle + 360; //This is simular to doing
            // 360 Math.Atan2(y1 - y2, x1 - x2) * (180 / Math.PI)
            
        }
        Angle = Angle - heading;
        if (Angle < 0) {
            Angle = Angle + 360; //This is simular to doing
        }
        return Angle
    }


    var Locais = [
    { Lat: 32.885417273021446, Long: 66.29315744590238, heade: 90.90 },
    { Lat: 43.465119, Long: -50.522375, heade: 60.90, },
    { Lat: 43.465193, Long: -90.522386, heade: 90.90 },
    { Lat: 43.465240, Long: -90.522389, heade: 90.90 },
    { Lat: 60.465195, Long: 90.522388, heade: 90.90 }

    ];
    var sons = [];
    // onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates
    //
    $scope.resultado = [];
   
   // $scope.resposta[Locais.length.valueOf()] = null;  
    var onSuccess = function (position) {
      
        Locais.forEach(function(item,index){  
            $scope.resultado.push(calcDistancia(position.coords.latitude, position.coords.longitude, item.Lat, item.Long), calcAngulobearing(position.coords.latitude, position.coords.longitude, item.Lat, item.Long, position.coords.heading));
           alert($scope.resultado);
        });
       
        
    };
    function onError(error) {
        alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    };
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    // onError Callback receives a PositionError object
    //
    //Colocar um progress bar com audio.
   
    var mediaStatusCallback = function(status) {
        if(status == 1) {
            $ionicLoading.show({ template: 'Loading...' });
            alert(entrou);
        } else {
            $ionicLoading.hide();
        }
    }
 
   
    $scope.chamaValor = function ()
    {
       
      
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        $scope.resultado.forEach(function (item, index) {

            if (item > 10) {

         
                var media = new Media('src/Kalimba.mp3', null, null, mediaStatusCallback);

                sons.push('src/objetosmaisdezmetros.mp3');

            }
            else if ((item =>1) && (item < 2)) {


                sons.push('src/objetoummentrodireita.mp3');
                

            }
            else if ((item =>2) && (item < 3))
            {
                sons.push('src/objetodoismentrodireita.mp3');
            }
            else if ((item =>3) && (item < 4))
            {
                sons.push('src/objetotresmentrodireita.mp3');
            }
            else if ((item =>4) && (item < 5))
            {
                sons.push('src/objetoquatromentrodireita.mp3');
            }
            else if ((item =>5) && (item < 6))
            {
                sons.push('src/objetodoismentrodireita.mp3');
            }
            else if ((item =>6) && (item < 7))
            {
                sons.push('src/objetotresmentrodireita.mp3');
            }
            else if ((item =>7) && (item < 8))
            {
                sons.push('src/objetoquatromentrodireita.mp3');
            }
            else if ((item =>8) && (item < 9))
            {
                sons.push('src/objetosmaisdezmetros.mp3');
            };


            
          
        });
       
        var tocar = function (src,tempo) {
            var media = new Media(src, null, null, mediaStatusCallback);

            //executa o tempo...
            

            setTimeout(function () {
                media.play();
                setTimeout(function () {
                    media.stop();

                }, 4000);
            }, tempo*4000);

            




        };
        for (var i = 0; i < sons.length; ++i) {
            tocar(sons[i],i);
           

        }
        sons = [];
        $scope.resultado = [];
       
    };
   
  

});
