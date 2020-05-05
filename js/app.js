requirejs.config({
	"paths": {
		"underscore": [
			"https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min",
			"./lib/underscore-min"
		],
		"spin": [
			"./lib/spin"
		],
		"jquery": [
			"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min",
			"./lib/jquery"
		],
		"bootstrap": [
			"https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.bundle.min",
			"./lib/bootstrap.bundle.min"
		],
		"datatables": "./lib/datatables/datatables.min",
		"leaflet": [
			"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet",
			"./lib/leaflet"
		],
		"controlloading": "./lib/leaflet-plugins/leaflet-controlloading/Control.Loading",
		"markercluster": "./lib/leaflet-plugins/leaflet-markerclusters/leaflet.markercluster",
		"layercontroltree": "./lib/leaflet-plugins/leaflet-controllayers-tree/L.Control.Layers.Tree",
		"featuresubgroup": "./lib/leaflet-plugins/leaflet-featuregroup-subgroup/leaflet.featuregroup.subgroup",
		"leafletdraw": "./lib/leaflet-plugins/leaflet-draw/leaflet.draw",
		"app": "../js/app"
	},
	"shim": {
		"bootstrap": ["jquery"],
		"datatables": ["jquery"],
		"leaflet": {
			exports: 'L'
		},
		"spin": {
			exports: 'Spinner'
		},
		"controlloading": {
			deps: ["leaflet","spin"]
		},
		"markercluster": {
			deps: ["leaflet"]
		},
		"layercontroltree": {
			deps: ["leaflet"]
		},
		"featuresubgroup": {
			deps: ["leaflet","layercontroltree"]
		},
		"leafletdraw": {
			deps: ["leaflet"]
		},
		"underscore": {
			exports: '_'
		}
	}
});
requirejs(["app/main","app/helpers","app/utils","app/datatables","app/charts","app/maps"]);
