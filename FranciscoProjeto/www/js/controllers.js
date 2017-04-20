
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

.controller('browseCtrl', function ($scope, $rootScope, $ionicLoading) {

    $rootScope.Locais = [
    { Lat: 28.03932552928991, Long: 38.168157445898785 },


    ];
    var onSuccess = function (position) {

        var posic = { Lat: position.coords.latitude, Long: position.coords.longitude }
        $rootScope.Locais.push(posic);
        $ionicLoading.hide();
    };
    function onError(error) {
        alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    };
    $scope.chamaValor = function () {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        $ionicLoading.show({ template: 'Loading...' });

    }


})


.controller('SearchCtrl', function ($scope, $ionicLoading, $rootScope) {

   

    $ionicLoading.show({ template: 'Loading...' });

    var calcDistancia = function (p1LA, p1LO, p2LA, p2LO) {

        var r = 6371.0;

        p1LA = p1LA * Math.PI / 180.0;
        p1LO = p1LO * Math.PI / 180.0;
        p2LA = p2LA * Math.PI / 180.0;
        p2LO = p2LO * Math.PI / 180.0;

        var dLat = p2LA - p1LA;
        var dLong = p2LO - p1LO;

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(p1LA) * Math.cos(p2LA) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(r * c * 1000);

    };

    var calcAngulobearing = function (x1, y1, x2, y2, heading) {
        var Rad2Deg = 180.0 / Math.PI;
        var Deg2Rad = Math.PI / 180.0;
        var dx = x2 - x1;
        var dy = y2 - y1;
        var Angle = (Math.atan2(dy, dx)) * Rad2Deg;
        if (Angle < 0) {
            Angle = Angle + 360; //This is simular to doing
            // 360 Math.Atan2(y1 - y2, x1 - x2) * (180 / Math.PI)

        }

        if (heading < 80) {
            //Inverte os polos
            heading = 180 - heading;
            //Inverte para negativo o cabeçalho
            heading = heading - heading * 2;
            Angle = Angle + heading;
            //Inverte para Negativo o angulo pois os polos estão invertido.
            Angle = Angle - Angle * 2;
        }
        else {

            Angle = Angle - heading;
        }
        return Angle
    }


    var sons = [];

    // onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates
    //
    $scope.posicao = [];
    $scope.resultado = [];

  

   
    // $scope.resposta[Locais.length.valueOf()] = null;  
    var onSuccess = function (position) {
        LocaisResultado = [];
        $scope.retorna = [];
        $scope.resultado = [];
        $scope.posicao = [];
        var LocaisResultado = $rootScope.Locais;
        LocaisResultado.forEach(function (item, index) {
            $scope.resultado.push(calcDistancia(position.coords.latitude, position.coords.longitude, item.Lat, item.Long));
            $scope.posicao.push(calcAngulobearing(position.coords.latitude, position.coords.longitude, item.Lat, item.Long, position.coords.heading))

        });
        $scope.resultado.forEach(function (item, index) {


            if (item > 10) {

                $scope.retorna.push(buscarposicao($scope.posicao[index], item));


                sons.push('src/objetosmaisdezmetros.mp3');

            }
            else if ((item =>1) && (item < 2)) {

                $scope.retorna.push(buscarposicao($scope.posicao[index], item));
                sons.push('src/objetoummentrodireita.mp3');

            }
            else if ((item =>2) && (item < 3)) {
                $scope.retorna.push(buscarposicao($scope.posicao[index], item));
                sons.push('src/objetodoismentrodireita.mp3');
            }
            else if ((item =>3) && (item < 4)) {
                $scope.retorna.push(buscarposicao($scope.posicao[index], item));
                sons.push('src/objetotresmentrodireita.mp3');
            }
            else if ((item =>4) && (item < 5)) {
                $scope.retorna.push(buscarposicao($scope.posicao[index], item));
                sons.push('src/objetoquatromentrodireita.mp3');
            }
            else if ((item =>5) && (item < 6)) {
                $scope.retorna.push(buscarposicao($scope.posicao[index], item));
                sons.push('src/objetodoismentrodireita.mp3');
            }
            else if ((item =>6) && (item < 7)) {
                $scope.retorna.push(buscarposicao($scope.posicao[index], item));
                sons.push('src/objetotresmentrodireita.mp3');
            }
            else if ((item =>7) && (item < 8)) {
                $scope.retorna.push(buscarposicao($scope.posicao[index], item));
                sons.push('src/objetoquatromentrodireita.mp3');
            }
            else if ((item =>8) && (item < 9)) {
                $scope.retorna.push(buscarposicao($scope.posicao[index], item));
                sons.push('src/objetosmaisdezmetros.mp3');
            }
            else if (item == 0) {
                $scope.retorna.push(buscarposicao($scope.posicao[index], item));
                sons.push('src/objetosmaisdezmetros.mp3');
            };



        });
        $ionicLoading.hide();
    };
    function onError(error) {
        alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    };


    var mediaStatusCallback = function (status) {
        if (status == 1) {
            $ionicLoading.show({ template: 'Loading...' });
            alert(entrou);
        } else {
            $ionicLoading.hide();
        }
    }

    var buscarposicao = function (posicao, distancia) {
        var retorno = "O Objeto esta a " + distancia + " metros ";
        if (distancia == 0) {
            retorno = retorno;
        }
        else if ((posicao > 160) && (posicao < 190)) {
            retorno = retorno + "e a " + posicao.toFixed(2) + " graus sua costa";
        }
        else if (posicao < 0) {
            posicao = posicao - posicao * 2;

            retorno = retorno + "e a " + posicao.toFixed(2) + " graus sua esquerda";
           
        }
        else {
            retorno = retorno + "e a " + posicao.toFixed(2) + " graus sua direita";

        }
        return retorno;
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    $scope.chamaValor = function () {
     
     
  
        $ionicLoading.show({ template: 'Loading...' });
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
     

   
        var tocar = function (src, tempo) {
            var media = new Media(src, null, null, mediaStatusCallback);

            //executa o tempo...
            setTimeout(function () {
                media.play();
                setTimeout(function () {
                    media.stop();

                }, 4000);
            }, tempo * 4000);






        };
        //for (var i = 0; i < sons.length; ++i) {
        //    tocar(sons[i],i);


        //}
        sons = [];
      
       
    };



});
