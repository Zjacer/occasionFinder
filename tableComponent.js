function getEndingTime() { 
    now = new Date();
    nowTime = now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds();
    
    // nowTime - morning promotion hour (10:00:00) and nowTime - evening promotion hour (22:00:00)
    return (nowTime - 36000 > 79200 - nowTime) ? "10:00" : "22:00";
}

xkomModule = angular.module('occasionProvider', []);
    xkomModule.component('tableData', {
        templateUrl: 'tableTemplate.html'
});
// TODO: merge xpath conditions!!!!

// X-KOM.PL SHOP
xkomData = angular.module('occasionProvider');
xkomData.controller('_xkomdata', function($scope, $http) {
    $scope.xkomArrayData = new Array(5);
    
    // product image
    $http({
        method: 'GET',
        // select * from html where url='https://www.x-kom.pl' and xpath='//*[@id="hotShot"]/div[2]/div[1]'
        url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D\'https%3A%2F%2Fwww.x-kom.pl%2F\'%20and%20xpath%3D\'%2F%2F*%5B%40id%3D%22hotShot%22%5D%2Fdiv%5B2%5D%2Fdiv%5B1%5D%2Fimg\'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
    }).then( function(result) {
        $scope.xkomData = result.data.query;
        $scope.xkomArrayData[0] = $scope.xkomData.results.img.src;
    });
    
    // product name
    $http({
        method: 'GET',
        // select * from html where url='https://www.x-kom.pl' and xpath='//*[@id="hotShot"]/div[2]/div[1]/p'
        url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D\'http%3A%2F%2Fx-kom.pl\'%20and%20xpath%3D\'%2F%2F*%5B%40id%3D%22hotShot%22%5D%2Fdiv%5B2%5D%2Fdiv%5B1%5D%2Fp\'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
    }).then( function(result) {
        $scope.xkomData = result.data.query;
        $scope.xkomArrayData[1] = $scope.xkomData.results.p.content;
    });
    
    $scope.xkomArrayData[2] = getEndingTime();
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

// AL.TO SHOP
altoData = angular.module('occasionProvider');
altoData.controller('_altodata', function($scope, $http) {
    $scope.altoArrayData = new Array(5);
    
    // product image
    $http({
        method: 'GET',
        // select * from html where url='https://www.al.to' and xpath='//*[@id="hotShot"]/div[2]/div[1]'
        url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D\'https%3A%2F%2Fwww.al.to%2F\'%20and%20xpath%3D\'%2F%2F*%5B%40id%3D%22hotShot%22%5D%2Fdiv%5B2%5D%2Fdiv%5B1%5D\'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
    }).then( function(result) {
        $scope.altoData = result.data.query;
        $scope.altoArrayData[0] = $scope.altoData.results.div.img.src;
        console.log($scope.altoArrayData[0]);
    });
    
    // product name
    $http({
        method: 'GET',
        // select * from html where url='https://www.al.to' and xpath='//*[@id="hotShot"]/div[2]/div[1]/p'
        url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D\'https%3A%2F%2Fwww.al.to%2F\'%20and%20xpath%3D\'%2F%2F*%5B%40id%3D%22hotShot%22%5D%2Fdiv%5B2%5D%2Fdiv%5B1%5D%2Fp\'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
    }).then( function(result) {
        $scope.altoData = result.data.query;
        $scope.altoArrayData[1] = $scope.altoData.results.p.content;
    });
    
    $scope.altoArrayData[2] = getEndingTime();
    // old and new price
    $http({
        method: 'GET',
        // select * from html where url='https://www.al.to' and xpath='//*[@id="hotShot"]/div[2]/div[2]/div[1]'
        url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D\'https%3A%2F%2Fwww.al.to%2F\'%20and%20xpath%3D\'%2F%2F*%5B%40id%3D%22hotShot%22%5D%2Fdiv%5B2%5D%2Fdiv%5B2%5D%2Fdiv%5B1%5D\'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
    }).then( function(result) {
        $scope.altoData = result.data.query.results.div.div;
        $scope.altoArrayData[3] = $scope.altoData[0].content;
        $scope.altoArrayData[4] = $scope.altoData[1].content;
    });
});

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
    
    

//komputronikData = angular.module('occasionProvider');
//komputronikData.controller('_moreledata', function($scope, $http) {
//    $scope.moreleArrayData = new Array(5);

// RTV EURO AGD SHOP - Dla Wasia, masz tu juz zalazek
//rtveuroagdData = angular.module('occasionProvider');
//rtveuroagdData.controller('_rtveuroagddata', function($scope, $http) {
//    $scope.rtveuroagdArrayData = new Array(5);

// + troche roboty dla ciebie, ktora ci opisze w wiadomosci, bo tutaj to masz pikus, nie robote