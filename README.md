# Node to GemfireFire Sample App

It's "Greeting" app.  Store a greeting with an id, get a greeting by id.

## Usage

The root (home page) has links to push/get a sample value.

Initialize by hitting /api/init-cache

The main endpoint is at /api/greeting

Get a greeting: http://<server>/api/greeting/{id}
Add a greeting: http://<server>/api/greeting/{id}?message={message}
