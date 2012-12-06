define([
	'jquery',
	'underscore',
	'backbone',
	'vm',
	'events',
	'text!templates/mainNav.html'
], function($, _, Backbone, Vm, Events, template){
	var MainNavView = Backbone.View.extend({
		tagName: 'nav',
		id: 'main_nav',

		initialize: function () {

		},
		
		events: {
			"click .back" : "navigateBack"
		},

		render: function () {
			$(this.el).html(_.template(template, {title: this.options.title}));
			$("#container").prepend(this.el);
		},

		navigateBack: function() {
			window.history.back();
			this.remove();
		}
	});

	return MainNavView;
});