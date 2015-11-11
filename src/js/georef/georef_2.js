app.controller('georef', [ '$scope','$http', function($scope, $http){

  var map = L.map('map',{minZoom: 10,maxZoom: 18}).setView([-15.7499, -47.8965], 10)
  var toolserver = L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png')
  var stamen = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'OpenStreetMap'}).addTo(map)
  var baseLayers = {"OpenStreetMap": stamen, "OpenStreetMapGray":toolserver}

  // var geojson = L.geoJson(roads, {
  //     onEachFeature: onEachFeature
  // }).addTo(map)

  var overlays = { /*"geoJson": geojson */ }
  var geojson_d3
  var geojson_d3_q
  var geojson_d3_s 
  var geojson_d3_r
  var geojson_d3_p
  var geojson_d3_e

  // control position
  map.zoomControl.setPosition('topright')

  // control legenda
  var legend = L.control({position: 'bottomright'})

  //control base/overlays
  var control = L.control.layers(baseLayers).addTo(map)

  legend.onAdd = function(map) {
    var div = L.DomUtil.create('div','info legend'),
      colors = ['#00CC00', '#006699', '#FF4500', '#FF6347'],
      labels = ['Faixa 1 (0-1.600)','Faixa 2 (1.601-3.275)','Faixa 3 (3.276-5.000)','Faixa 4 (5.001-x)']

    // loop through our density intervals and generate a label with a colored square for each interval
    div.innerHTML +='<strong> Predominancia por:</strong><br>'
    for (var i = 0; i < colors.length; i++) {
      div.innerHTML +='<i style="background:'+colors[i]+'"></i>'+labels[i]+'<br>'
    }
    div.innerHTML +='<br><strong> Divisão por:</strong><br>'
    div.innerHTML +='<i style="background:#A9A9A9"></i> RA <br>'
    div.innerHTML +='<i style="background:#F0E68C"></i> SETOR <br>'
    div.innerHTML +='<i style="background:#87CEFA"></i> QUADRA <br>'
    div.innerHTML +='<i style="background:#FFD700"></i> EMPREENDIMENTOS <br>'
    // verde 2-10 amarelo 11-100 vermelho 101 - x
    return div;
  }
  legend.addTo(map) 

  var myIcon = L.icon({
    iconUrl: 'src/img/placeholder-codhab.png',
    //iconRetinaUrl: 'my-icon@2x.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
  })

  function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 3,
        fillOpacity: 1
    })
  }
  function resetHighlight(e) {
    var layer = e.target;
    layer.setStyle({
      weight: 1,
      fillOpacity: 0.4
    })  
  }
  function resetHighlightE(e) {
    var layer = e.target;
    layer.setStyle({weight: 1})  
  }

  function onEachFeature(feature, layer){
    if (feature.properties) {
      layer.bindPopup("<b>" + feature.properties.setor + "</b> " + feature.properties.quadra + ".")
    }
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    })
  }

  function onEachFeatureE(feature, layer){
    if (feature.properties) {
      var popupContent = ""
      popupContent +='<h5><b>'+feature.properties.nome+'</b></h5>'
      popupContent +='<span>'+feature.properties.endereco+'<span></br>'
      popupContent +='<span>'+feature.properties.edital+'<span></br>'
      popupContent +='<span>'+feature.properties.condicao+'<span></br>'
      layer.bindPopup(popupContent)
    }
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlightE
    })
  }

  function onEachFeatureR(feature, layer){
    if (feature.properties) {
      layer.bindPopup("<b>" + feature.properties.nome_ras + "</b> " + feature.properties.romano + ".")
    }
  }

  function onEachFeatureP(feature, layer){
    if (feature.properties) {
      layer.bindPopup("<b>" + feature.properties.setor + "</b> " + feature.properties.quadra + ".")
    }
  }  

  function onEachFeaturePoint(feature, layer, scope) {
    var popupContent = ""
    var url_host = window.location.href
    var url = $scope.prm
    if(url){
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
    layer.bindPopup(popupContent)
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    })
  }


  var svgContainer = d3.select(map.getPanes().overlayPane).append("svg");
  var group = svgContainer.append("g").attr("class", "leaflet-zoom-hide");

  waitingDialog.show('Carregando')

  window.setTimeout(function() {
     d3.json("src/geojson/edital.json", function(collection) {
    //console.log([collection])
    var edital = [collection];
    geojson_d3_e = L.geoJson(edital, {
        onEachFeature: onEachFeatureE,
        style:{
          fillColor:"#FFD700",
          color: "#FFFF00",
          weight: 1,
          opacity: 1,
          fillOpacity: 1
          }
    })
   control.addOverlay(geojson_d3_e,'Empreendimentos');
   geojson_d3_e.addTo(map)
  })

  waitingDialog.hide()
  }, 10000)
         
  d3.json("src/geojson/quadra.json", function(collection) {
    //console.log([collection])
    var quadra = [collection];
    geojson_d3_q = L.geoJson(quadra, {
        onEachFeature: onEachFeature,
        style:{
          fillColor:"#87CEFA",
          color: "#808080",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.5
          }
    })
   control.addOverlay(geojson_d3_q,'Quadra');
   //geojson_d3_q.addTo(map)
  })
  d3.json("src/geojson/setor.json", function(collection) {
    //console.log([collection])
    var setor = [collection];
    geojson_d3_s = L.geoJson(setor, {
        onEachFeature: onEachFeature,
        style:{
          fillColor:"#F0E68C",
          color: "#696969",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.5
          }
    })
   control.addOverlay(geojson_d3_s,'Setor');
   geojson_d3_s.addTo(map)
  })
  d3.json("src/geojson/ra.json", function(collection) {    
   // console.log([collection])    
    var ra = [collection];
    geojson_d3_r = L.geoJson(ra, {
        //onEachFeature: onEachFeatureR,
        style:{          
            fillColor: "#A9A9A9",
            color: "#808080",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.4,
            clickable: false             
        }
    })
    control.addOverlay(geojson_d3_r,'RA');
    geojson_d3_r.addTo(map)
  })
 
  d3.json("src/geojson/cidadao.json", function(collection) {    
   // console.log([collection])    
    var cidadao = [collection];
    geojson_d3_p = L.geoJson(cidadao, {
        onEachFeature: onEachFeatureP,
        pointToLayer: function(feature, latlng) {
           var smallIcon = L.icon({
              iconUrl: 'src/img/markman.png',
              //iconRetinaUrl: 'my-icon@2x.png',
              iconSize: [38, 65],
              iconAnchor: [22, 34],
              popupAnchor: [-3, -76]
           })
           return L.marker(latlng, {icon: smallIcon})
        }
    })
    markers.addLayer(geojson_d3_p)
    control.addOverlay(markers,'Cidadão')
    //map.addLayer(markers)
    //markers.addTo(map)
    map.fitBounds(markers.getBounds())
  })

  $scope.addgeojson = function(dado) {
    if(geojson_d3 != undefined)
      map.removeLayer(geojson_d3)

    url = 'http://www.morarbem.df.gov.br/consultas/geo?'+dado
    
    d3.json(url, function(collection) {
      window.setTimeout(function() {  
        //control.addOverlay(geojson_d3,'jsond3_Pontos');
        geojson_d3.addTo(map)    
        waitingDialog.hide()
       }, 800) 
      var roadsTest = [collection];
      geojson_d3 = L.geoJson(roadsTest, {
          onEachFeature: onEachFeaturePoint,
          visible: true,
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
                  color = "#FF6347"
                return L.circleMarker(latlng, {
                  radius: radius,
                  fillColor: color,
                  color: color,
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.7
                })
              }
      })
      
    })
  }
  var searchControl = L.esri.Geocoding.Controls.geosearch({
    position: 'topright',
    placeholder: 'Busca por Estados ou Cidades',
    title: 'Pesquisa',
    providers: [
      new L.esri.Geocoding.Controls.Geosearch.Providers.MapService({
        label: 'Estados ou Cidades',
        url: 'http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer',
        layers: [2, 3],
        searchFields: ['NAME', 'STATE_NAME']
      })
    ]
  }).addTo(map);

  // cluster dos cidadeos
  var markers = new L.markerClusterGroup()

  // controle zoom layes
  map.on('zoomend', function() {
    if(geojson_d3 != undefined){
      if(map.getZoom() > 14 && map.hasLayer(geojson_d3)) {
        map.removeLayer(geojson_d3);
      }
      if(map.getZoom() < 14 && map.hasLayer(geojson_d3) == false ){
        map.addLayer(geojson_d3)
        console.log(map.getBounds().toBBoxString())
        //map.geojson_d3.refresh('http://www.morarbem.df.gov.br/consultas/geo?')
        //-48.19719314575195,-15.85649915916463,-47.925453186035156,-15.754423367152363
      }
    }
  })

  $scope.geojsonSelect = function(dado,pfirst,plast) {
    waitingDialog.show('Carregando')
    if(dado != undefined){ 
      jQuery.ajaxSettings.traditional = true;
      var param = decodeURIComponent($.param(dado))
      $scope.prm = param
    }
    else{ var param = "" }
    $scope.addgeojson(param)

    // geojson_d3_q.setStyle(
    //   function (feature, latlng) {
    //     faixa = feature.properties.quadra.length
    //     if(faixa > 0 && faixa < 5 )
    //       color = "#FF0000"          
    //     else if(faixa > 5 && faixa < 10 )
    //       color = "#FF4500"          
    //     else if(faixa > 10 && faixa < 15 )
    //       color = "#006699"
    //     else if(faixa > 15 )
    //       color = "#00CC00"
    //     return {
    //       fillColor: color,
    //       color: "#000",
    //       weight: 1,
    //       opacity: 1,
    //       fillOpacity: 0.4
    //     }
    //   }
    // );
  }

}])