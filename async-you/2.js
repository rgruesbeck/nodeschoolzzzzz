var async = require('async');
var http = require('http');

async.series({
  requestOne: function(done){
    var body = '';
    http.get(process.argv[2].toString(), function(res){
      res.on('data', function(chunk){
        body += chunk.toString();
      });
      res.on('end', function(){
        done(null, body);
      });
    }).on('error', function(err){
      done(err);
    });
  },
  requestTwo: function(done){
    var body = '';
    http.get(process.argv[3].toString(), function(res){
      res.on('data', function(chunk){
        body += chunk.toString();
      });
      res.on('end', function(){
        done(null, body);
      })
    }).on('error', function(err){
      done(err);
    })
  },
}, function(err, result){
  console.log(result);
});
