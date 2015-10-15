var Router, Class, pm;

pm = require('pm');
Class = require('./class');
Router = Class.create();
Router.name = 'aimee-router';
Router.version = '1.0.0';

Router.fn.extend({
    // 页面路由注册
	option: function(id, hash){
		require(id).reg(hash);
		return this;
	},

    // 注册全局模块，已弃用
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

    // 执行 pm.init()
	action: function(id){
        var pages = [];
        pm.pageArray.forEach(function(item){
            pages.push(['<gem id="lincoapp-page-', item.name, '"></gem>'].join(''))
        })
        $('.pages').html(pages.join('\n'));
        pm.init();
	}
})

module.exports = Router;
