function calculateReduction(originalPrice, reducedPrice) {
    if (originalPrice == "BRAK DANYCH" || reducedPrice == "BRAK DANYCH")
        return "BRAK DANYCH";
    
    originalPrice = Number(originalPrice.replace(/[^0-9\.]+/g, ""));
    reducedPrice = Number(reducedPrice.replace(/[^0-9\.]+/g, ""));
    return (originalPrice - reducedPrice) / 100 + " zł";
}

/* ARRAY DATA STRUCTURE
[0] - item image src
[1] - item name
[2] - item price
[3] - item price after reduction
[4] - reduction
[5] - item url
*/

xkomModule = angular.module('occasionProvider', []);
    xkomModule.component('tableData', {
        templateUrl: 'app/tableTemplate.html'
});

// X-KOM.PL
xkomData = angular.module('occasionProvider');
xkomData.controller('xkomController', function($scope, $http) {
    $scope.xkomArrayData = [];
    
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
    
    // in this case second request for item URL
    $http({
        method: 'GET',
        // select * from html where url='https://x-kom.pl' and xpath='//*[@id="pageWrapper"]/div[4]/div[1]/div[1]/script/text()'
        url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D\'https%3A%2F%2Fx-kom.pl\'%20and%20xpath%3D\'%2F%2F*%5B%40id%3D%22pageWrapper%22%5D%2Fdiv%5B4%5D%2Fdiv%5B1%5D%2Fdiv%5B1%5D%2Fscript%2Ftext()\'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
    }).then( function(result) {
        $scope.xkomData = result.data.query.results;
        
        $scope.urlStart = $scope.xkomData.indexOf("/goracy_strzal/");
        $scope.urlEnd = $scope.urlStart + 40;
        $scope.xkomArrayData[5] = "https://www.x-kom.pl" + $scope.xkomData.substring($scope.urlStart, $scope.urlEnd).replace(/[^\/0-9-a-z\_]+/g, "");
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
			NewPrice: productPrice.div[1].span,
			Save: calculateReduction(productPrice.div[0].span, productPrice.div[1].span)
		};
	});
});

// ZADOWOLENIE.PL
zadowolenieData = angular.module('occasionProvider');
zadowolenieData.controller('zadowolenieController', function($scope, $http) {
    $scope.zadowolenieArrayData = [];
    
    $http({
        method: 'GET',
        // select * from html where url='www.zadowolenie.pl' and xpath='//div[contains(@class, "b-dayOffer")]/div[contains(@class, "b-dayOffer product_box_widget")]'
		url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D\'www.zadowolenie.pl\'%20and%20xpath%3D\'%2F%2Fdiv%5Bcontains(%40class%2C%20%22b-dayOffer%22)%5D%2Fdiv%5Bcontains(%40class%2C%20%22b-dayOffer%20product_box_widget%22)%5D\'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
    }).then( function(result) {
        $scope.zadowolenieData = result.data.query.results.div.div.section.div.div.div.div.div;
        
        $scope.zadowolenieArrayData[0] = "http://www.zadowolenie.pl" + $scope.zadowolenieData.div["0"].a.img.src;
        $scope.zadowolenieArrayData[1] = $scope.zadowolenieData.p[1].a["data-offer-name"];
        $scope.zadowolenieArrayData[2] = "BRAK DANYCH";
        $scope.zadowolenieArrayData[3] = $scope.zadowolenieData.p[1].a["data-offer-price"];
        $scope.zadowolenieArrayData[4] = calculateReduction($scope.zadowolenieArrayData[2], $scope.zadowolenieArrayData[3]);
        $scope.zadowolenieArrayData[5] = "http://www.zadowolenie.pl" + $scope.zadowolenieData.div["0"].a.href;
    });
});

// AL.TO
altoData = angular.module('occasionProvider');
altoData.controller('altoController', function($scope, $http) {
    $scope.altoArrayData = [];
    
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
    
    // in this case second request for item URL
    $http({
        method: 'GET',
        // select * from html where url='https://al.to' and xpath='//*[@id="pageWrapper"]/div[4]/div[1]/div[1]/script/text()'
        url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D\'https%3A%2F%2Fal.to\'%20and%20xpath%3D\'%2F%2F*%5B%40id%3D%22pageWrapper%22%5D%2Fdiv%5B4%5D%2Fdiv%5B1%5D%2Fdiv%5B1%5D%2Fscript%2Ftext()\'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
    }).then( function(result) {
        $scope.altoData = result.data.query.results;
        
        $scope.urlStart = $scope.altoData.indexOf("/goracy_strzal/");
        $scope.urlEnd = $scope.urlStart + 40;
        $scope.altoArrayData[5] = "https://www.al.to" + $scope.altoData.substring($scope.urlStart, $scope.urlEnd).replace(/[^\/0-9-a-z\_]+/g, "");
    });
});

// AMFORA.PL
amforaData = angular.module('occasionProvider');
amforaData.controller('amforaController', function($scope, $http) {
    $scope.amforaArrayData = [];
    
    $http({
        method: 'GET',
        // select * from html where url='https://www.amfora.pl/' and xpath='//div[contains(@class, "top-wrap")]/div[contains(@class, "row")]'
		url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D\'https%3A%2F%2Fwww.amfora.pl%2F\'%20and%20xpath%3D\'%2F%2Fdiv%5Bcontains(%40class%2C%20%22top-wrap%22)%5D%2Fdiv%5Bcontains(%40class%2C%20%22row%22)%5D\'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
    }).then( function(result) {
        $scope.amforaData = result.data.query.results.div;
        
        $scope.imgUrl = $scope.amforaData.div["0"].div.a.style;
        $scope.urlStart = $scope.imgUrl.indexOf("https");
        $scope.urlEnd = $scope.imgUrl.indexOf("jpeg") + 4;
        
        $scope.amforaArrayData[0] = $scope.imgUrl.substring($scope.urlStart, $scope.urlEnd);
        $scope.amforaArrayData[1] = $scope.amforaData.div[1].div["0"].a.title
        $scope.amforaArrayData[2] = $scope.amforaData.div[1].div[2].div.div["0"].span;
        $scope.amforaArrayData[3] = $scope.amforaData.div[1].div[2].div.div[1].span;
        $scope.amforaArrayData[4] = calculateReduction($scope.amforaArrayData[2], $scope.amforaArrayData[3]);
        $scope.amforaArrayData[5] = $scope.amforaData.div[0].div.a.href;
    });
});