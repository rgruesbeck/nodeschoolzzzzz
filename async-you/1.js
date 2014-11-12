var fs = require('fs');
var http = require('http');
var async = require('async');
var path = process.argv[2];

async.waterfall([
  function(cb){
    fs.readFile(path, function(err, data){
      cb(null, data.toString());
    })
  },
  function(url, cb){
    var body = '';
    http.get(url, function(res){
      res.on('data', function(chunk){
        body += chunk.toString();
      })
      res.on('end', function(){
        cb(null, body);
      })
    }).on('error', function(err){
      cb(err)
    });
  }
], function(err, result){
  console.log(result);
});

