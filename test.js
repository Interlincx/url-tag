var test = require("tape"),
    lib = require("./"),
    url = require("url"),
    urls = [
      "http://localhost:3011/",
      "http://localhost:3011/?id=1212",
      "http://localhost:3011/?id=2525",
      "http://localhost:3011/form?action=&amount=500&firstName=&lastName=&phoneHome=&email=&submit=&sub=123",
      "http://localhost:3011/form?action=&amount=500&firstName=&lastName=&phoneHome=&email=&submit=&sub=456",
      "http://localhost:3011/faq"
    ];

test("module exports a function", function(t){
  t.equal(typeof lib, "function");
  t.end();
});

test("empty object criteria does not match", function(t){
  var criteria = {};

  t.notOk(lib(criteria, urls[0]), "should miss");
  t.end();
});

test("null criteria does not match", function(t){
  var criteria = null;

  t.notOk(lib(criteria, urls[0]), "should miss");
  t.end();
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

  t.ok(lib(criteria, urls[2]), "should match");
  t.notOk(lib(criteria, urls[0]), "should miss");

  t.ok(lib(criteria, url.parse(urls[2], true)), "should match");
  t.notOk(lib(criteria, url.parse(urls[0], true)), "should miss");
  t.end();
});

test("truthy non-object spec throws error", function(t){
  var criteria = "something else";

  t.throws(function(){
    lib(criteria, urls[0]); 
  }, "throws when you pass a truthy non-object");
  t.end();
});

test("match/miss single path", function(t){
  var criteria = {
    pathname: {
      "/": true
    }
  };

  t.ok(lib(criteria, urls[0]), "should match");
  t.notOk(lib(criteria, urls[3]), "should miss");
  t.end();
});

test("match/miss double path", function(t){
  var criteria = {
    pathname: {
      "/": true,
      "/form": true
    }
  };

  t.ok(lib(criteria, urls[3]), "should miss");
  t.notOk(lib(criteria, urls[5]), "should match");
  t.end();
});

test("match/miss single query", function(t){
  var criteria = {
    query: {
      id: "1212"
    }
  };

  t.ok(lib(criteria, urls[1]), "should match");
  t.notOk(lib(criteria, urls[2]), "should miss");
  t.end();
});

test("match/miss double query", function(t){
  var criteria = {
    query: {
      amount: "500",
      sub: "123"
    }
  };

  t.ok(lib(criteria, urls[3]), "should match");
  t.notOk(lib(criteria, urls[4]), "should miss");
  t.end();
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

  t.ok(lib(criteria, urls[2]), "should match");
  t.notOk(lib(criteria, urls[0]), "should miss");
  t.end();
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

  t.ok(lib(criteria, urls[3]), "should match");
  t.notOk(lib(criteria, urls[4]), "should miss");
  t.end();
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

  t.ok(lib(criteria, urls[1]), "should match");
  t.notOk(lib(criteria, urls[5]), "should miss");
  t.end();
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

  t.ok(lib(criteria, urls[3]), "should match");
  t.notOk(lib(criteria, urls[4]), "should miss");
  t.end();
});

test("should handle string pathname for legacy compatibility", function(t){
  var criteria = {
    pathname: "/"  
  };

  t.ok(lib(criteria, urls[0]), "should match");
  t.notOk(lib(criteria, urls[3]), "should miss");
  t.end();
});


//ss models test

// t.test "model.isPageMatch", (st) ->

//   st.test "should match empty spec", (sst) ->
//     sst.plan 1
//     urlObj = URL.parse "http://domain.com/form", true

//     emptySpec =
//       pathname: null
//       query: null

//     isMatch = PageTags.isPageMatch urlObj, emptySpec
//     sst.equal isMatch, true


//   st.test "should match with path only", (sst) ->
//     sst.plan 1
//     urlObj = URL.parse "http://domain.com/form", true

//     pageSpec =
//       pathname: 
//         "/form": true
//       query: {}

//     isMatch = PageTags.isPageMatch urlObj, pageSpec
//     sst.equal isMatch, true

//   st.test "should miss with path only", (sst) ->
//     sst.plan 1
//     urlObj = URL.parse "http://domain.com/form", true

//     pageSpec =
//       pathname: 
//         "/page3": true
//       query: null

//     isMatch = PageTags.isPageMatch urlObj, pageSpec
//     sst.equal isMatch, false

//   st.test "should match with query only", (sst) ->
//     sst.plan 1
//     urlObj = URL.parse "http://domain.com/?page=form", true

//     pageSpec =
//       pathname: null
//       query:
//         page: "form"

//     isMatch = PageTags.isPageMatch urlObj, pageSpec
//     sst.equal isMatch, true

//   st.test "should miss with query only", (sst) ->
//     sst.plan 1
//     urlObj = URL.parse "http://domain.com/?page=confirm", true

//     pageSpec =
//       pathname: null
//       query:
//         page: "form"

//     isMatch = PageTags.isPageMatch urlObj, pageSpec
//     sst.equal isMatch, false

//   st.test "should match with path and query", (sst) ->
//     sst.plan 1
//     urlObj = URL.parse "http://domain.com/page3?arg=fosho", true

//     pageSpec =
//       pathname: "/page3"
//       query:
//         arg: "fosho"

//     isMatch = PageTags.isPageMatch urlObj, pageSpec
//     sst.equal isMatch, true

//   st.test "should miss with path and query", (sst) ->
//     sst.plan 1
//     urlObj = URL.parse "http://domain.com/page3?arg=fosho", true

//     pageSpec =
//       pathname: "/page4"
//       query:
//         arg: "fosho"

//     isMatch = PageTags.isPageMatch urlObj, pageSpec
//     sst.equal isMatch, false

//   st.test "should match dev example", (sst) ->
//     sst.plan 1
//     urlObj = URL.parse "http://northpayday.com/?id=com_641bdef6-126d-4b68-91ce-af357db26cbd", true

//     pageSpec = JSON.parse "{\"all\":{\"pathname\":{\"/\":true,\"/form\":true},\"query\":null}}"

//     isMatch = PageTags.isPageMatch urlObj, pageSpec
//     sst.equal isMatch, true

//   st.end()




