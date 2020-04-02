import { action, extendObservable, observable } from 'mobx';

export enum TodoStatus {
  TODO,
  DOING,
  DONE,
}

export interface Todo {
  name: string;
  status: TodoStatus;
}

class TodoStore {
  constructor(initialStore: Partial<TodoStore> = {}) {
    extendObservable(this, initialStore);
  }

  @observable
  public todoList: Todo[] = [];

  @action.bound
  setTodoList(todoList: Todo[]): void {
    this.todoList = todoList;
  }

  @action.bound
  addTodo(name: string): void {
    this.todoList.push({
      name,
      status: TodoStatus.TODO,
    });
  }

  @action.bound
  doingItem(itemIndex: number): void {
    this.todoList[itemIndex].status = TodoStatus.DOING;
  }

  @action.bound
  finishTodo(itemIndex: number): void {
    this.todoList[itemIndex].status = TodoStatus.DONE;
  }

  @action.bound
  deleteTodo(itemIndex: number): void {
    this.todoList.splice(itemIndex, 1);
  }
}

export { TodoStore };
