import React from "react";
import ReactDom from "react-dom";
import TodoList from "./Todos/TodoList";
import StateProvider, { store } from "./Context/Store";
console.log(store);
ReactDom.render(
  <StateProvider>
    <TodoList />
  </StateProvider>,
  document.querySelector("#root")
);
