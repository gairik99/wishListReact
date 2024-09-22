import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import './App.css'

function App() {
  // let input = document.querySelector('.input');
  // console.log(input.value);

  // const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const savedTodoList = JSON.parse(localStorage.getItem('todoList'));
    if (savedTodoList.length)
      setTodoList(savedTodoList);
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  // let getTodo = (e) => {
  //   setTodo(e.target.value);
  // };

  let getTodoList = () => {
    let input = document.querySelector('input');
    if (input.value.length > 0)
      setTodoList([...todoList, { id: uuid(), todo: input.value, isChecked: false }]);
    input.value = '';
  };

  let del = (e) => {
    let key = e.target.dataset.id;
    let newTodoList = todoList.filter(item => item.id != key);
    setTodoList(newTodoList);
  };

  let isCheck = (e) => {
    let id = e.target.dataset.id;
    let newTodoList = todoList.map(todo => todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo);
    setTodoList(newTodoList);
  };

  // console.log(todoList)
  return (
    <>
      <div className='App'>
        <div>
          <input type="text" placeholder='Add List Item' className='p-3 my-3 input' />
          <button onClick={getTodoList} className='btn btn-primary btn-sm p-3 mx-2 mb-1'>Add+</button>
        </div>
        <div className='my-5'>
          {
            todoList.map(({ id, todo, isChecked }) => (
              <div key={id} className='row  justify-content-center my-3 p-0'>
                <div className='col-1 my-auto text-start' data-id={id}>
                  <input type="checkbox" data-id={id} checked={isChecked} onChange={isCheck} className='form-check-input' />
                </div>

                <p className={`${isChecked ? 'strike' : ''} col-5 text-light text-start word-break my-auto`} data-id={id}>{todo}</p>
                <button onClick={del} data-id={id} className='btn col-1 '><span data-id={id} className="material-symbols-outlined text-light">
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
