import { log } from 'utils/console-utils'
import scrapeNpm from 'scraping/scrape-npm'
import downloadPackagesFromNpm from 'downloading/download-packages-from-npm'


const PKG_DIR = './packages/'

async function downloadPackages(numberOfPackages, callback) {
  try {
    const packagesMeta = await scrapeNpm(numberOfPackages)
    await downloadPackagesFromNpm(packagesMeta, PKG_DIR)
  } catch (e) {
    log.error(e)
  } finally {
    callback()
  }
}

// downloadPackages(process.env.COUNT, () => log.info('Done!'))

export default downloadPackages
