define([
	'jquery',
	'underscore',
	'backbone',
	'vm',
	'events',
	'text!templates/race.html'
], function($, _, Backbone, Vm, Events, template){
	var RacesView = Backbone.View.extend({
		el: '#content',
		template: _.template(template),
		
		initialize: function () {

		},

		render: function () {
			var that = this
			$(this.el).html(this.template({race: this.model.toJSON()}));

			if($('#main_nav').length == 0) {
				require(['views/mainNav'], function (MainNavView) {
					var mainNavView = Vm.create(that, 'MainNavView', MainNavView, {title: "Race"});
					mainNavView.render();
				});
			}
		}
	});

	return RacesView;
});
