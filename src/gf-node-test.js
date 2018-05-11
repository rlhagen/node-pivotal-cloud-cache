var express = require('express')
var app = express()

var gemfire = require('gemfire')
gemfire.configure('./config/gf-node-config.xml')
gemfire.connected();
var cache = gemfire.getCache()
var region = cache.getRegion('region1')

app.get('/', function (req, res) {
  res.send("hello, world")
})

app.get('/get', function (req, res) {
  console.log("getting foo")
  var theValue = region.getSync("foo")
  res.send(theValue)
})

app.get('/put', function (req, res) {
  console.log("Putting baz in foo")
  region.put("foo", "baz")
  console.log("Done (putting baz in foo)")
  res.send("Put baz in foo");
})

app.listen(process.env.PORT || 8080)
