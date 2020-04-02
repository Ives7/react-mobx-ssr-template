import 'reflect-metadata';
import { render } from 'react-dom';
import { createElement } from 'react';
import { App } from './app';
import './global.less';
import 'minireset.css';
render(createElement(App), document.getElementById('root'));
module.hot && module.hot.accept();
