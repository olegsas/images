angular.module('app.checkbox', [])
    .controller('checkboxCtrl', ['$scope', '$http', function($scope, $http) {
      $scope.checkboxModel = {}
    //    public : false,
    //  };
     $http.get('/getUserProfile')
     .then(profile => {
         console.log(profile);
         $scope.checkboxModel.public = profile.data
     });
     $scope.update = function() {
         $http.post('/updateProfile', {profile:$scope.checkboxModel.public})
         .then(profile => {
             $scope.checkboxModel.public = profile.data
         })          
         
     }
    }]);