'use strict'

class Index {
  get rules () {
    return {
      pass: 'required'
    }
  }

  get messages () {
    return {
      'pass.required': 'You must provide a password'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = Index
