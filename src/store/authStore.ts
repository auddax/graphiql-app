import { makeAutoObservable } from 'mobx';
import RootStoreModel from './rootStore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { IUserStore, MessageInfo, SuccessUser, UserDataReg, typeMessage } from '../types';

class AuthStore {
  rootStore: RootStoreModel;
  login: boolean;
  showLoginPage: boolean;
  user: SuccessUser;
  messageInfo: MessageInfo;

  constructor(rootStore: RootStoreModel) {
    this.rootStore = rootStore;
    this.login = false;
    this.showLoginPage = true;
    this.user = {
      email: ' ',
    };
    this.messageInfo = {
      isReady: false,
      type: 'success',
      content: ' ',
    };
    makeAutoObservable(this);
  }

  setLogin(oldUser: IUserStore) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, oldUser.email, oldUser.password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.toggleLogin(true);
        this.user.email = oldUser.email;
        this.newMessage('success', `You are successfully logged, ${oldUser.email}.`);
        return true;
      })
      .catch((error) => {
        console.log('error :>> ', error);
        const errorCode = error.code.split('auth/')[1].split('-').join(' ');
        this.newMessage('error', `Error: ${errorCode[0].toUpperCase() + errorCode.slice(1)}.`);
        return false;
      })
      .finally(() => this.isReady(true));
  }

  newMessage(type: typeMessage, content: string) {
    this.messageInfo.type = type;
    this.messageInfo.content = content;
    setTimeout(() => { this.isReady(false); }, 100);
  }

  isReady(change: boolean) {
    this.messageInfo.isReady = change;
  }

  setUser(newUser: UserDataReg) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.newMessage('success', `You are successfully register, ${newUser.email}, now log in to your account to continue.`);
        // token id email
        return true;
      })
      .catch((error) => {
        const errorCode = error.code.split('auth/')[1].split('-').join(' ');
        this.newMessage('error', `Error: ${errorCode[0].toUpperCase() + errorCode.slice(1)}.`);
        return false;
      })
      .finally(() => this.isReady(true));
  }

  logOutUser() {
    const auth = getAuth();
    return signOut(auth)
      .then(() => {
      this.toggleLogin(false);
      this.user.email = ' ';
      this.newMessage('success', 'You have successfully Log Out.');
      return true;
    })
      .catch((error) => {
        this.newMessage('error', `An error happened this ${error}.`);
        return false;
    })
      .finally(() => this.isReady(true));
  }

  toggleLogin(change: boolean) {
    this.login = change;
  }

  toggleLoginPage(change: boolean) {
    this.showLoginPage = change;
  }

}

export default AuthStore;
