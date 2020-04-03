import { RouteConfig } from 'react-router-config';
import { todoLoadData } from 'client/pages/todo/load-data';
import Todo from 'client/pages/todo';
import User from 'client/pages/user';
import Base from '../../client/layouts/base';


/*
 * 小组件或者小模块不建议做异步加载，下面只是提供一个按需加载的演示demo。
 * 在整体项目体积不是非常大的情况下，并且对首屏体验要求较高也不要用。因为首屏看到数据后，后续客户端加载JS的时间是完全可以接受的。
 * 1、小组件反而要额外开启请求消耗，请求的消耗可能要比体积大些影响更大。
 * 2、数据脱水的loadData方法需要拆分。
 * 3、即使首屏带着数据，也会在客户端短时间内闪现白屏。
 * ps:如果使用按需加载 Load Data请放在单独的文件 且不要与加载组件有引用关系
 * */

// import { loadable } from '../helpers/loadable';
// const UserAsync = loadable(() => import('client/pages/user'));
// const TodoAsync = loadable(() => import('client/pages/todo'));

export interface MenuRouteConfig extends RouteConfig {
  menu?: string;
}
export const routes: MenuRouteConfig[] = [
  {
    path: '/',
    component: Base,
    routes: [
      {
        path: '/todo',
        menu: 'todo',
        component: Todo,
        loadData: todoLoadData,
      },
      {
        path: '/user',
        component: User,
        menu: 'user',
      },
    ],
  },
];
