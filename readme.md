# npmjs.com Scraper

Scrapes [most depended on packages](https://www.npmjs.com/browse/depended) from npm.

## Why Scraping?

Unfortunately npmjs.org only exposes packages as an api needed for NPM tool itself, which follows a spec, but to calculation of most dependent upon packages is a manual work. It would require downloading entire graph of packages and building and index manually. A friend of mine already did this with [npmrank project](https://github.com/anvaka/npmrank). It would take about 30 mins to just download the graph and few more mins to index it.

This makes this project far more complex then just an evening task, so scraping of an existing web-view is a much simpler solution.
