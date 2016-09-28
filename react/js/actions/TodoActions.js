import dispatcher from "../dispatcher";
import axios from "axios";

export function createTodo(text) {
  const id = Date.now();
  const newTodo = {
      id,
      text,
      complete: false,
  }
  axios.post('/newTodo', newTodo)
  .then(function (axiosResponse) {
    // dispatcher.dispatch({
    // type: "CREATE_TODO",
    // newTodo,
    // });
    const data = JSON.parse(axiosResponse.request.response);
    dispatcher.dispatch({type: "RECEIVE_TODOS", todos: data});
  })
  .catch(function (error) {
    console.log('error from newTodo in todoactions: ', error);
  });
}

export function getUser() {
  axios('/getUser')
  .then(function (axiosResponse) {
    const data = JSON.parse(axiosResponse.request.response);
    //console.log('actionUser: ', data);
    dispatcher.dispatch({type: "GET_USER", user: data[0].username});
  })
  .catch(function (error) {
    console.log('error from getUser in todoactions: ', error);
  });
}

export function deleteTodo(id) {
  const obj = {id};
  axios.post('/deleteTodo', obj)
  .then(function (axiosResponse) {
    dispatcher.dispatch({
      type: "DELETE_TODO",
      id,
    });
    const data = JSON.parse(axiosResponse.request.response);
    dispatcher.dispatch({type: "RECEIVE_TODOS", todos: data});
  })
  .catch(function (error) {
    console.log('error from deleteTodo in todoactions: ', error);
  });
}

export function completeTodo(id) {
  const obj = {id};
  axios.post('/completeTodo', obj)
  .then(function (axiosResponse) {
    dispatcher.dispatch({
      type: "COMPLETE_TODO",
      id,
    });
    const data = JSON.parse(axiosResponse.request.response);
    dispatcher.dispatch({type: "RECEIVE_TODOS", todos: data});
  })
  .catch(function (error) {
    console.log('error from completeTodo in todoactions: ', error);
  });
}

export function reloadTodos() {
  axios("/todos").then((axiosResponse) => {
    const data = JSON.parse(axiosResponse.request.response);
    //console.log('reload todos: ', data);
    dispatcher.dispatch({type: "RECEIVE_TODOS", todos: data});
  }).catch(function (error) {
    console.log('error from reloadTodos in todoactions: ', error);
  });
  dispatcher.dispatch({type: "FETCH_TODOS"});
}

export function filterTodos(filter) {
  //console.log(filter);
  const regex = new RegExp(filter, 'i'); // 'i' means NOT case sensitive
  dispatcher.dispatch({
    type: "FILTER_TODOS",
    filter: regex,
  });
}
