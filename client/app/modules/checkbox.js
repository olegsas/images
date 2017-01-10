angular.module('app.checkbox', [])
    .controller('checkboxCtrl', ['$scope', '$http', function($scope, $http) {

    //    public : false,
    //  };
     $http.get('/getUserProfile')
     .then(profile => {
         console.log(profile);
         $scope.profile = profile.data.profile[0].profile;
     });
     $scope.update = function() {
         $http.post('/updateProfile', {profile:$scope.checkboxModel.public})
         .then(profile => {
             $scope.checkboxModel.public = profile.data
         })          
         
     }
    }]);