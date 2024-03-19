import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import App from './App';
import './index.css';
import rootReducer from './reducers';
import reportWebVitals from './reportWebVitals';
import { thunk } from 'redux-thunk';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const loggerMiddleware = (store:any) => (next:any) =>(action:any) =>{
  console.log('store',store);
  console.log('action',action);
  next(action);
}

const middleware = applyMiddleware(thunk,loggerMiddleware);
const store = createStore(rootReducer,middleware);

const render = () => root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App 
        onIncrement={()=>store.dispatch({type:"INCREMENT"})}
        onDecrement={()=>store.dispatch({type:"DECREMENT"})}
      />
    </Provider>
  </React.StrictMode>
);
render();
store.subscribe(render);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
