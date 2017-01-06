import Promise from 'bluebird'
import _request from 'request'
import Crud from './'

const request = Promise.promisify(_request)

// Mapping of request types
// key    => will be used as part of the URL
// value  => will be used in the XML
const requestTypes = {
  upsert:     'doUpsertRequest',
  select:     'doSelectRequest',
  selectMany: 'doSelectManyRequest'
}

/**
 * request - Perform a request against
 *
 * @param  {type} requestType description
 * @param  {type} xml         description
 * @return {type}             description
 */
export default function(requestType, xml) {
  const tag = requestTypes[requestType]
  if (!tag) return Promise.reject('Invalid request type')

  const body = `<${tag} xmlns="http://fsws.usit.no/schemas/crud">${xml}</${tag}>`

  return request({
    url: `${Crud.config.url}/${requestType}`,
    method: 'POST',
    auth: {
      username: Crud.config.username,
      password: Crud.config.password
    },
    form: {
      xml: body
    }
  }).then(({statusCode, body}) => {
    if (statusCode === 200) return body // eslint-disable-line
    throw body
  })
}
