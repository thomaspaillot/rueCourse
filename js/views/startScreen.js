define([
	'jquery',
	'underscore',
	'backbone',
	'vm',
	'events',
	'text!templates/startScreen.html'
], function($, _, Backbone, Vm, Events, template){
	var StartScreenView = Backbone.View.extend({
		el: '#content',

		initialize: function () {
			
		},

		render: function () {
			$(this.el).html(template);
		}
	});

	return StartScreenView;
});
