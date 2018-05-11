const gemfire = require('gemfire');
gemfire.configure('config/example.xml');
var region = gemfire.getCache().getRegion('region1');
region.put("foo", "bar");
region.get("foo", function(error, result) {
 console.log(result);
});
