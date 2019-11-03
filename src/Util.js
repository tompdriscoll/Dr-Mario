const Util = {

    inherits(ChildClass, BaseClass) {
      ChildClass.prototype = Object.create(BaseClass.prototype);
      ChildClass.prototype.constructor = ChildClass;
    }

  };
  
  module.exports = Util;
  