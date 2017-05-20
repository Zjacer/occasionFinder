function returnsth() { 
    now = new Date();
    nowTime = now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds();
    
    // nowTime - morning promotion hour (10:00:00) and nowTime - evening promotion hour (22:00:00)
    return (nowTime - 36000 > 79200 - nowTime) ? "10:00" : "22:00";
}

xkomData = angular.module('occasionProvider', []);
// TODO: merge xpath conditions
xkomData.controller('_xkomdata', function($scope, $http) {
    $scope.xkomArrayData = new Array(5);
    
    // product image
    $http({
        method: 'GET',
        // select * from html where url='http://x-kom.pl' and xpath='//*[@id="hotShot"]/div[2]/div[1]'
        url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D\'https%3A%2F%2Fwww.x-kom.pl%2F\'%20and%20xpath%3D\'%2F%2F*%5B%40id%3D%22hotShot%22%5D%2Fdiv%5B2%5D%2Fdiv%5B1%5D%2Fimg\'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
    }).then( function(result) {
        $scope.xkomData = result.data.query;
        $scope.xkomArrayData[0] = $scope.xkomData.results.img.src;
    });
    
    // product name
    $http({
        method: 'GET',
        // select * from html where url='http://x-kom.pl' and xpath='//*[@id="hotShot"]/div[2]/div[1]/p'
        url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D\'http%3A%2F%2Fx-kom.pl\'%20and%20xpath%3D\'%2F%2F*%5B%40id%3D%22hotShot%22%5D%2Fdiv%5B2%5D%2Fdiv%5B1%5D%2Fp\'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
    }).then( function(result) {
        $scope.xkomData = result.data.query;
        $scope.xkomArrayData[1] = $scope.xkomData.results.p.content;
    });
    
    $scope.xkomArrayData[2] = returnsth();
    // old and new price
    $http({
        method: 'GET',
        // select * from html where url='https://www.x-kom.pl' and xpath='//*[@id="hotShot"]/div[2]/div[2]/div[1]'
        url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D\'https%3A%2F%2Fwww.x-kom.pl\'%20and%20xpath%3D\'%2F%2F*%5B%40id%3D%22hotShot%22%5D%2Fdiv%5B2%5D%2Fdiv%5B2%5D%2Fdiv%5B1%5D\'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
    }).then( function(result) {
        $scope.xkomData = result.data.query.results.div.div;
        $scope.xkomArrayData[3] = $scope.xkomData[0].content;
        $scope.xkomArrayData[4] = $scope.xkomData[1].content;
    });
});


xkomModule = angular.module('occasionProvider');
    xkomModule.component('tableData', {
        templateUrl: 'tableTemplate.html'
});