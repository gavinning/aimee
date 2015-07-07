var Router, Class;

Class = require('./class');
Router = Class.create();
Router.name = 'aimee-router';
Router.version = '1.0.0';

Router.fn.extend({
	option: function(id, hash){
		require(id).reg(hash);
		return this;
	},

	load: function(id){
		if(Array.isArray(id)){
			id.forEach(function(item){
				require(item);
			});
			return this;
		};

		if(typeof id === 'string'){
			this.load(id.split(' '));
			return this;
		};

		return this;
	},

	action: function(id){
		require(id).init();
	}
})

module.exports = Router;
