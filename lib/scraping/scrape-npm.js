import _ from 'lodash'
import createUrls from './create-urls'
import scrapeMostDependentUponPackagesFromNpm from './scrape-most-dependent-upon'
// this task inspired me to extract this little-scraper into separate package from the code I had in one of my projects
import buildScraper from 'little-scraper'

const scrape = buildScraper({
  //this function will be run for every url passed to scraper
  scrapingFunc: scrapeMostDependentUponPackagesFromNpm,
  concurrency: 10,
  delay: 200,
  retryAttempts: 3
})

async function scrapeNpm(numberOfPackages) {
  const results = await scrape(createUrls({numOfPackagesToGet: numberOfPackages}))
  const sortedResults = _.chain(results)
    .sortBy('position')
    .take(numberOfPackages)
    .value()

  return sortedResults
}


export default scrapeNpm
