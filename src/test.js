const gemfire = require('gemfire');
gemfire.configure('example.xml');
var region = gemfire.getCache().getRegion('test');
region.put("foo", "bar");
region.get("foo", function(error, result) {
 console.log(result);
});

