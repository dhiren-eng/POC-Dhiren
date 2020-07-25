import React, { PureComponent } from "react";
import axios from "axios";
import {
  render,
  cleanup,
  screen,
  within,
  act,
  findAllByRole,
} from "@testing-library/react";
import StateProvider, { store } from "../../Context/Store";
import TodoList from "../TodoList";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

jest.mock("axios");
var todoList = [];

test("if todoList is being displayed & store updated after being successfully fetched", async () => {
  var todoList = [
    { _id: 1, title: "POC", description: "RTL & Jest" },
    { _id: 2, title: "POC1", description: "Context & Hooks" },
  ];
  const promise = Promise.resolve({ data: todoList });
  axios.get.mockImplementationOnce(() => promise);
  const { getAllByTestId, getByPlaceholderText, getByText } = render(
    <StateProvider>
      <TodoList />
    </StateProvider>
  );
  await act(() => promise);
  const listItems = getAllByTestId("todoItem");
  listItems.forEach((item, index) => {
    const { getByText } = within(item);
    const { title, description } = todoList[index];
    expect(item).toBeInTheDocument();
  });
  expect(listItems).toHaveLength(2);
  expect(getByPlaceholderText("To-Do Title")).toBeInTheDocument();
  expect(getByPlaceholderText("To-Do Description")).toBeInTheDocument();
  expect(getByText("Add To-Do Item")).toBeInTheDocument();
  expect(store.todos[0]).toEqual(todoList);
});
test("if todoItem is added after clicking Add To-Do Item button", async () => {
  var db = { data: [] };
  const promise = () => Promise.resolve(db);
  const promise1 = () => Promise.resolve("Successfully added");
  axios.get.mockImplementation(() => {
    console.log(promise);
    return promise();
  });
  axios.post.mockImplementationOnce((url, postData) => {
    postData = { ...postData, _id: Date.now() };
    db = { ...db, data: [...db.data, postData] };
    return promise1();
  });
  const {
    getByText,
    findByPlaceholderText,
    getByPlaceholderText,
    findByText,
    findAllByTestId,
    queryByTestId,
  } = render(
    <StateProvider>
      <TodoList />
    </StateProvider>
  );
  await act(() => promise());
  const addButton = getByText("Add To-Do Item");
  await userEvent.type(getByPlaceholderText("To-Do Title"), "Meeting");
  await userEvent.type(
    getByPlaceholderText("To-Do Description"),
    "Setting Agenda"
  );
  expect(await findByPlaceholderText("To-Do Title")).toHaveAttribute(
    "value",
    "Meeting"
  );
  expect(await findByText("Setting Agenda")).toBeInTheDocument();
  expect(queryByTestId("todoItem")).not.toBeInTheDocument();
  await userEvent.click(addButton);
  await act(() => promise1());
  await act(() => promise());
  const items = await findAllByTestId("todoItem");
  expect(items).toHaveLength(1);
  const todo = queryByTestId("todoItem");
  expect(todo).toBeInTheDocument();
  expect(todo).toHaveTextContent("Meeting");
  expect(todo).toHaveTextContent("Setting Agenda");
});
test("if todo item is deleted after clicking the delete button", async () => {
  var db = { data: [{ _id: 1, title: "POC", description: "RTL & Jest" }] };
  const promise = () => Promise.resolve(db);
  const deletePromise = () => Promise.resolve("Successfully deleted");
  axios.get.mockImplementation(() => {
    return promise();
  });
  axios.delete.mockImplementation(() => {
    db = { data: [] };
    return deletePromise();
  });
  const { debug, getByTestId, queryByRole } = render(
    <StateProvider>
      <TodoList />
    </StateProvider>
  );
  await act(() => promise());
  const deleteButton = getByTestId("deleteItem");
  expect(deleteButton).toBeInTheDocument();
  await userEvent.click(deleteButton);
  await act(() => deletePromise());
  await act(() => promise());
  expect(queryByRole("listitem")).not.toBeInTheDocument();
});
test("updation of todo item", async () => {
  var updatedObj = {};
  var db = { data: [{ _id: 1, title: "POC", description: "RTL & Jest" }] };
  const promise = () => Promise.resolve(db);
  const updatePromise = () => Promise.resolve("Successfully updated");
  axios.get.mockImplementation(() => {
    return promise();
  });
  axios.put.mockImplementation((url, obj) => {
    updatedObj = { ...updatedObj, ...obj };
    db = { data: [obj] };
    return updatePromise();
  });
  const { queryByTestId, queryByText, queryByRole } = render(
    <StateProvider>
      <TodoList />
    </StateProvider>
  );
  await act(() => promise());
  const editButton = queryByTestId("updateItem");
  await userEvent.click(editButton);
  const editText = queryByTestId("editTextBox");
  expect(editText).toBeInTheDocument();
  expect(editText).toHaveAttribute("value", db.data[0].title);
  const saveButton = queryByText("Save");
  expect(saveButton).toBeInTheDocument();
  await userEvent.type(editText, "Proof of Concept");
  await userEvent.click(saveButton);
  await act(() => updatePromise());
  await act(() => promise());
  const li = queryByTestId("todoItem");
  expect(li).toHaveTextContent("Proof of Concept");
  expect(store.todos[0]).toEqual(db.data);
});
