// import fetch from 'node-fetch';

const FETCH_TIMEOUT = 60000;

class ApiBase {
  constructor() {
    this.baseUrl = 'http://localhost:3002/home'
  }

  // makeCall = async (path, opts = {}) => {
  //   try {
  //     const res = await fetch(this.baseUrl, path, FETCH_TIMEOUT);
  //     const body = res.body;
  //     if (res.status !== 200) throw Error(body.message);
  //     console.log(JSON.parse(body));
  //     this.setState({ body: JSON.parse(res) })
  //     return body;
  //   } catch (error) {
  //     throw error
  //   }
  // }

  makeCall = async (path) => {
    try {
      let body = [];
      fetch(this.baseUrl + path)
        .then(response => response.json())
        .then(result => { body = result;})
      console.log(body);
      if (body === '') throw Error('Invalid request');
      return body;
    } catch (error) {
      throw error
    }
  }
}

export default ApiBase;