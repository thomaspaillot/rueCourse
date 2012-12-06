define([
	'jquery',
	'underscore',
	'backbone',
	'vm',
	'events',
	'text!templates/races.html'
], function($, _, Backbone, Vm, Events, template){
	var RacesView = Backbone.View.extend({
		el: '#content',
		template: _.template(template),
		
		initialize: function () {
			_.bindAll(this, "render");
			
			this.collection.fetch();
			this.collection.bind("reset", this.render);
		},

		render: function () {
			var that = this;
			$(this.el).html(this.template({races: this.collection.toJSON()}));
			
			require(['views/mainNav'], function (MainNavView) {
				var mainNavView = Vm.create(that, 'MainNavView', MainNavView, {title: "Races"});
				mainNavView.render();
			});
		}
	});

	return RacesView;
});
