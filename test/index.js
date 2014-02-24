var test = require("tape"),
    lib = require(".."),
    url = require("url"),
    urls = [
      "http://localhost:3011/",
      "http://localhost:3011/?id=1212",
      "http://localhost:3011/?id=2525",
      "http://localhost:3011/form?action=&amount=500&firstName=&lastName=&phoneHome=&email=&submit=&sub=123",
      "http://localhost:3011/form?action=&amount=500&firstName=&lastName=&phoneHome=&email=&submit=&sub=456",
      "http://localhost:3011/faq"
    ];

test("empty object criteria does not match", function(t){
  var criteria = {};

  t.notOk(lib(criteria, urls[0]));
});

test("null criteria does not match", function(t){
  var criteria = null;

  t.notOk(lib(criteria, urls[0]));
});

test("truthy non-object does not match", function(t){
  var criteria = "something else",
      result;

  result = lib(criteria, urls[0]);
  t.notOk(result);
});

test("match/miss single path", function(t){
  var criteria = {
    pathname: {
      "/": true
    }
  };

  t.ok(lib(criteria, urls[0]));
  t.notOk(lib(criteria, urls[3]));
});

test("match/miss double path", function(t){
  var criteria = {
    pathname: {
      "/": true,
      "/form": true
    }
  };

  t.ok(lib(criteria, urls[3]));
  t.notOk(lib(criteria, urls[5]));
});

test("match/miss single query", function(t){
  var criteria = {
    query: {
      id: "1212"
    }
  };

  t.ok(lib(criteria, urls[1]));
  t.notOk(lib(criteria, urls[2]));
});

test("match/miss double query", function(t){
  var criteria = {
    query: {
      amount: "500",
      sub: "123"
    }
  };

  t.ok(lib(criteria, urls[3]));
  t.notOk(lib(criteria, urls[4]));
});

test("match/miss single path + single query", function(t){
  var criteria = {
    pathname: {
      "/": true
    },
    query: {
      "id": "2525"
    }
  };

  t.ok(lib(criteria, urls[2]));
  t.notOk(lib(criteria, urls[0]));
});

test("match/miss single path + double query", function(t){
  var criteria = {
    pathname: {
      "/form": true
    },
    query: {
      amount: "500",
      sub: "123"
    }
  };

  t.ok(lib(criteria, urls[3]));
  t.notOk(lib(criteria, urls[4]));
});

test("match/miss double path + single query", function(t){
  var criteria = {
    pathname: {
      "/": true,
      "/faq": true
    },
    query: {
      id: "1212"
    }
  };

  t.ok(lib(criteria, urls[1]));
  t.notOk(lib(criteria, urls[5]));
});

test("match/miss double path + double query", function(t){
  var criteria = {
    pathname: {
      "/form": true,
      "/faq": true
    },
    query: {
      amount: "500",
      sub: "123"
    }
  };

  t.ok(lib(criteria, urls[3]));
  t.notOk(lib(criteria, urls[4]));
});

test("should handle string pathname for legacy compatibility", function(t){
  var criteria = {
    pathname: "/"  
  };

  t.ok(lib(criteria, urls[0]));
  t.notOk(lib(criteria, urls[3]));
});

test("should handle string url or parsed url object", function(t){
  var criteria = {
    pathname: {
      "/": true
    },
    query: {
      id: "2525"
    }
  };

  t.ok(lib(criteria, urls[2]));
  t.notOk(lib(criteria, urls[0]));

  t.ok(lib(criteria, url.parse(urls[2], true)));
  t.notOk(lib(criteria, url.parse(urls[0], true)));
});
