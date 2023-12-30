// step one: import module 
import mysql from 'mysql2'
import expess from 'express'

// step two : initialize express 
let app = expess();

// middleware
app.use(expess.json())



//  step four: create connection info
let myConnection = mysql.createConnection(
    {
        user:"group3",
        password :"group3",
        host:'localhost',
        database:'group3'
    }
)
myConnection.connect((err)=>{
  if(err){
    console.log(err)
  } else {
console.log("connected")
  }
})
// //  step six: create table 
 
app.get('/createTable',(req,res)=>{


    let createTable = `CREATE TABLE Persons (
        PersonID int auto_increment,
        LastName varchar(255) NOT NULL  ,
        FirstName varchar(255) ,
        Address varchar(255) ,
        City varchar(255),
        PRIMARY KEY(PersonID)

    )`;
   
    myConnection.query(createTable,(err,data,field)=>{
      if(err){
    console.log(err.message);
      }else{
        res.send('table created')
      }
   })
})
//  step seven: insert data 
app.post('/insertUsear',(req,res)=>{
      const {City,Address,FirstName,LastName} = req.body
    
     let insertUser = `INSERT INTO Persons(City,Address,FirstName,LastName)
     VALUES (?,?,?,?)`

     myConnection.query(insertUser, [City,Address,FirstName,LastName],(err,data,field)=>{
        if(err){
      console.log(err);
        }else{
           console.log(data);
          res.send('data inserted')
          //console.log(field)
        }
     })

 })

 app.get('/info',(req ,res)=>{
  
  //const select = `select * from  persons`;
  myConnection.query(`select * from  persons`,(err ,result ,field)=>{
   if (err){
     console.log(err)
   }
   else{
     //console.log(select)
     console.log(field)
     res.send(result)
   }
  })
 }
 )
// step eight
app.put('/update', (req, res)=>{
    const {id, FirstName} = req.body;
    // console.log(req.body);

   let updateUser =  `UPDATE Persons
SET FirstName ='${FirstName}'
WHERE PersonID = '${id}'`

myConnection.query(updateUser, (err,data,field)=>{
    if(err){
  console.log(err);
    }else{
        console.log(data);
      res.send('data updated')
      
    }
 })

})





app.get('/info', (req, res) => {
  myConnection.query('SELECT * FROM Persons', (err, result, fields) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log(fields);
      res.send(result);
    }
  });
})

// // step nine

app.delete('/delete', (req, res)=>{
    const {id} = req.body
    let deleteUser = `DELETE  FROM Persons WHERE PersonID = '${id}'`

    myConnection.query(deleteUser, (err,data,field)=>{
        if(err){
      console.log(err);
        }else{
            console.log(data);
          res.send('data deleted')
        }
     })

})


// // step five : create conneciton with DB

myConnection.connect((err)=>{
    if(err){
        console.log(err.message);
    }else{
    console.log(`connected successfuly`);
    }
})




//  step three: create lister
let port = 4801;
app.listen(port,()=>{
    //console.log(`server is listening to ${port}`);
   // console.log("localhost:/createTable")
    console.log(`Running on port http://localhost:${port}/createTable`);
    
    console.log(`Running on port http://localhost:${port}/insertUsear`);
}) 
