import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { fetchPosts } from './actions/posts';
import { RootState } from './reducers';

type Props = {
  onIncrement : () => void;
  onDecrement : () => void;
}

interface Post{
  userId : number;
  id : number;
  title : string;
}

function App({onIncrement,onDecrement}: Props) {
  // useSelector : store 상태 가져오는 hooks
  const counter = useSelector((state:RootState) => state.counter);
  const todos : String[] = useSelector((state:RootState) => state.todos);
  const posts:Post[] = useSelector((state : RootState)=> state.posts);
  // useDispatch : store에 상태 보는 hooks
  const dispatch = useDispatch();
  const [todoValue, setTodoValue] = useState("");

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])
  

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

      <ul>
        {posts.map((post,index)=> <li key={index}>{post.title}</li>)}
      </ul>
    </div>
  );
}

export default App;
