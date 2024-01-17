export default class AuthService {
  constructor(http) {
    this.http = http;
  }

  /**
   * User 등록
   * @param {*} username 
   * @param {*} password 
   * @param {*} name 
   * @param {*} email 
   * @param {*} photo 
   * @returns 
   */
  async signup(username, password, name, email, photo) {
    const data = await this.http.fetch('/auth/signup', {
      method: 'POST',
      body  : JSON.stringify({ username, password, name, email, photo }),
    });

    localStorage.setItem('token', data.token);
    
    return data;
  }

  /**
   * Login
   * @param {*} username 
   * @param {*} password 
   * @returns 
   */
  async login(username, password) {
    const data = await this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    //console.log(`data:[${data.username}], [${data.token}]`);
    localStorage.setItem('token', data.token);

    return data;
  }

  /**
   * Me
   * @returns 
   */
  async me() {
    const token = localStorage.getItem('token');
    return this.http.fetch('/auth/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async logout() {
    localStorage.clear('token');
  }

}
