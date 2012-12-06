define([
	'jquery',
	'underscore',
	'backbone',
	'vm',
	'events',
	'text!templates/options.html'
], function($, _, Backbone, Vm, Events, template){
	var OpitonsView = Backbone.View.extend({
		el: '#content',
		
		initialize: function () {
			
		},

		render: function () {
			var that = this;
			$(this.el).html(template);
			
			require(['views/mainNav'], function (MainNavView) {
				var mainNavView = Vm.create(that, 'MainNavView', MainNavView, {title: "Options"});
				mainNavView.render();
			});
		}
	});

	return OpitonsView;
});
