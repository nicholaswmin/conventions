import { styleText } from 'node:util'

const onError = async err => {
  // @TODO no idea what this is, copied from Github Docs, 
  // whats `findInCache` ?
  //
  // if (err.status === 304)
    // return findInCache(err.response.headers.etag)
    
  const { response } = err

  console.warn(
    styleText('red', '- API:'),
    `${options.method} ${options.url}: ${response.status}`,
    styleText('yellow', response.data?.message || '')
  )

  if (response?.data?.errs)
    response.data.errs.forEach(console.log.bind(console))

  throw err
}

const onResponse = async ({ status }, { method, url }) => {
  console.info(styleText('green', '- API:'), `${method} ${url}: ${status}`)
  console.log(' ') // spacer
}

export { onError, onResponse }
