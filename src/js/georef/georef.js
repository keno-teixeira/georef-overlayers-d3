app.controller('georef', [ '$scope','$http', function($scope, $http) {

  function onEachFeature(feature, layer, scope) {
    var popupContent = ""
    var url_host = window.location.href
   // if($scope.param){
   //    dadoQnt = [feature.properties.Total]
   //    $scope.param.quantidade = dadoQnt
   // }
    console.log($scope.param) 
    var url = JSON.stringify($scope.param)
    if(url){
      console.log(url)
      url = url.replace( /\"quantidade":\"+[0-9]+\"/g || /\"quantidade":\"\"/g,"")
      url = url.replace( /\":\[\"/g,"=")
      url = url.replace( /\"],\"/g,"&")
      url = url.replace("\"]}","")
      url = url.replace("{\"","")
      url = url.replace( /\",\"/g,",")
      url = url.replace(/\"],,\"/ || /\"]/ || /\"],,\"/ || /\"],}\"/,"&")
      url = url.replace(/\{,\"/,"")
      url = url.replace(/\"],}/,"")

      console.log(url)
      var dado = url_host+"grid/?cidade="+feature.properties.City+"&"+url+"&quantidade="+feature.properties.Total }
    else{ var dado = url_host+"grid/?cidade="+feature.properties.City+"&quantidade="+feature.properties.Total }
    
    if (feature.properties.City) {
      popupContent +='<h5><b>'+feature.properties.City+'</b></h5>'
      popupContent +='<h6><b>Total de habilitados: </b>'+ feature.properties.Total+'</h6>'
      popupContent +='<table class="table"><thead><tr><th>RII</th><th>RIE</th><th>Vul</th></tr></thead><tbody><tr>'
      popupContent +='<td>'+feature.properties.RII+'</td>'
      popupContent +='<td>'+feature.properties.RIE+'</td>'
      popupContent +='<td>'+feature.properties.Vul+'</td>'
      popupContent +='</tr></tbody></table><table class="table"><thead><tr>'
      popupContent +='<th>Homens</th><th>Mulheres</th><th>Idosos</th><th>Deficientes</th></tr></thead><tbody><tr>'
      popupContent +='<td>'+feature.properties.Male+'</td>'
      popupContent +='<td>'+feature.properties.Female+'</td>'
      popupContent +='<td>'+feature.properties.Elderly+'</td>'
      popupContent +='<td>'+feature.properties.Special+'</td>'
      popupContent +='</tr></tbody></table><table class="table"><thead><tr>'
      popupContent +='<th>Faixa 1</th><th>Faixa 2</th><th>Faixa 3</th><th>Faixa 4</th></tr></thead><tbody><tr>'
      popupContent +='<td>'+feature.properties.Zone1+'</td>'
      popupContent +='<td>'+feature.properties.Zone2+'</td>'
      popupContent +='<td>'+feature.properties.Zone3+'</td>'
      popupContent +='<td>'+feature.properties.Zone4+'</td>'
      popupContent +='</tr></tbody></table><h6><a target="_blank" href="'+dado+'">Detalhar habilitados</a></h6>'

    }
    var hoverLayer = { weight: 3,fillOpacity: 1 }
    var outLayer = { weight: 1,fillOpacity: 0.6 }

    layer.bindPopup(popupContent)
    layer.on("mouseover", function (e) {
        layer.setStyle(hoverLayer)
    })
    layer.on("mouseout", function (e) {
        layer.setStyle(outLayer)
    })
  }

  angular.extend($scope, {
    defaults: {
      zoomControlPosition: 'topright',
      minZoom: 10,
      maxZoom: 18
    },
    brasilia: {
      lat: -15.7799,
      lng: -47.7965,
      zoom: 10      
    },
    controls: {
      scale: { position: 'bottomright' }
    },
    legend: {
      colors: [ '#fff','#00CC00', '#006699', '#FF4500', '#FF0000' ],
      labels: [ '<strong> Predominancia por:</strong>','Faixa 1 (0-1.600)', 'Faixa 2 (1.601-3.275)', 'Faixa 3 (3.276-5.000)', 'Faixa 4 (5.001-x)' ]
    },
  })
      
  $scope.addgeojson = function(dado) {
    $http.get('http://www.morarbem.df.gov.br/consultas/geo',{params:dado}).success(function(data){
    //window.setTimeout(function() {
      angular.extend($scope,{
        geojson : {
          data: data,
          onEachFeature: onEachFeature,
          pointToLayer:
            function (feature, latlng) {
              radius = feature.properties.Total > 1000 ?  ((feature.properties.Total/ 1000)  + 10) : ((feature.properties.Total/ 100) + 10)
              faixa = [feature.properties.Zone1,feature.properties.Zone2,feature.properties.Zone3,feature.properties.Zone4]

              var maior = Math.max.apply(null, faixa )
              if(feature.properties.Zone1 == maior )
                color = "#00CC00"
              else if(feature.properties.Zone2 == maior )
                color = "#006699"
              else if(feature.properties.Zone3 == maior )
                color = "#FF4500"
              else if(feature.properties.Zone4 == maior )
                color = "#FF0000"
              return L.circleMarker(latlng, {
                radius: radius,
                fillColor: color,
                color: color,
                weight: 1,
                opacity: 1,
                fillOpacity: 0.6
              })
            }
        }
      })
    waitingDialog.hide()
    })  
  }

  $scope.geojsonSelect = function(dado,pfirst,plast) {
    window.setTimeout(function() {
      if(pfirst != undefined && plast != undefined && dado != undefined){
        dado2 = [pfirst,plast]
        dado.pontuacao = dado2
        $scope.param = dado
        $scope.addgeojson(dado)
      }
      else if(pfirst != undefined && plast != undefined){
        var dado1 = new Object()
        dado2 = [pfirst,plast]
        dado1.pontuacao = dado2
        $scope.param = dado1
        $scope.addgeojson(dado1)  
      }
      else{
        $scope.param = dado
        $scope.addgeojson(dado)  
      }        
    }, 800)
    $scope.geojson = {}
    waitingDialog.show('Carregando')
  }
    
}])