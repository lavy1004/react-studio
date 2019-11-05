import { observable, action } from "mobx";
import { autobind } from 'core-decorators';

@autobind
class UserStore {
  @observable userInfo = null;

  @action async getUserInfomation () {
      
  }
}