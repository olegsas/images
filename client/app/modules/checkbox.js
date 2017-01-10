angular.module('app.checkbox', [])
    .controller('checkboxCtrl', ['$scope', '$http', function($scope, $http) {

    //    public : false,
    //  };
     $http.get('/getUserProfile')
     .then(profile => {
         console.log("profile =="+profile.data.profile[0].profile);
         $scope.profile = profile.data.profile[0].profile;
     });
     $scope.update = function() {
         console.log('====');
         console.log($scope.profile);
         $http.post('/updateProfile', {profile:$scope.profile})
         .then(profile => {
             console.log('+++');
             //$scope.profile = profile.data.profile[0].profile;
         })          
         
     }
    }]);