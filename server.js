const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let todos = [];
let id  = 1;

//create api
app.post('/todos', (req, res) => {
const todo = {id : id++, text: req.body.text};
todos.push(todo);
res.json(todo);
});


//getapi listing
app.get('/todos', (req, res) => {
    res.json(todos);
});

//edit api
app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if(todo){
        todo.text = req.body.text;
        res.json(todo);
    }else{
        res.status(404).send('Todo not found');
    }
});

//delete api
app.delete('/todos/:id', (req, res) => {

    todos = todos.filter(t => t.id !== parseInt(req.params.id));
    res.send("deleted");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
