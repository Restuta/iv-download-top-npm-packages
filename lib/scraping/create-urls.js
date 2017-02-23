// creates minimal number of urls required to get give number of packages
const createUrls = ({numOfPackagesToGet}) => {
  const PAGE_SIZE = 36 // as of Feb 2017 every npm page lists 36 packages
  const createUrl = offset => `https://www.npmjs.com/browse/depended?offset=${offset}`
  const numberOfUrlsNeeded = Math.ceil(numOfPackagesToGet / PAGE_SIZE)
  // fancy and functional way to generate array like [0, 36, 72...]
  const offsets = Array(numberOfUrlsNeeded).fill().map((_, i) => i * PAGE_SIZE)

  return offsets.map((offset) => ({
    url: createUrl(offset),
    context: {pageNumber: offset}
  }))
}

export default createUrls
