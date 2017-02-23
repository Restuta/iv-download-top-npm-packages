
// glad I've found this module, since official registry specifies that tarbals are archives with exatcly one root
// folder which is "package" for npm, this adds extra complexity with extracting to tmp dir => copying to proper one
// and then removing tmp, this is reflected here https://github.com/kesla/download-package-tarball/blob/master/lib/index.js
import downloadNpmPackage from 'download-npm-package'
import BluebirdPromise from 'bluebird'
import retry from 'utils/retry'
import { log } from 'utils/console-utils'

// more about npm registry http://wiki.commonjs.org/wiki/Packages/Registry
async function downloadPackagesFromNpm(packagesMetadata, dir) {
  const combineNameAndVersion = (name, version) => `${name}@${version}`
  const getPkgNameWithVersion = (packageMeta) => combineNameAndVersion(packageMeta.name, packageMeta.version)

  const dowloadPackage = (name, version) =>
    downloadNpmPackage({
      arg: combineNameAndVersion(name, version),
      dir: dir
    })

  return BluebirdPromise.map(packagesMetadata,
    async function(packageMeta) {
      await retry(() => dowloadPackage(packageMeta.name, packageMeta.version), {
        max: 5,
        backoff: 500,
        operationInfo: `downloading package ${packageMeta.name}`
      })

      log.done(`downloaded ${getPkgNameWithVersion(packageMeta)}`)
      return getPkgNameWithVersion(packageMeta)
    },
    // it's important to limit concurrency since it can easly cause issue on large number of packages
    {concurrency: 30}
  )
}

export default downloadPackagesFromNpm
