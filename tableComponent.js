function calculateReduction(originalPrice, reducedPrice) {
    originalPrice = Number(originalPrice.replace(/[^0-9\.]+/g, ""));
    reducedPrice = Number(reducedPrice.replace(/[^0-9\.]+/g, ""));
    return Math.floor(100 - ((reducedPrice * 100) / originalPrice));
}

/* ARRAY DATA STRUCTURE
[0] - item image src
[1] - item name
[2] - item price
[3] - item price after reduction
*/

xkomModule = angular.module('occasionProvider', []);
    xkomModule.component('tableData', {
        templateUrl: 'tableTemplate.html'
});

// X-KOM.PL
xkomData = angular.module('occasionProvider');
xkomData.controller('xkomController', function($scope, $http) {
    $scope.xkomArrayData = new Array(5);
    
    $http({
        method: 'GET',
        // select * from html where url='https://x-kom.pl' and xpath='//div[contains(@class, "hot-shot")]/div[contains(@class, "row")]'
        url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D\'https%3A%2F%2Fx-kom.pl\'%20and%20xpath%3D\'%2F%2Fdiv%5Bcontains(%40class%2C%20%22hot-shot%22)%5D%2Fdiv%5Bcontains(%40class%2C%20%22row%22)%5D\'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
    }).then( function(result) {
        $scope.xkomData = result.data.query.results.div[1];
        $scope.xkomArrayData[0] = $scope.xkomData.div[0].img.src;
        $scope.xkomArrayData[1] = $scope.xkomData.div["0"]["data-product-name"]
        $scope.xkomArrayData[2] = $scope.xkomData.div[1].div["0"].div["0"].content;
        $scope.xkomArrayData[3] = $scope.xkomData.div[1].div["0"].div[1].content;
        $scope.xkomArrayData[4] = calculateReduction($scope.xkomArrayData[2], $scope.xkomArrayData[3]);
    });

});

// MORELE.NET
moreleData = angular.module('occasionProvider');
moreleData.controller('moreleController', function($scope, $http) {
	
    $http({
		method: "GET",
		// select * from html where url='http://morele.net' and xpath='//div[contains(@class, "top-wrap")]/div[contains(@class, "row")]'
		url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fmorele.net'%20and%20xpath%3D'%2F%2Fdiv%5Bcontains(%40class%2C%20%22top-wrap%22)%5D%2Fdiv%5Bcontains(%40class%2C%20%22row%22)%5D'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
	}).then(function(result){ 
		var imgModel = result.data.query.results.div.div[0].div.a;
		var productModel = result.data.query.results.div.div[1];
		var productName = productModel.div[0];
		var productDescription = productModel.div[1];
		var productPrice = productModel.div[2].div;
		var startIndexUrl = imgModel.style.indexOf("https");
		var endIndexUrl = imgModel.style.indexOf("jpg") + 3;
		
		
		$scope.moreleModel = {
			ItemSrc: imgModel.style.substring(startIndexUrl,endIndexUrl),
			ItemName: productName.a.title,
			ItemLink: productName.a.href,
			OldPrice: productPrice.div[0].span,
			NewPrice: productPrice.div[1].span
		};
	});
});

// AL.TO
altoData = angular.module('occasionProvider');
altoData.controller('altoController', function($scope, $http) {
    $scope.altoArrayData = new Array(4);
    
    $http({
        method: 'GET',
        // select * from html where url='https://al.to' and xpath='//div[contains(@class, "hot-shot")]/div[contains(@class, "row")]'
        url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D\'https%3A%2F%2Fal.to\'%20and%20xpath%3D\'%2F%2Fdiv%5Bcontains(%40class%2C%20%22hot-shot%22)%5D%2Fdiv%5Bcontains(%40class%2C%20%22row%22)%5D\'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
    }).then( function(result) {
        $scope.altoData = result.data.query.results.div[1];
        $scope.altoArrayData[0] = $scope.altoData.div[0].img.src;
        $scope.altoArrayData[1] = $scope.altoData.div["0"]["data-product-name"]
        $scope.altoArrayData[2] = $scope.altoData.div[1].div["0"].div["0"].content;
        $scope.altoArrayData[3] = $scope.altoData.div[1].div["0"].div[1].content;
        $scope.altoArrayData[4] = calculateReduction($scope.altoArrayData[2], $scope.altoArrayData[3]);
    });
});