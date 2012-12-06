define([
	'jquery',
	'underscore',
	'backbone',
	'vm',
	'events',
	'text!templates/raceMap.html'
], function($, _, Backbone, Vm, Events, template){
	var RacesView = Backbone.View.extend({
		el: '#content',
		template: _.template(template),
		
		initialize: function() {
			_.bindAll(this, "render");
			_.bindAll(this, "update");
			_.bindAll(this, "updateDistance");
			
			this.mePoint = [{
				geometry: { coordinates: [2.87, 43.6] },
				properties: {
					'id': 0,
					'marker-color': '#000',
					'marker-symbol': 'circle-stroked',
					title: 'Ma position actuelle',
					description: 'Ce marqueur représente ma position actuelle'
				}
			}];
			
			this.startTime = new Date().getTime();
		},
		
		update: function() {
			var elapsedTime = (new Date().getTime() - this.startTime)/1000;
			this.updateTimer(elapsedTime);
		},
		
		updateDistance: function() {
			console.log(this.reportDistanceBetween(this.mePoint[0], this.model.attributes.checkPoints[1]));
		},
		
		updateTimer: function(elapsedTime) {
			var hours = Math.floor(elapsedTime / 3600);
			var minutes = Math.floor((elapsedTime - (hours * 3600)) / 60);
			var seconds = Math.floor(elapsedTime % 60);
			
			$("#timer").html(this.pad(hours) + ":" + this.pad(minutes) + ":" + this.pad(seconds));
		},
		
		pad: function(n) {
			return n < 10 ? '0' + n : n;
		},

		render: function() {
			var that = this;
			$("#main_nav").remove();

			$(this.el).html(this.template({}));

			mapbox.auto('map', 'thomaspaillot.map-uyfk8ixk', function(map) {
				navigator.geolocation.getCurrentPosition(function(position) {
					that.mePoint[0].geometry.coordinates = [position.coords.longitude, position.coords.latitude];
					var meCoord = that.mePoint[0].geometry.coordinates;
					map.centerzoom({lat: meCoord[1], lon: meCoord[0]}, 13, true);
				});

				// Create and fill a markers layer with checkpoints && current position
				var checkPointsLayer = mapbox.markers.layer().features(that.model.attributes.checkPoints);
				var meLayer = mapbox.markers.layer().features(that.mePoint).key(function(f) { return f.properties.id; });

				// Add the 2 markers layer
				mapbox.markers.interaction(checkPointsLayer);
				mapbox.markers.interaction(meLayer);
				map.addLayer(checkPointsLayer);
				map.addLayer(meLayer);
				
				// Update the current location
				navigator.geolocation.watchPosition(function(position) {
					that.mePoint[0].geometry.coordinates = [position.coords.longitude, position.coords.latitude];
					meLayer.features(that.mePoint);
				});
			});
			
			var timer = setInterval(this.update, 1000);
			var distanceTimer = setInterval(this.updateDistance, 4000);
		},
		
		distanceBetween: function (fromCoor, toCoor) {
			var R = 6371000; // Earth radius in meters
			var dLat = (toCoor.lat-fromCoor.lat) * Math.PI / 180;
			var dLon = (toCoor.lon-fromCoor.lon) * Math.PI / 180;
			var lat1 = fromCoor.lat * Math.PI / 180;
			var lat2 = toCoor.lat * Math.PI / 180;

			var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			var d = R * c;
			
			return d;
		},

		reportDistanceBetween: function (fromPoint, toPoint) {
			return this.distanceBetween(
				{lat: fromPoint.geometry.coordinates[1], lon: fromPoint.geometry.coordinates[0]},
				{lat: toPoint.geometry.coordinates[1],   lon: toPoint.geometry.coordinates[0]}
			);
		}
		
	});

	return RacesView;
});
