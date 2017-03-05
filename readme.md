# npmjs.com Scraper

Scrapes [most depended on packages](https://www.npmjs.com/browse/depended) from npm.

## Why Scraping?

Unfortunately npmjs.org only exposes packages as an API needed for NPM tool itself, which [follows a spec](http://wiki.commonjs.org/wiki/Packages/Registry), but to calculation of most dependent upon packages would require soome non-trivial work. It would require downloading the entire graph of packages and building index manually. A friend of mine already did this with [npmrank project](https://github.com/anvaka/npmrank). It would take about 30 mins to just download the graph and few more mins to index it.

This makes this project far more complex then just an evening task, so scraping of an existing web-view is a much simpler solution. I decided
to go down this path.

Task still ended up being much more complex than anticipated and took me about 4-6h to complete and troubleshoot. Below is explanation why.

## Problems with scraping.

Apparently, NPM html pages return results that are non-deterministic. Sometimes refreshing same page that is far off in
a chain like https://www.npmjs.com/browse/depended?offset=6000 results in a different package list (!). This brings a
problem of duplicated packages. Same package may appear 2 or more times on different pages within short period of time of scraping (5-10s for 1000 packages).
It sounds like NPM re-builds index near-realtime, so my theory is that it's eventually consistent and some servers in a chain have not received updated index yet or replicas didn't sync, but who knows.

So I was really bumped when I got file system level errors saying "temp directory is not empty", since I am downloading
a package tarball from official registry and extracting it to a temp directory, because tarball on a root level is within "package" directory as
required by the spec and it would result in the incorrect directory structure. After moving files to a proper directory I am removing temp directory
and then I got occasional errors that suggested that something is writing to the same tmp directory while I am trying to remove it.

Then I figured out that I am getting duplicated packages like about 10-12 for 1000 packages. So the entire task of getting top N most dependent
upon package is impossible to solve reliably with web-scraping and big number of packages. It seems pretty reliable for top 200, but for top 300
it's not uncommon to see 1-2 duplicated package on every run.

So I decided not to solve this problem, since it can't be solved, I used a workaround to get rid of errors, that's why you would see a retry logic there.
De-duping of packages would be a tedious task, since order would have to be updated as well and I have no idea in which way. Say I have a package that is
duplicated in position 10 and 20, which one should I remove? There is no way to figure this out.

Following code can be used to quickly see duplicates:

```
// put inside downloadPackages()
const duplicates = _.filter(
  packagesMeta.map(x => x.name),
  (value, index, iteratee) => _.includes(iteratee, value, index + 1)
)
console.info(duplicates)
```
