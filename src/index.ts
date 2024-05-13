import * as botpress from '.botpress'
import actions from './actions'
import { handler } from './handler'
import { register } from './setup/register'
import { unregister } from './setup/unregister'

console.info('starting Shopify integration')

class NotImplementedError extends Error {
  constructor() {
    super('Not implemented')
  }
}

export default new botpress.Integration({
  register,
  unregister,
  channels: {},
  actions,
  handler,
})
