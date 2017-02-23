import { log } from 'utils/console-utils'

const retry = (funcToRetry, {max = 10, backoff = 100, operationInfo, retryHookFunc}) => {
  return new Promise((resolve, reject) => {
    const attempt = (attemptNo) => {
      if (attemptNo > 0) {
        log.warn(`${operationInfo} - retrying, attempt ${attemptNo}/${max}`)
      }

      funcToRetry(attemptNo)
        .then(resolve)
        .catch((err) => {
          if (attemptNo >= max) {
            if (max === 0) {
              log.fail(`${operationInfo} – Failed on very first attempt :(`)
            } else {
              log.fail(`${operationInfo} – Failed after ${max} retry attempts :(`)
            }

            return reject(err)
          }
          setTimeout(() => attempt(attemptNo + 1), backoff)
        })
    }
    attempt(0)
  })
}

export default retry
