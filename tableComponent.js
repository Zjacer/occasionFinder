// for tests
items = angular.module('occasionProvider', []);
items.controller('_gatherer', function ($scope, $http) {
    $http.get("items.json").then( function (response) {
        $scope.items = response.data.storeOccasions;
    });
});

xkomData = angular.module('occasionProvider');
xkomData.controller('_xkomdata', function($scope, $http) {
    $http({
        method: 'GET',
        // select * from html where url='http://x-kom.pl' and xpath='//*[@id="hotShot"]/div[2]/div[1]'
        url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D\'https%3A%2F%2Fwww.x-kom.pl%2F\'%20and%20xpath%3D\'%2F%2F*%5B%40id%3D%22hotShot%22%5D%2Fdiv%5B2%5D%2Fdiv%5B1%5D%2Fimg\'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
    }).then( function(result) {
        $scope.xkomData = result.data.query;
    });
});

xkomModule = angular.module('occasionProvider');
    xkomModule.component('tableData', {
        templateUrl: 'tableTemplate.html'
});