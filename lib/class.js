/**
 * Aimee-class
 * Author by gavinning
 * Homepage https://github.com/gavinning/aimee-class
 */

var is, extend, Class, create;

is = require('./is');
extend = require('./extend');

Class = function(){
    this.name = 'aimee-class';
    this.version = '1.0.0';
}

/**
 * 以Parent为源创建子类
 * @param  {[Function]} parent [要继承的类]
 * @param  {[object]}   obj    [类的扩展]
 * @return {[Function]}        [返回子类]
 */
create = function(Fn, obj){
    var Aimee = function(){};

    Aimee.fn = Aimee.prototype;
    Aimee.constructor = Class;
    Aimee.create = Aimee.fn.create = create;
    Aimee.extend = Aimee.fn.extend = extend;
    Aimee.aimee = {
        class: true
    };

    // 继承父级原型链
    Aimee.fn.extend(this.prototype);

    // 检查是否存在需要继承的类
    if(is.plainObject(Fn)){
        obj = Fn;
        Fn = null;
    };

    // 继承指定类的原型链
    if(Fn){
        Aimee.fn.extend(Fn.prototype);
    };

    // 扩展子类
    Aimee.fn.extend(obj || {});

    return Aimee;
}

Class.create = create;
module.exports = Class;
