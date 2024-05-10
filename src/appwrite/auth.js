import config from '../config/config';
import { Client, Account, ID } from 'appwrite';

export class Authservice {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount(email, password, name) {
    // eslint-disable-next-line no-useless-catch
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.account.get();
    } catch (error) {
      console.log('Appwrite error :: getUser :: error', error);
    }

    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log('Appwrite error :: logout :: error', error);
    }
  }
}

const authService = new Authservice();

export default authService;
