import axios      from 'axios'      ;
import axiosRetry from 'axios-retry';


export default class HttpClient {
  constructor(baseURL, authErrorEventBus, getCsrfToken) {
    this.authErrorEventBus = authErrorEventBus;
    this.getCsrfToken      = getCsrfToken     ;

    this.client = axios.create({
      baseURL: baseURL,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    axiosRetry(this.client, {
      retries: 5,
      retryDelay: (retry) => {
        const delay  = Math.pow(2, retry) * 100   ; // 100, 200, 400, 800, 1600
        const jitter = delay * 0.1 * Math.random(); // 10, 20, .... 160
        return delay + jitter;
      },
      retryCondition: (err) => err.response.status === 429 || axiosRetry.isNetworkOrIdempotentRequestError(err),
    });
  }

  async fetch(url, options) {
    const { body, method, headers } = options;

    const req = {
      url    : url   ,
      method : method,
      headers: {
        ...headers                               ,
        'dwitter_csrf-token': this.getCsrfToken(),
      },
      data: body,
    };

    try {
      const res = await this.client(req);
      return res.data;
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        const msg  = data && data.message ? data.message : 'Something went wrong! 🤪';

        throw new Error(msg);
      }

      throw new Error('Connection Error');
    }
  }
}