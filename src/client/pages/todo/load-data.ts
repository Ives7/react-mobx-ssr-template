import { RootStore } from '../../../common/store/root.store';
import { useRootStore } from '../../hooks/useStore';
import { initTodoList } from '../../../common/fake-data';

export const todoLoadData = (
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