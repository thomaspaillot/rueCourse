define([
	'underscore',
	'backbone'
], function(_, Backbone) {
	var racesModel = Backbone.Model.extend({
		defaults: {
			id: "0",
			name: "Untitled",
			distance: "0",
			checkPoints: [],
			bestScore: "0"
		},

		initialize: function(){

		}

	});

	return racesModel;

});
