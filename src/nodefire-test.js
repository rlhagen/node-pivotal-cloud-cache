var gemfire = require('gemfire');
//console.log(gemfire.getOwnPropertyNames());

const configFile = './config/nodefire-config-test.xml';
const regionName = 'nodefire';

var cache;// = gemfire.getCache();
var region;// = cache.getRegion('exampleRegion');


var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){

    switch(line) {
        case "exit":
             console.log("bye bye");
             process.exit();
             break;
        case "configure":
            console.log("Loading configuration file "+configFile);
            gemfire.configure(configFile);
            cache = gemfire.getCache();
            region = cache.getRegion("region1");
            break;
        case "put":
            if (gemfire.connected()) {
                console.log("connected with gemfire cluster"); 
            }
            break;
       case "status":
             if (gemfire.connected()) {
                 console.log("connected with gemfire cluster"); 
             }
             break;
         case "version":    
             console.log("Gemfire version:" + gemfire.gemfireVersion);
             console.log("node-gemfire version:" + gemfire.version);
             break;
    }
});

        // case "put":
        //      console.log("Putting the below 20 entries into exampleRegion:"); 
        //      console.log("===============================");
        //      for(var i = 0; i < 20; i++) {
        //          region.putSync("key" + i, "value" + i);
        //          console.log("Entry=key" + i + ":value" + i);
        //      }
        //      break;
        // case "query":
        //      cache.executeQuery("SELECT DISTINCT * FROM /exampleRegion", {poolName: "myPool"}, function(error, response) {
        //            if(error) { throw error; }
        //            console.log("Query is: SELECT * FROM /exampleRegion, and values are like the below:");
        //            console.log("===============================");  
        //            var results = response.toArray();
        //            response.each(function(results) {
        //                 console.log(results);
        //            });
        //      });
        //      break;
        // case "register":
        //      region.registerAllKeys();
             
        //      region.on("create", function(event) {
        //             console.log("creating event=" + event.key + ":NewValue=" + event.newValue); 
        //      });
        //      region.on("update", function(event) {
        //             console.log("updating event=" + event.key + ":NewValue=" + event.newValue); 
        //      });
        //      console.log("registering on create and update event complete."); 
        //      break;  
        // case "clear":
        //      region.clear(function(error){
        //      if(error) { throw error; }
        //      });
        //      console.log("exampleRegion entries are all cleared.");  
        //      break;
