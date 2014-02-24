(function(){
  var URL = require("url");

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
    if(!specPathname) return false;
    if(typeof specPathname !== "object") {
      throw new Error("specPathname must be an object");
    }

    var keys = Object.keys(specPathname);
    if(keys.length === 0) return true;

    for(var key in specPathname){
      if(urlPathname === key) return true; 
    }
    return false;

  }

  function testQuery(specQuery, urlQuery){
    var isMatch = true;

    if(!specQuery) return true;

    for(var key in specQuery){
      if(urlQuery[key] !== specQuery[key]) {
        isMatch = false;
      }
    }

    return isMatch;
  }

  function testUrl(spec, url){

    if (!spec) spec = {pathname: null, query: null};
    if (!spec.pathname) spec.pathname = null;
    if (!spec.query) spec.query = null;

    if (typeof spec !== "object") {
      throw new Error("'spec' argument must be an object");
    }
    if (!url) {
      throw new Error("'url' argument must be a string or object");
    }

    spec = upconvertSpec(spec);

    if (!spec.query && !spec.pathname) return false;

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

})();