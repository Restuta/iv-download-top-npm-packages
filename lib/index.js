import { log } from './utils/console-utils'
import cheerio from 'cheerio'
import buildScraper from 'little-scraper'
import _ from 'lodash'

const createUrls = ({numOfPackagesToGet}) => {
  const PAGE_SIZE = 36 // as of now every page lists 36 packages
  const createUrl = offset => `https://www.npmjs.com/browse/depended?offset=${offset}`
  const numberOfUrlsNeeded = Math.ceil(numOfPackagesToGet / PAGE_SIZE)
  // generates array like [0, 36, 72...]
  const offsets = Array(numberOfUrlsNeeded).fill().map((_, i) => i * PAGE_SIZE)

  return offsets.map((offset, i) => ({
    url: createUrl(offset),
    context: {pageNumber: i}
  }))
}

const scrapeMostDependentUponPackagesFromNpm = ({response, urlWithContext}) => {
  const $ = cheerio.load(response.body)

  const $results = $('.package-widget .package-details .name')

  const values = $results
    .toArray()
    .map((elem, i) => ({
      name: $(elem).text(),
      position: i // position on the screen to use for sorting
    }))

  log.done(urlWithContext.url)
  // log.json(values)
  return values
}

const scrape = buildScraper({
  scrapingFunc: scrapeMostDependentUponPackagesFromNpm,
  concurrency: 5,
  delay: 200
})

async function runScraping() {
  const results = await scrape(createUrls({numOfPackagesToGet: 10}))
  log.json(results)
}

runScraping()


function downloadPackages(count, callback) {
}

export default downloadPackages
