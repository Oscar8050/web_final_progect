import React, { useState } from 'react';
import './styles.css'

var global_valid_amount = 2;

function App() {
  let idtmp = 0;
  const [index, setIndex] = useState(2);
  const [valid, setValid] = useState(2);
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState([]);
  const enter_press = (event) => {
    if (event.keyCode === 13 && value !== '') {
      setTodos([...todos, value]);
      setValue('');
      setIndex(index + 1);
      global_valid_amount++;
    }
  }
  const input_content = (e) => {
    setValue(e.target.value);
  }
  const IndexControl = (e) => {
    if (e === true) {
      setIndex(index + 1);
    }
    else {
      setIndex(index - 1);
    }

  }

  return (
    <div id="myroot" className="todo-app__root">
      <header className="todo-app__header" >
        <h1 className="todo-app__title" id='_title'>todos</h1>
      </header>
      <section className='todo-app__main'>
        <input className="todo-app__input" value={value} placeholder={'What needs to be done?'} autoFocus={true} onKeyUp={enter_press} onChange={input_content}></input>
        <ul className="todo-app__list" id='todo_list'>
          {/* <MyList todo = {todos}> */}
          {
            todos != null &&
            todos.map((con, i) => <Item key={i} id={idtmp++} content={con} indexcontrol={IndexControl} />)
          }
        </ul>
      </section>

      {todos != null && <MyFooter amount={index} />}
    </div>
  );
}
function Item(props) {
  const crossout = {
    textDecoration: 'line-through',
    opacity: 0.5,
  };
  const [clicked, setClicked] = useState(false);
  const [effect, setEffect] = useState(null);
  const ifclicked = () => {
    if (clicked === false) {
      setEffect(crossout);
      setClicked(true);
      props.indexcontrol(false);
    }
    else {
      setEffect(null);
      setClicked(false);
      props.indexcontrol(true);
    }
  }

  return (
    <li className='todo-app__item'>
      <div className='todo-app__checkbox'>
        <input type='checkbox' id={props.id} onClick={ifclicked} />
        <label htmlFor={props.id} />
      </div>
      <h1 className='todo-app__item-detail' style={effect}>
        {props.content}
      </h1>
    </li>
  )
}

function MyFooter(props) {
  return (
    <footer className='todo-app__footer' id='todo-footer'>
      <div className='todo-app__total'>
        {props.amount - 2} left
      </div>
    </footer>
  )
}
export default App;