import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any = {};

  setOption(option, value) {
    this.data[option] = value;
  }

  getOption() {
    return this.data;
  }

  constructor() { }
}
