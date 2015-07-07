var aimee = {};
var config = {};

aimee.name = 'aimee';
aimee.version = '1.0.0';
aimee.is = require('./lib/is');
aimee.guid = require('./lib/guid');
aimee.extend = require('./lib/extend');
aimee.Class = require('./lib/class');
aimee.Router = require('./lib/router');

aimee.reg = function(id, src){
	src ?
		this[id] = require(src):
		this[id] = require(id);
	return this;
}

aimee.getConfig = function(){
	return config;
}

// Config配置文件
aimee.config = {
	set: function(key, value){
		config[key] = value;
	},

	get: function(key){
		return config[key];
	}
}


module.exports = aimee;
