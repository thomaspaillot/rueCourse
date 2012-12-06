define([
	'jquery',
	'underscore',
	'backbone',
	'models/races'
], function($, _, Backbone, racesModel){
	var racesCollection = Backbone.Collection.extend({
		model: racesModel,
		url: 'data/data.json',
		
		initialize: function() {
			//console.log("data: ");
			//console.log(data);
		}
	});

	return racesCollection;
	
});
