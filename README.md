## About The Project
This is a TypeScript rewrite of [CeylonNewsBackend](https://github.com/ipmanlk/CeylonNewsBackend) project. I made this to play around with Deno runtime. 

_**NOTE: This is an experiment and not suitable for production use.**_

## Features 
- News scraping from RSS feeds.
- Flexible API for retrieving news.
- WebSocket support for real-time updates.

## Prerequisites
- Download deno: [https://deno.land](https://deno.land) and install it.
- Install mongodb locally or grab your URI from a place like [Atlas](https://cloud.mongodb.com).

## Configuration
- Rename ``.env.sample`` to ``.env`` and update the mongo URI.

## Usage
### Running the project
- Open terminal / cmd in the project directory.
- Run the following command to start the project.,
```bash
deno run --import-map=import_map.json --allow-net --allow-read --unstable --allow-env src/main.ts
```

### Additional commands

- Run tests
```bash
deno test --import-map=import_map.json --allow-net --allow-read --unstable
```
- Generate tests 
```bash
deno run --import-map=import_map.json --allow-net --allow-write --unstable test_gen/gen_sources_tests.ts
```
