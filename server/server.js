let express = require('express');
let bodyParser = require('body-parser');
let {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/testing', (req, res) => {
    res.send({
        test:'Working well.'
    });
});

// Route for adding todo into the database 
app.post('/todos', (req,res) => {
    let todo =  new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
}); 

// Route for getting all the todo from the database
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);    
    }) 
});

// Route for getting the todo from the database by id
app.get('/todos/:id', (req,res) => {
    let id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    Todo.findById(id).then((todo) => {

        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send(e);
    }); 
});

// Route for deleting todo from the database
app.delete('/todos/:id', (req,res) => {
    let id = res.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send(todo);
    }).catch((e) => {
        res.status(400).send(e);
    }); 
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = {
    app
};

/*
Applying git stash example
*/