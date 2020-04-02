import { RouteConfig } from 'react-router-config';
import {  Todo } from '../../client/pages/todo/todo';
import { User } from '../../client/pages/user/user';

export interface MenuRouteConfig extends RouteConfig {
  menu?: string;
}

export const routes: MenuRouteConfig[] = [
  {
    path: '/todo',
    menu: 'todo',
    component: Todo,
    loadData: Todo.loadData,
  },
  {
    path: '/user',
    component: User,
    menu: 'user',
  },
];
