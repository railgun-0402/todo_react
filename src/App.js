import './App.css';
import TodoList from './TodoList';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [todos, setTodos] = useState([]);

const todoNameRef = useRef();

const handleAddTodo = () => {
  // タスクを追加する
  const name = todoNameRef.current.value;
  if (name === "") return;
  // setTodosの引数が、setTodoの値を更新する
  setTodos((prevTodos) => {
    // スプレッド構文を使用して、タスクを追加する
    return [...prevTodos, {id: uuidv4(), name: name, completed: false}];
  });
    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];

    // idが同じものがあれば、チェックリストを反転させる
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  /*
  ※ 削除関数
  */
  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input type='text' ref={todoNameRef} />
      <button onClick={handleAddTodo}>タスクを追加</button>
      <button onClick={handleClear}>完了したタスクの削除</button>
      {/* filter関数で、falseであるものを取り出す(チェックされてない) */}
      <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
    </>
  );
}

export default App;
