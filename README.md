# url-tag

compare a url string or object to a url pattern spec to find matches. 

[![Build Status](https://travis-ci.org/Interlincx/url-tag.png?branch=master)](https://travis-ci.org/Interlincx/url-tag)  
[![NPM](https://nodei.co/npm/url-tag.png?downloads=true)](https://nodei.co/npm/url-tag/)

## install

    npm install url-tag

## test

    npm test

## usage
    var ut, spec, url, isMatch;

    ut = require("url-tag");

    spec = {
      pathname: {
        "/form-page": true
      },
      query: {
        "appId": "123"
      }
    }

    url = "http://www.domain.com/form-page?appId=123";
    
    isMatch = ut(url, spec);

    // prints "true"
    console.log(isMatch);

## notes
  
`spec.pathname` can have multiple pathname keys. the pathname of the parsed url must match _ANY_ of the supplied keys to be satisfied. currently, the value for the pathname key carries no significance, though it should be truthy.

`spec.query` can have multiple key-value pairs. _ALL_ pairs must be present and equal to be satisfied.

## todo

- allow optional mode in which matching _ANY_ of the supplied query pairs will satisfy the matcher.
