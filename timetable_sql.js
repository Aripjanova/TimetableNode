const express =require ('express');
const cors=require('cors');
const mysql=require('mysql')
//var jsonMultilineStrings = require('json-multiline-strings')
const app = express();
app.use(cors());

const  SelectLessons= 'SELECT * FROM lessons';
const  SelectClasses= 'SELECT * FROM classes';
const  connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'aika9709',
    database:'timetable'
});
connection.connect(err=>{
    if(err){
        return err;
    }
})
console.log(connection);

app.get('/',(req, res)=>{
    res.send('go to /lessons to see class')
    }
)
app.get('/lessons/add', (req, res)=>{
    const {lesson_name, lesson_room}=req.query;
    const InsertClassquery=`INSERT INTO lessons ( lesson_name,lesson_room) VALUES ('${lesson_name}','${lesson_room}')`;
    connection.query(InsertClassquery,(err,results)=>{
        if (err){
            return res.send(err)
        }
        else {
            return res.send ("Sucsesfully added")
        }
    })
})

app.get('/lessons',(req, res)=>{
       connection.query(SelectLessons,(err,results)=>{
           if(err){
               return res.send(err)
           }
           else {
               return res.json ({
                   data:results
               })
           }
       });
    }
);

app.get('/class', (req,res)=>{
    connection.query(SelectClasses,(err,results)=>{
        if(err){
            return res.send(err)
        }
        else {
            return res.json ({
                data:results
            })
        }
    });

})
app.get('/class/add', (req, res)=>{
    const {number_class, alph_class}=req.query;
    const InsertClassquery=`INSERT INTO classes ( number_class,alph_class) VALUES ('${number_class}','${alph_class}')`;
    connection.query(InsertClassquery,(err,results)=>{
        if (err){
            return res.send(err)
        }
        else {
            return res.send ("Sucsesfully added class")
        }
    })
})
app.listen(4000, ()=>{
    console.log(`Timetable server listening on port 4000`)
})