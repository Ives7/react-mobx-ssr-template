import { action, observable } from 'mobx';

class CounterStore {
  @observable
  public count = 0;

  @action
  public setCount(val: number): void {
    this.count = val;
  }
}

export { CounterStore };
