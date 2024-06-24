import { Injectable } from '@angular/core';
import * as CryptoJS from "crypto-js";

@Injectable({ providedIn: 'root' })
export class SessionStorage {
  private key = 'y5/ap#qSul.ShCUMnfC|';

  constructor() {
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string): string {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }

  public setItem(key: string, value: string): void {
    sessionStorage.setItem(key, this.encrypt(value));
  }

  public getItem(key: string): undefined | string {
    let data = sessionStorage.getItem(key) || '';
    return data === '' ? 'ru-ru' : this.decrypt(data);
  }

  public removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
}
