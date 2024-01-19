export default class TweetService {
  constructor(http, socket) {
    this.http   = http  ;
    this.socket = socket;
  }

  // SELECT
  async getTweets(username) {
    const query = username ? `?username=${username}` : '';
    
    const data = this.http.fetch(`/tweets${query}`, {
      method : 'GET',
      //headers: this.getHeaders(),
    });
    //console.log('data', data);

    return data;
  }

  // INSERT
  async postTweet(text) {
    return this.http.fetch(`/tweets`, {
      method : 'POST',
      //headers: this.getHeaders(),
      body   : JSON.stringify({ text, username: 'ellie', name: 'Ellie'}),
    });
  }

  // UPDATE
  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method : 'PUT',
      //headers: this.getHeaders(),
      body   : JSON.stringify({ text }),
    })
  }

  // DELETE
  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method : 'DELETE',
      //headers: this.getHeaders(),
    });
  }

  // getHeaders() {
  //   const token = localStorage.getItem('token');
  //   return {
  //     Authorization: `Bearer ${token}`,
  //   };
  // }

  onSync(callback) {
    return this.socket.onSync('tweets', callback);
  }
}
