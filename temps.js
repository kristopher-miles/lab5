angular.module('tempratures', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.temps = [];
      $scope.violations =[];
      $scope.trueViolations=[];
      $scope.trueTemps=[];
      $scope.currentTemp = -1;
    $scope.eci = 'N33w82RX3rSmWtqF1f6pFb';
    $scope.update = function() {
       return $http({
          url: 'http://pico.kristophermiles.pagekite.me/sky/event/N33w82RX3rSmWtqF1f6pFb/61659830140/sensor/profile_updated',
          method: "POST",
          data: { phone: $scope.phone, name:$scope.name,threshhold:$scope.number,location:$scope.location }
        }).success(function(data, status) {
            $scope.getConfig();
            $scope.number='';
            $scope.name='';
            $scope.location='';
           $scope.phone='';
        });

    };

    var gURL = 'http://pico.kristophermiles.pagekite.me/sky/event/N33w82RX3rSmWtqF1f6pFb/63247241047/sensor/get_temps';
    $scope.getAll = function() {
      return $http.get(gURL).success(function(data){
          
          
        angular.copy(data.directives[0].options.saved, $scope.temps);
        angular.forEach(Object.keys($scope.temps),function(key,value){
              var curTemp={};
              curTemp.date=key;
              curTemp.value=$scope.temps[key];
              $scope.trueTemps.push(curTemp);
            $scope.currentTemp = curTemp.value;
          });
      });
    };
      var vURL = 'http://pico.kristophermiles.pagekite.me/sky/event/N33w82RX3rSmWtqF1f6pFb/63247241047/testing/get_violations';
     $scope.getViolations = function() {
      return $http.get(vURL).success(function(data){
          
          
        angular.copy(data.directives[0].options.saved, $scope.violations);
        angular.forEach(Object.keys($scope.violations),function(key,value){
              var curTemp={};
              curTemp.date=key;
              curTemp.value=$scope.violations[key];
              $scope.trueViolations.push(curTemp);
          });
      });
    };
      var cURL = 'http://pico.kristophermiles.pagekite.me/sky/event/N33w82RX3rSmWtqF1f6pFb/61659830140/sensor/get_config';
    $scope.getConfig = function() {
      return $http.get(cURL).success(function(data){
          var temp =data.directives[0].options.something;
          $scope.current_name = temp.name;
          $scope.current_location=temp.location;
          $scope.current_phone=temp.phone;
          $scope.current_threshhold=temp.threshhold;

      });
    };

    $scope.getAll();
    $scope.getViolations();
    $scope.getConfig();

  }
]);