// Filename: router.js
define([
	'jquery',
	'underscore',
	'backbone',
	'vm'
], function ($, _, Backbone, Vm) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			// Pages
			"/": "startScreen",
			"/options": "showOptions",
			"/races": "showRaces",
			"/races/:id": "showRace",
			"/races/:id/scores": "showRaceScore",
			"/races/:id/start": "startRace",
			
			// Default - catch all
			"*other": "startScreen"
		}
	});

	var initialize = function(options){
		var appView = options.appView;
		var router = new AppRouter(options);
		var racesCollection;
		
		router.on('route:startScreen', function () {
			require(['views/startScreen'], function (StartPage) {
				var startPage = Vm.create(appView, 'StartPage', StartPage);
				startPage.render();
			});
		});
		
		router.on('route:showOptions', function () {
			require(['views/options'], function (OptionsPage) {
				var optionsPage = Vm.create(appView, 'OptionsPage', OptionsPage);
				optionsPage.render();
			});
		});
		
		router.on('route:showRaces', function () {
			require(['views/races', 'collections/races'], function (RacesPage, RacesCollection) {
				racesCollection = new RacesCollection();
				var racesPage = Vm.create(appView, 'RacesPage', RacesPage, {collection: racesCollection});
			});
		});
		
		router.on('route:showRace', function (id) {
			require(['views/race'], function (RacePage) {
				var raceModel = racesCollection.get(id);
				var racePage = Vm.create(appView, 'RacePage', RacePage, {raceId: id, model: raceModel});
				racePage.render();
			});
		});
		
		router.on('route:startRace', function (id) {
			require(['views/raceMap'], function (RaceMapPage) {
				var raceModel = racesCollection.get(id);
				var raceMapPage = Vm.create(appView, 'RaceMapPage', RaceMapPage, {raceId: id, model: raceModel});
				raceMapPage.render();
			});
		});
		
		Backbone.history.start();
	};
	
	return {
		initialize: initialize
	};
});
