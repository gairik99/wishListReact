import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import './App.css'

function App() {

  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  let getTodo = (e) => {
    setTodo(e.target.value);
  }
  let getTodoList = () => {
    if (todo.length)
      setTodoList([...todoList, { id: uuid(), todo: todo, isChecked: false }]);
    setTodo('');
  }
  let del = (e) => {
    let key = e.target.dataset.id;
    let newTodoList = todoList.filter(item => item.id != key);
    setTodoList(newTodoList);
  }

  let isCheck = (e) => {
    let id = e.target.dataset.id;
    let newTodoList = todoList.map(todo => todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo);
    setTodoList(newTodoList);
  }

  // console.log(todoList)
  return (
    <>
      <div className='App'>
        <div>
          <input type="text" value={todo} placeholder='Add List Item' onChange={getTodo} className='p-3 my-3 input' />
          <button onClick={getTodoList} className='btn btn-primary btn-sm p-3 mx-2 mb-1'>Add+</button>
        </div>
        <div className='my-5'>
          {
            todoList.map(({ id, todo, isChecked }) => (
              <div data-id={id} className='row  justify-content-center my-3'>
                <div className='col-1 my-auto'>
                  <input type="checkbox" data-id={id} onChange={isCheck} className='form-check-input' />
                </div>

                <p className={`${isChecked ? 'strike' : ''} col-5  text-light text-start word-break my-auto`}>{todo}</p>
                <button onClick={del} data-id={id} className='btn col-1 '><span data-id={id} class="material-symbols-outlined text-light">
                  delete
                </span></button>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App
