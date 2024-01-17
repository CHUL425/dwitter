export default class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetch(url, options) {

    //console.log(`url:[${url}]`);
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    let data;
    try {
      data = await res.json();
    } catch(error) {
      console.log('httpClient Error:', error);
    }

    //console.log('res.status:', res.status)
    if (res.status > 299 || res.status < 200) {
      const msg = data && data.message ? data.message : 'Something wend Wrong! 👎';
      throw new Error(msg);
    }

    return data;
  }
}