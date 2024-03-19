import { useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './reducers';

type Props = {
  value : any;
  onIncrement : () => void;
  onDecrement : () => void;
}

function App({value,onIncrement,onDecrement}: Props) {
  // useSelector : store 상태 가져오는 hooks
  const counter = useSelector((state:RootState) => state.counter);
  const todos : String[] = useSelector((state:RootState) => state.todos);
  // useDispatch : store에 상태 보는 hooks
  const dispatch = useDispatch();
  const [todoValue, setTodoValue] = useState("");
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    setTodoValue(e.target.value);
  }
  const addTodo = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    dispatch({type:"ADD_TODO", text:todoValue});
    setTodoValue("");
  }
  

  return (
    <div className="App">
      Clicked : {counter} tiems
      <button onClick={onIncrement}>
        +
      </button>
      <button onClick={onDecrement}>
        -
      </button>
      <ul>
        {todos.map((todo,index) => <li key={index}>{todo}</li>)}
      </ul>

      <form onSubmit={addTodo}>
        <input type="text" value={todoValue} onChange={handleChange}/>
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
