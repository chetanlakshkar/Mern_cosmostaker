import {useEffect, useState} from 'react';

function App() {
    const [todos, setTodos] = useState([]);
    console.log(todos,"todos");
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null); 

  const API = 'http://localhost:3000/todos';
  console.log(API,"api");

  const fetchTodos = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async () => {
    if(editId){
      await fetch(`${API}/${editId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text})
      });
      setEditId(null);  
    }else{
      await fetch(API, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text})
      });
    }
    setText('');
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, {method: 'DELETE'});
    fetchTodos();
  };

  const handleEdit = (id) => {
    const todo = todos.find(t => t.id === id);
    setText(todo.text);
    setEditId(id);
  };
  
  return (
    <div>
      <h2>Todo List</h2>
      <input
      value={text}
      onChange={e => setText(e.target.value)}
      placeholder="Enter todo"
      />
      <button onClick={handleSubmit}>{editId ? 'Update' : 'Add'}</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleEdit(todo.id)}>Edit</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;



