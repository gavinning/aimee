var aimee = {};
var config = {};

aimee.name = 'aimee';
aimee.version = '1.0.0';
aimee.is = require('./lib/is');
aimee.guid = require('./lib/guid');
aimee.extend = require('./lib/extend');
aimee.Class = require('./lib/class');
aimee.Router = require('./lib/router');
aimee.config = require('./lib/config');

// 注册全局Widget-app模块
aimee.reg = function(name, id){
    var app, App;
    var pm = require('pm');
    var place = aimee.config.get('app.place');

    if(!id){
        id = name;
    }

    // 检查id是否为Widget-app
    typeof id === 'string' ?
        App = require(id):
        App = id;

    // 全局Widget-app全局唯一，所以返回实例即可
    app = new App;

    // 查找是否已注册
    place[name] ?
        app.init().render(place[name]):
        app.init().appendTo('body');

    // 注册到PM
    pm.app[name] = app;

    return this;
}

// 设置全局config数据模型
aimee.config.set('config', {
    // 当前环境
    env: 'online',

    // 全局app
    app: {
        // 注册全局app的位置信息
        place: {
            header: '#lincoapp-id-header',
            footer: '#lincoapp-id-footer'
        }
    }
})

// 获取全局配置
aimee.getConfig = function(){
    return aimee.config.get();
}

module.exports = aimee;
