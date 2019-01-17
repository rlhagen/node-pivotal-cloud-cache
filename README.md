# A Node GemFire Sample Application for PCF

Reference: https://github.com/charliemblack/gemfire-node-sample

It's a "Greeting" app.  Store a greeting with an id, get a greeting by id.  

# Create Region in PCC via gfsh

`connect --use-http=true --url=https://cloudcache-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx.run.pcfone.io/gemfire/v1 --user=cluster_operator_XXXX --password=XXXXX`
`create region --name=default --type=PARTITION --entry-time-to-live-expiration=3600 --enable-statistics= true`

# Build and Deploy
`npm run build && pushd dist && cf push node-application && popd
`
# Usage

The root (home page) has links to push/get a sample value.   

Initialize by hitting http://server/api/init-gemfireCache

The main endpoint is at http://server/api/greeting

- Get a greeting: http://server/api/greeting/{id}
- Add a greeting: http://server/api/greeting/{id}?message={message}
- Destroy session: http://server/api/session/destroy


## Curl Example

```
curl -X GET 'https://gemfire-node-sample.apps.pcfone.io/api/greeting/foo?message=SomeMessage'  
curl -X GET 'https://gemfire-node-sample.apps.pcfone.io/api/greeting/foo'
curl -X GET 'https://gemfire-node-sample.apps.pcfone.io/api/session/destroy'
```


