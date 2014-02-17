# node.js base app

    git clone https://github.com/tphummel/node-app.git new-app-dir
    cd !$
    rm -rf .git
    git init
    git add . -am "inital commit"
    git remote add ...
    git push -u origin master


# {{app}}

[![Build Status](https://travis-ci.org/{{author}}/{{app}}.png)](https://travis-ci.org/{{author}}/{{app}})  
[![NPM](https://nodei.co/npm/{{app}}.png?downloads=true)](https://nodei.co/npm/{{app}}/)

# install

    npm install {{app}}

# test

    npm test

# usage

    var app = require("{{app}}");
    
    app();
