export default class AuthService {
  constructor(http) {
    this.http = http;
  }

  /**
   * User 등록
   */
  async signup(username, password, name, email, photo) {
    const data = await this.http.fetch('/auth/signup', {
      method: 'POST',
      body  : JSON.stringify({ username, password, name, email, photo }),
    });

    //localStorage.setItem('token', data.token);
    
    return data;
  }

  /**
   * Login
   */
  async login(username, password) {
    const data = await this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    //console.log(`data:[${data.username}], [${data.token}]`);
    //localStorage.setItem('token', data.token);

    return data;
  }

  /**
   * logout
   */
  async logout() {
    //localStorage.clear('token');

    return this.http.fetch('/auth/logout', {
      method: 'POST',
    });
  }

  /**
   * Me
   */
  async me() {
    //const token = localStorage.getItem('token');
    return this.http.fetch('/auth/me', {
      method: 'GET',
      //headers: { Authorization: `Bearer ${token}` },
    });
  }

  /**
   * csrfToken
   */
  async csrfToken() {
    const resp = await this.http.fetch('/auth/csrf-token', {
      method: 'GET',
    });
    return resp.csrfToken;
  }
}
