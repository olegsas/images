angular.module('app.checkbox', [])
    .controller('checkboxCtrl', ['$scope', function($scope, $http) {
    //   $scope.checkboxModel = {
    //    public : false,
    //  };
     $http.get('/getUserProfile')
     .then(profile => {
         $scope.checkboxModel.public = profile.data
     })
     $scope.update = function() {
         $http.post('/updateProfile')
         .then(profile => {
             $scope.checkboxModel.public = profile.data
         })          
         
     }
    }]);