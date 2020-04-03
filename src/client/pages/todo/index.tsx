import React, { useCallback, useEffect, useRef } from 'react';

import { observer } from 'mobx-react';
import { useRootStore } from 'client/hooks/useStore';
import { initTodoList } from 'common/fake-data';
import { RootStore } from 'common/store/root.store';
import { LoadDataComponent } from '../../../common/inteface';
import './index.less'
export const TodoList: React.FC = observer(function TodoList() {
  const { todoStore } = useRootStore();
  useEffect(() => {
    if (!todoStore.todoList.length) {
      todoStore.setTodoList(initTodoList);
    }
  }, []);
  return (
    <ul>
      {todoStore.todoList.map(todoItem => {
        return (
          <li key={todoItem.name}>
            <p>name:{todoItem.name}</p>
            <p>status:{todoItem.status}</p>
          </li>
        );
      })}
    </ul>
  );
});
const Todo: React.FC & LoadDataComponent = () => {
  const inputRef = useRef<HTMLInputElement>();
  const { todoStore } = useRootStore();
  const handleAddTodo = useCallback(() => {
    todoStore.addTodo(inputRef.current.value);
    inputRef.current.value = '';
  }, [todoStore]);
  return (
    <div>
      <p>
        <input type="text" ref={inputRef} />
        <button onClick={handleAddTodo}>添加todo</button>
      </p>
      <TodoList />
    </div>
  );
};

Todo.loadData = (
  initRootStore: DeepPartial<RootStore>,
  //match: MatchedRoute<any>, 第二个参数为当前路由的Matched
): void => {
  // 脱水
  const { todoStore } = useRootStore();
  todoStore.setTodoList(initTodoList);
  // 注水
  //initRootStore.todoStore = initRootStore.todoStore || {};
  initRootStore.todoStore.todoList = todoStore.todoList;
};

export default Todo;
