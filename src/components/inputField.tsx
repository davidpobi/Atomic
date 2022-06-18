import React from 'react';
import './styles.css'

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
}


const InputField:React.FC<Props> = ({todo,setTodo}) => {
    return (
        <div>
            <input value={todo}  onChange={(e) => setTodo(e.target.value)} type="input" placeholder="username" className="input"/>
        </div>
    )

}

export default InputField;