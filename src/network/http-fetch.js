export default class HttpClient {
  constructor(baseURL, authErrorEventBus, getCsrfToken) {
    this.baseURL           = baseURL          ;
    this.authErrorEventBus = authErrorEventBus;
    this.getCsrfToken      = getCsrfToken     ;
  }


  async fetch(url, options) {

    //console.log(`url:[${url}]`);
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        'dwitter_csrf-token': this.getCsrfToken(),
      },
      credentials: 'include',
    });

    let data;
    try {
      data = await res.json();
    } catch(error) {
      console.log('httpClient Error:', error);
      console.error(error);
    }

    //console.log('res.status:', res.status)
    if (res.status > 299 || res.status < 200) {
      const msg   = data && data.message ? data.message : 'Something went wrong! 🤪';
      const error = new Error(msg);

      if (res.status === 401) {
        this.authErrorEventBus.notify(error);
        //return;
      }
      throw error;
    }

    return data;
  }
}