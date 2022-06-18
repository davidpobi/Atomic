import React, { useEffect, useState,} from 'react';
import Pages from './Pages/Pages';
import Login from './components/Auth/Login';

let title: string = 'Atomic';

const App: React.FC = () => {
  const [todo,setTodo] = useState<string>("");
  console.log('txt: ' + todo);
  

  // happens after render 
  useEffect(() =>  {
  console.log('in');

  //subscribe();

  //cleanup
  return (() => {
  //unsubscribe();

  });
  },[]); //empty array will make useEffect run only when the componnt is mounted



  
  return (
    <div className="App">
      <div className="header">
      <label className="title">{title}</label>
      <Login/>
      </div>

      <div className="main">
       {/* <InputField todo={todo} setTodo={setTodo} /> */}
       <Pages/>
      </div>
    
    </div>
  );
} 

export default App;
