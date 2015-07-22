/**
 * VPM-Config
 * @author gavinning
 * @homepage http://github.com/gavinning/vpm-config
 */

var is = require('./is');
var extend = require('./extend');
var __config = {};


/**
 * 单项配置设置，覆盖模式，推荐只用于单项配置
 * @param   {String} key   属性
 * @param   {[type]} value 属性值
 * @example config.set('dir.install', 'packages');
 */
exports.set = function(key, value){

    // 获取配置文件原始数据
    if(key === 'config'){

        // 当做模块路径处理
        if(is.string(value)){
            __config = require(value)
        }

        // 当做配置文件处理
        if(is.plainObject(value)){
            __config = value;
        }

        return this;
    }

    try{
        eval('__config.' + key + ' = value')
    }catch(e){}

    return this;
}

/**
 * 获取配置
 * @param   {String} key 属性
 * @return  {[type]}     属性值
 * @example config.get('dir.install'); // => packages
 */
exports.get = function(key){
    if(!key || key === 'config'){
        return __config;
    }

    try{
        return eval('__config.' + key)
    }catch(e){}
}

/**
 * 多项配置设置，合并模式，推荐使用多项配置
 * @param   {[String]} key [description]
 * @param   {type}     obj [description]
 * @example config.merge({dir: {install: 'packages'}});
 * @example config.merge('dir', {install: 'packages'});
 * @example config.merge('dir.install', 'packages');
 */
exports.merge = function(key, obj){
    var tmp = {};

    // 检查key是否存在
    if(typeof key !== 'string'){
        obj = key;
        key = null;
    }

    try{
        // 扩展到指定的key
        if(key){
            extend(true, tmp, __config);
            eval('tmp.' + key + ' = obj');
            extend(true, __config, tmp);
        }

        // 扩展配置本身
        else {
            extend(true, __config, obj);
        }

    }catch(e){}
}
