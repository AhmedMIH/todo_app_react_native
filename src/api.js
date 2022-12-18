import {getToken} from './common/commonFunction';

export default {
  serverUrl: 'https://dbe5-41-42-73-104.ngrok.io',

  handleErrors(err, params) {
    console.log(err, params);
  },

  async login(params) {
    return fetch(`${this.serverUrl}/login`, {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(params),
    })
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(err => {
        this.handleErrors(err, params);
      });
  },

  async register(params) {
    return fetch(`${this.serverUrl}/register`, {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(params),
    })
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(err => {
        this.handleErrors(err, params);
      });
  },

  async changePassword(params) {
    const token = await getToken();
    return fetch(`${this.serverUrl}/chanePassword`, {
      method: 'put',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
      body: JSON.stringify(params),
    })
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(err => {
        this.handleErrors(err, params);
      });
  },

  async getTasks(params) {
    const token = await getToken();
    return fetch(`${this.serverUrl}/todos`, {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    })
      .then(response => {
        console.log('response', response);
        return response;
      })
      .catch(err => {
        this.handleErrors(err, params);
      });
  },

  async addTask(params) {
    const token = await getToken();
    return fetch(`${this.serverUrl}/add`, {
      method: 'post',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(params),
    })
      .then(response => {
        console.log('response', response);
        return response;
      })
      .catch(err => {
        this.handleErrors(err, params);
      });
  },

  async editTasks(params, id) {
    const token = await getToken();
    return fetch(`${this.serverUrl}/edit?id=${id}`, {
      method: 'put',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(params),
    })
      .then(response => {
        console.log('response', response);
        return response;
      })
      .catch(err => {
        this.handleErrors(err, params);
      });
  },

  async deleteTask(id) {
    const token = await getToken();
    return fetch(`${this.serverUrl}/delete?id=${id}`, {
      method: 'delete',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
    })
      .then(response => {
        console.log('response', response);
        return response;
      })
      .catch(err => {
        this.handleErrors(err, params);
      });
  },
};
