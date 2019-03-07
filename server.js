var Router = require("vertx-web-js/router");
var server = vertx.createHttpServer();

var router = Router.router(vertx);

var objs = [];
objs.push({
  id: 1,
  value: "Teste 1"
});
objs.push({
  id: "str1",
  value: 1
});
objs.push({
  key: "str1",
  val: 1
});
objs.push({
  key: 1,
  val: "str1"
});

function sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
}

router.get("/*").handler(function (ctx) {
  // This handler will be called for "/" requests
  var response = ctx.response();
  response.putHeader("content-type", "application/json");

  var rand = Math.floor(Math.random()*objs.length)
  console.log('get ' + rand + ' ' + rand*100);
  sleep(rand*100, function(){
    // Write to the response and end it
    response.end(
        JSON.stringify( objs[rand] )
    );
  });
});

server.requestHandler(router.accept).listen(8080);
