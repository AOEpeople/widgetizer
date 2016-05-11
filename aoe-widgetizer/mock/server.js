var express = require('express');
var app     = express();
var fs      = require('fs');
var sprintf = require('sprintf');

function getMock() {
    return fs.readFileSync(__dirname + '/mockdata');
}

function sendJSON(req, res) {
    // the real api does not set this, but we want to test if CORS would work
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    res.send(JSON.parse(getMock()));
}

function sendJSONP(req, res) {
    // the real api also delivers the jsonp as text/javascript, so we mimic this here
    res.setHeader("Content-Type", "text/javascript");

    res.send(sprintf('%s(%s);', req.query.callback, getMock()));
}

app.get('/:id', function (req, res) {
    req.query.callback ?
        sendJSONP(req, res) :
        sendJSON(req, res);
});

module.exports = app;
