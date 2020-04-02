import { TodoStore } from './todo.store';
import { CounterStore } from './counter.store';
import { MobxStore } from '../decorators/mobx-store';

export class RootStore {
  @MobxStore()
  public todoStore: TodoStore = new TodoStore();
  @MobxStore()
  public counterStore: CounterStore = new CounterStore();
}
