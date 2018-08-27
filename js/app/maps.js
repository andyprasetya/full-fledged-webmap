var maps = {
	_createLandingPageMap: function () {
		var content = "" +
			"<div id='map' class='map-wrapper'></div>" +
			"";
		document.getElementById('app').innerHTML = content;
		
		var map, isCollapsed, 
			googleSatellite, googleStreets, googleHybrid, googleTerrain, openStreetMaps, openTopoMap, 
			bboxminx, bboxminy, bboxmaxx, bboxmaxy, centroidx, centroidy, minzoom, maxzoom, initzoom, 
			circlepoint = new L.divIcon({className: 'pointmarker'});
		
		fetch('./dataservices/map-config.json')
		.then(function(dataconfig){
			return dataconfig.json();
		})
		.then(function(mapconfig){
			bboxminx = mapconfig.properties.minx;
			bboxminy = mapconfig.properties.miny;
			bboxmaxx = mapconfig.properties.maxx;
			bboxmaxy = mapconfig.properties.maxy;
			centroidx = mapconfig.properties.centroidx;
			centroidy = mapconfig.properties.centroidy;
			minzoom = mapconfig.properties.minzoom;
			maxzoom = mapconfig.properties.maxzoom;
			initzoom = mapconfig.properties.initzoom;
			
			var regionadmin = L.geoJson(null, {
				style: function(feature){
					return {
						color: "#000000",
						weight: 3,
						fill: false,
						opacity: 1,
						clickable: false
					};
				}
			});
			
			if (document.body.clientWidth <= 767) {
				isCollapsed = true;
			} else {
				isCollapsed = false;
			}
			
			fetch('./dataservices/area.json')
			.then(function(polygonadmin){
				return polygonadmin.json();
			})
			.then(function(admindata){
				regionadmin.addData(admindata);
			})
			.catch(function(errorkab){
				console.log(errorkab);
			});
			
			var southWest = L.latLng(parseFloat(bboxminx), parseFloat(bboxminy)),
					northEast = L.latLng(parseFloat(bboxmaxx), parseFloat(bboxmaxy)),
					maxBoundingBox = L.latLngBounds(southWest, northEast);
					
			googleSatellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
				maxBounds: maxBoundingBox,
				minZoom: minzoom,
				maxZoom: maxzoom,
				subdomains:['mt0','mt1','mt2','mt3'],
				attribution: 'Layanan <strong>Google Satellite</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
			});
			googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
				maxBounds: maxBoundingBox,
				minZoom: minzoom,
				maxZoom: maxzoom,
				subdomains:['mt0','mt1','mt2','mt3'],
				attribution: 'Layanan <strong>Google Streets</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
			});
			googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
				maxBounds: maxBoundingBox,
				minZoom: minzoom,
				maxZoom: maxzoom,
				subdomains:['mt0','mt1','mt2','mt3'],
				attribution: 'Layanan <strong>Google Hybrid</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
			});
			googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
				maxBounds: maxBoundingBox,
				minZoom: minzoom,
				maxZoom: maxzoom,
				subdomains:['mt0','mt1','mt2','mt3'],
				attribution: 'Layanan <strong>Google Terrain</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
			});

			openStreetMaps = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				minZoom: minzoom,
				maxZoom: maxzoom,
				attribution: 'Map Data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.'
			});
			
			openTopoMap = new L.TileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
				minZoom: minzoom, 
				maxZoom: maxzoom, 
				attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
			});
			
			var markerClusters = new L.MarkerClusterGroup({
				spiderfyOnMaxZoom: true,
				showCoverageOnHover: false,
				zoomToBoundsOnClick: true,
				disableClusteringAtZoom: 16
			}),
			_groupPoints_1001 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_1002 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_1003 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_1004 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_2001 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_2002 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_2003 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_2004 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_2005 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_2006 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_2007 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_2008 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_2009 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_2010 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_2011 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_2012 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_2013 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_3001 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_3002 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_3003 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_3004 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_3005 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_4002 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_4003 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_4004 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_4005 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_4006 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_4007 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_4008 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_4009 = L.featureGroup.subGroup(markerClusters), 
			_groupPoints_5001 = L.featureGroup.subGroup(markerClusters);
			
			map = L.map("map", {
				zoom: initzoom,
				center: [parseFloat(centroidy), parseFloat(centroidx)],
				layers: [
					googleHybrid, 
					markerClusters, 
					_groupPoints_1001, _groupPoints_1002, _groupPoints_1003, _groupPoints_1004, 
					_groupPoints_2001, _groupPoints_2002, _groupPoints_2003, _groupPoints_2004, _groupPoints_2005, _groupPoints_2006, _groupPoints_2007, _groupPoints_2008, _groupPoints_2009, _groupPoints_2010, _groupPoints_2011, _groupPoints_2012, _groupPoints_2013, 
					_groupPoints_3001, _groupPoints_3002, _groupPoints_3003, _groupPoints_3004, _groupPoints_3005, 
					_groupPoints_4002, _groupPoints_4003, _groupPoints_4004, _groupPoints_4005, _groupPoints_4006, _groupPoints_4007, _groupPoints_4008, _groupPoints_4009, 
					_groupPoints_5001
				],
				minZoom: minzoom,
				maxZoom: maxzoom,
				zoomControl: false
			});
			
			map.setMaxBounds([[parseFloat(bboxminy), parseFloat(bboxminx)], [parseFloat(bboxmaxy), parseFloat(bboxmaxx)]]);

			var zoomControl = L.control.zoom({
				position: "topleft"
			}).addTo(map);
			
			var loadingControl = L.Control.loading({
				zoomControl: zoomControl,
				spinjs: true
			}).addTo(map);
			
			fetch('./dataservices/data.json')
			.then(function(pointdata){
				return pointdata.json();
			})
			.then(function(geojsonpoints){
				
				var _1001Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_1002Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_1003Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_1004Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_2001Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_2002Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_2003Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_2004Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_2005Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_2006Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_2007Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_2008Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_2009Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_2010Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_2011Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_2012Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_2013Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_3001Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_3002Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_3003Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_3004Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_3005Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_4002Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_4003Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_4004Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_4005Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_4006Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_4007Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_4008Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_4009Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				}), 
				_5001Points = L.geoJson(null, {
					pointToLayer: function (feature, latlng) {
						return L.marker(latlng, {icon: circlepoint});
					},
					onEachFeature: function(feature, layer){
						if (feature.properties) {
							var content = "" +
								"<div class='container'><div class='row'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><table class='table table-striped table-bordered table-condensed' style='width:100%;'>" +
									"<tr><th>Date</th><td>" + feature.properties.date + "</td></tr>" +
									"<tr><th>Context</th><td>" + feature.properties.context + "</td></tr>" +
									"<tr><th>Picture</th><td><img id='rellocusimg_"+ feature.properties.id +"' src='./img/image.jpg' width='75' height='75' alt='" + feature.properties.id + "' class='thumbnailx'/></td></tr>" +
								"</table></div></div></div>" +
								"";
							layer.on({
								click: function (e) {
									$("#feature-title").html('Object Info');
									$("#feature-info").html(content);
									$("#featureModal").modal("show");
								}
							});
						}
					}
				});
				
				$("#featureModal").on('shown.bs.modal', function(){
					$(".thumbnailx").on('click', function(evt){
						evt.stopImmediatePropagation();
						var imgToPopOut = $(this).attr('id');
						var imgSrcToPop = $(this).attr('src');
						var imgCaptionX = $(this).attr('alt');
						$("#dataPropModal").removeClass().addClass('dataPropertyModalShown');
						$("#imgtoshow").attr('src', imgSrcToPop);
						$("#dataPropertyCaption").html(imgCaptionX);
						$(".dataPropertyClose").on('click', function(){
							$("#dataPropModal").removeClass().addClass('dataPropertyModal');
						});
						return false;
					});
				});
				
				/* +-+-+-+-+-+-+-+-+-+-+-+-+ */
				var baseTree = [
					{
						label: 'Basemaps',
						children: [
							{ label: 'Google', layer: null},
							{ label: 'Google Satellite', layer: googleSatellite, name: 'Google Satellite'},
							{ label: 'Google Hybrid', layer: googleHybrid, name: 'Google Hybrid'},
							{ label: 'Google Streets', layer: googleStreets, name: 'Google Streets'},
							{ label: 'Google Terrain', layer: googleTerrain, name: 'Google Terrain'},
							{ label: 'OpenStreetMap', layer: null},
							{ label: 'OpenStreetMap', layer: openStreetMaps, name: 'OpenStreetMap'},
							{ label: 'OpenTopoMap', layer: openTopoMap, name: 'OpenTopoMap'},
						]
					}
				];

				var overlayTree = [
					{
						label: 'Administrative Boundary',
						children: [
							{ label: 'Class 1 Region', layer: regionadmin}
						]
					},
					{label: '<div class="leaflet-control-layers-separator"></div>'},
					{
						label: 'Category I',
						children: [
							{ label: 'Code 1001', layer: _groupPoints_1001 },
							{ label: 'Code 1002', layer: _groupPoints_1002 },
							{ label: 'Code 1003', layer: _groupPoints_1003 },
							{ label: 'Code 1004', layer: _groupPoints_1004 }
						]
					},
					{
						label: 'Category II',
						children: [
							{ label: 'Code 2001', layer: _groupPoints_2001 },
							{ label: 'Code 2002', layer: _groupPoints_2002 },
							{ label: 'Code 2003', layer: _groupPoints_2003 },
							{ label: 'Code 2004', layer: _groupPoints_2004 },
							{ label: 'Code 2005', layer: _groupPoints_2005 },
							{ label: 'Code 2006', layer: _groupPoints_2006 },
							{ label: 'Code 2007', layer: _groupPoints_2007 },
							{ label: 'Code 2008', layer: _groupPoints_2008 },
							{ label: 'Code 2009', layer: _groupPoints_2009 },
							{ label: 'Code 2010', layer: _groupPoints_2010 },
							{ label: 'Code 2011', layer: _groupPoints_2011 },
							{ label: 'Code 2012', layer: _groupPoints_2012 },
							{ label: 'Code 2013', layer: _groupPoints_2013 }
						]
					},
					{
						label: 'Category III',
						children: [
							{ label: 'Code 3001', layer: _groupPoints_3001 },
							{ label: 'Code 3002', layer: _groupPoints_3002 },
							{ label: 'Code 3003', layer: _groupPoints_3003 },
							{ label: 'Code 3004', layer: _groupPoints_3004 },
							{ label: 'Code 3005', layer: _groupPoints_3005 }
						]
					},
					{
						label: 'Category IV',
						children: [
							{ label: 'Code 4002', layer: _groupPoints_4002 },
							{ label: 'Code 4003', layer: _groupPoints_4003 },
							{ label: 'Code 4004', layer: _groupPoints_4004 },
							{ label: 'Code 4005', layer: _groupPoints_4005 },
							{ label: 'Code 4006', layer: _groupPoints_4006 },
							{ label: 'Code 4007', layer: _groupPoints_4007 },
							{ label: 'Code 4008', layer: _groupPoints_4008 },
							{ label: 'Code 4009', layer: _groupPoints_4009 }
						]
					},
					{
						label: 'Category V',
						children: [
							{ label: 'Code 5001', layer: _groupPoints_5001 }
						]
					}
				]
				
				L.control.layers.tree(baseTree, overlayTree, {
					collapsed: isCollapsed
				}).addTo(map).collapseTree().expandSelected().collapseTree(true);
				/* +-+-+-+-+-+-+-+-+-+-+-+-+ */
				
				var rawpoints = geojsonpoints.features;
				
				var _array_features_1001	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 1001;});
				var _array_features_1002	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 1002;});
				var _array_features_1003	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 1003;});
				var _array_features_1004	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 1004;});
				var _array_features_2001	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 2001;});
				var _array_features_2002	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 2002;});
				var _array_features_2003	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 2003;});
				var _array_features_2004	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 2004;});
				var _array_features_2005	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 2005;});
				var _array_features_2006	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 2006;});
				var _array_features_2007	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 2007;});
				var _array_features_2008	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 2008;});
				var _array_features_2009	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 2009;});
				var _array_features_2010	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 2010;});
				var _array_features_2011	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 2011;});
				var _array_features_2012	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 2012;});
				var _array_features_2013	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 2013;});
				var _array_features_3001	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 3001;});
				var _array_features_3002	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 3002;});
				var _array_features_3003	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 3003;});
				var _array_features_3004	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 3004;});
				var _array_features_3005	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 3005;});
				var _array_features_4002	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 4002;});
				var _array_features_4003	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 4003;});
				var _array_features_4004	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 4004;});
				var _array_features_4005	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 4005;});
				var _array_features_4006	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 4006;});
				var _array_features_4007	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 4007;});
				var _array_features_4008	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 4008;});
				var _array_features_4009	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 4009;});
				var _array_features_5001	= rawpoints.filter(function (data) {var prop = data.properties; return prop.context == 5001 || prop.context == 5000;});
				
				_1001Points.addData(_array_features_1001);
				_groupPoints_1001.addLayer(_1001Points);
				
				_1002Points.addData(_array_features_1002);
				_groupPoints_1002.addLayer(_1002Points);
				
				_1003Points.addData(_array_features_1003);
				_groupPoints_1003.addLayer(_1003Points);
				
				_1004Points.addData(_array_features_1004);
				_groupPoints_1004.addLayer(_1004Points);
				
				_2001Points.addData(_array_features_2001);
				_groupPoints_2001.addLayer(_2001Points);
				
				_2002Points.addData(_array_features_2002);
				_groupPoints_2002.addLayer(_2002Points);
				
				_2003Points.addData(_array_features_2003);
				_groupPoints_2003.addLayer(_2003Points);
				
				_2004Points.addData(_array_features_2004);
				_groupPoints_2004.addLayer(_2004Points);
				
				_2005Points.addData(_array_features_2005);
				_groupPoints_2005.addLayer(_2005Points);
				
				_2006Points.addData(_array_features_2006);
				_groupPoints_2006.addLayer(_2006Points);
				
				_2007Points.addData(_array_features_2007);
				_groupPoints_2007.addLayer(_2007Points);
				
				_2008Points.addData(_array_features_2008);
				_groupPoints_2008.addLayer(_2008Points);
				
				_2009Points.addData(_array_features_2009);
				_groupPoints_2009.addLayer(_2009Points);
				
				_2010Points.addData(_array_features_2010);
				_groupPoints_2010.addLayer(_2010Points);
				
				_2011Points.addData(_array_features_2011);
				_groupPoints_2011.addLayer(_2011Points);
				
				_2012Points.addData(_array_features_2012);
				_groupPoints_2012.addLayer(_2012Points);
				
				_2013Points.addData(_array_features_2013);
				_groupPoints_2013.addLayer(_2013Points);
				
				_3001Points.addData(_array_features_3001);
				_groupPoints_3001.addLayer(_3001Points);
				
				_3002Points.addData(_array_features_3002);
				_groupPoints_3002.addLayer(_3002Points);
				
				_3003Points.addData(_array_features_3003);
				_groupPoints_3003.addLayer(_3003Points);
				
				_3004Points.addData(_array_features_3004);
				_groupPoints_3004.addLayer(_3004Points);
				
				_3005Points.addData(_array_features_3005);
				_groupPoints_3005.addLayer(_3005Points);
				
				_4002Points.addData(_array_features_4002);
				_groupPoints_4002.addLayer(_4002Points);
				
				_4003Points.addData(_array_features_4003);
				_groupPoints_4003.addLayer(_4003Points);
				
				_4004Points.addData(_array_features_4004);
				_groupPoints_4004.addLayer(_4004Points);
				
				_4005Points.addData(_array_features_4005);
				_groupPoints_4005.addLayer(_4005Points);
				
				_4006Points.addData(_array_features_4006);
				_groupPoints_4006.addLayer(_4006Points);
				
				_4007Points.addData(_array_features_4007);
				_groupPoints_4007.addLayer(_4007Points);
				
				_4008Points.addData(_array_features_4008);
				_groupPoints_4008.addLayer(_4008Points);
				
				_4009Points.addData(_array_features_4009);
				_groupPoints_4009.addLayer(_4009Points);
				
				_5001Points.addData(_array_features_5001);
				_groupPoints_5001.addLayer(_5001Points);
				
			});
			/* ===================================== */
			map.on("overlayadd", function(e) {
				/* still do nothing */
			});

			map.on("overlayremove", function(e) {
				/* still do nothing */
			});
		})
		.catch(function(errorconfig){
			console.log(errorconfig);
		});
	}
};
