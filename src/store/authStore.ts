import { makeAutoObservable } from 'mobx';
import RootStoreModel from './rootStore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { IUserStore, MessageInfo, SuccessUser, UserDataReg, typeMessage } from '../types';
import { auth } from '../firebase';

class AuthStore {
  rootStore: RootStoreModel;
  login: boolean;
  showLoginPage: boolean;
  user: SuccessUser;
  messageInfo: MessageInfo;
  loaderIsReady: boolean | undefined;

  constructor(rootStore: RootStoreModel) {
    this.rootStore = rootStore;
    this.login = false;
    this.showLoginPage = true;
    this.user = {
      email: '',
    };
    this.messageInfo = {
      isReady: false,
      type: 'success',
      content: '',
    };
    makeAutoObservable(this);
  }

  setLogin(oldUser: IUserStore) {
    return signInWithEmailAndPassword(auth, oldUser.email, oldUser.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        this.toggleLogin(true);
        this.user = { email: oldUser.email }
        return true;
      })
      .catch((error) => {
        const errorCode = error.code.split('auth/')[1].split('-').join(' ');
        this.newMessage('error', `Error: ${errorCode[0].toUpperCase() + errorCode.slice(1)}.`);
        return false;
      })
      .finally(() => this.isReady(true));
  }

  setUser(newUser: UserDataReg) {
    return createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then((userCredential) => {
        this.toggleLogin(true);
        this.user = { email: newUser.email }
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
    return signOut(auth)
      .then(() => {
      this.toggleLogin(false);
      this.user.email = '';
      return true;
    })
      .catch((error) => {
        this.newMessage('error', `An error happened this ${error}.`);
        return false;
    })
      .finally(() => this.isReady(true));
  }

  toggleLoader(change: boolean) {
    this.loaderIsReady = change;
  }

  newMessage(type: typeMessage, content: string) {
    this.messageInfo.type = type;
    this.messageInfo.content = content;
    setTimeout(() => { this.isReady(false); }, 100);
  }

  isReady(change: boolean) {
    this.messageInfo.isReady = change;
  }

  toggleLogin(change: boolean) {
    this.login = change;
  }

  toggleLoginPage(change: boolean) {
    this.showLoginPage = change;
  }

}

export default AuthStore;
