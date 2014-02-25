(function(){
  var URL = require("url"),
      getKeys = function(obj){
        if(Object.keys) return Object.keys(obj);

        var ownKeys = [];
        if(obj !== Object(obj)) return ownKeys;

        for(var key in obj){
          if(obj.hasOwnProperty(key)) ownKeys.push(key)
        }
        return ownKeys;
      };

  function upconvertSpec(spec){
    var pn = spec.pathname;
    if(pn && typeof pn === "string"){
      var pathObj = {};
      pathObj[pn] = true;
      spec.pathname = pathObj;
    }

    return spec;
  }

  function testPathname(specPathname, urlPathname){
    if(specPathname == null) return false;
    if(specPathname !== Object(specPathname)) {
      throw new Error("specPathname must be an object");
    }

    var keys = getKeys(specPathname);
    if(keys.length === 0) return true;

    for(var key in specPathname){
      if(urlPathname === key) return true; 
    }
    return false;

  }

  function testQuery(specQuery, urlQuery){
    var isMatch = true;

    if(specQuery == null) return true;

    for(var key in specQuery){
      if(urlQuery[key] !== specQuery[key]) {
        isMatch = false;
      }
    }

    return isMatch;
  }

  function testUrl(spec, url){

    if (spec == null) spec = {pathname: null, query: null};
    if (!spec.pathname) spec.pathname = null;
    if (!spec.query) spec.query = null;

    if (spec !== Object(spec)) {
      throw new Error("'spec' argument must be an object");
    }
    if (url == null) {
      throw new Error("'url' argument must be a string or object");
    }

    spec = upconvertSpec(spec);

    if (spec.query == null && spec.pathname == null) return false;

    if(typeof url === "string"){
      url = URL.parse(url, true);
    }

    if(spec.pathname){
      if(!testPathname(spec.pathname, url.pathname)){
        return false;
      } 
    }

    if(!testQuery(spec.query, url.query)) return false;

    return true;
  }

  module.exports = testUrl;
  module.exports.testPathname = testPathname; 

})();