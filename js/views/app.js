define([
	'jquery',
	'underscore',
	'backbone',
	'vm',
	'events',
	'text!templates/layout.html'
], function($, _, Backbone, Vm, Events, template){
	var AppView = Backbone.View.extend({
		el: '#container',

		initialize: function () {
			
		},

		render: function () {
			$(this.el).html(template);
		}
	});

	return AppView;
});
