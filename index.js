const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());


app.get("/home", (req, res) => {
  const data = fs.readFileSync("./db.json", "utf-8");
  console.log(data.par);
  res.send("your at home page");
});

app.post("/add-data", (req, res) => {
  const  data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
  const bodyData= req.body
  data.todos.push(bodyData);
fs.writeFileSync('./db.json',JSON.stringify(data))
  res.send(`data get ${data.todos[0]}`);
});


app.put('/update-status',(req,res)=>{
    const  data=JSON.parse(fs.readFileSync('./db.json','utf-8'));
    const newdata =data.todos.map((todo,i)=>{
        if(i%2==0){
           return {...todo, completed:true}
        }
        return todo
    })
    data.todos.length=0
   for(let todo of newdata){
    data.todos.push(todo)
   }

    fs.writeFileSync('./db.json',JSON.stringify(data))
    console.log(newdata);
    res.send(`updated...`)
})

app.delete('/delete-todo',(req,res)=>{
    const data= JSON.parse(fs.readFileSync('./db.json'),'utf-8')

    let updatedTodo = data.todos.filter((todo)=>{
        if(todo.completed!=true){
            return todo
        }
    })
    data.todos.length=0
    for(let todo of updatedTodo){
     data.todos.push(todo)
    }
    fs.writeFileSync('./db.json',JSON.stringify(data))
    res.send('todo deleted')
})




app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
