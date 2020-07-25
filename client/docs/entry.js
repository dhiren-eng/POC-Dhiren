
    window.reactComponents = {};

    window.vueComponents = {};

  
      import React from "react";

      import ReactDOM from "react-dom";


      import ReactWrapper from '../better-docs/lib/react-wrapper.js';

      window.React = React;

      window.ReactDOM = ReactDOM;

      window.ReactWrapper = ReactWrapper;

    
    import './styles/reset.css';

    import './styles/iframe.css';

  import Component0 from '../src/Todos/AddTodo.js';
reactComponents['AddTodo'] = Component0;

import Component1 from '../src/Pagination/index.js';
reactComponents['Pagination'] = Component1;

import Component2 from '../src/Context/Store.js';
reactComponents['StateProvider'] = Component2;

import Component3 from '../src/Todos/TodoList.js';
reactComponents['TodoList'] = Component3;