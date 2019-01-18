import axios from 'axios'

class BaseService {
  async makeRequest(service = '', path = '', options = {}) {
    options = {
      uri: service + path,
      method: 'GET',
      ...options
    }

    const res = await axios({
      method: options.method,
      url: options.uri,
      data: options.body
    })
    return res
  }
}

export default BaseService