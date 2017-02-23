import { log } from 'utils/console-utils'
import cheerio from 'cheerio'

const scrapeMostDependentUponPackagesFromNpm = ({response, urlWithContext}) => {
  const $ = cheerio.load(response.body)
  const $packages = $('.package-widget .package-details')

  const values = $packages
    //cheerio's map, not to confuse it with JS Array.map
    .toArray()
    .map((elem, index) => ({
      name: $(elem).find('.name').text(),
      version: $(elem).find('.version').text(),
      // position on the screen to use for sorting
      position: (index) + urlWithContext.context.pageNumber,
      url: urlWithContext.url
    }))

  log.done(`scraped ${urlWithContext.url}`)
  return values
}


export default scrapeMostDependentUponPackagesFromNpm
