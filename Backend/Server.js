const express= require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
// const url = 'mongodb://localhost:27017/messageBoard';
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

app.use(bodyparser.json());
app.use(cors());

//mongoose connection

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
console.log("connected to mongoosedb");

});




// Creating the model for the database collection

const Message = mongoose.model('Message', {
  username: String,
  msg: String
});

const User = mongoose.model('User', {

name: String,
messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
  
});


app.post("/api/message", async (req,res)=>
{
  //saving the message

const message = new Message(req.body);
message.save();
console.log(message);

// finding the users and inserting one user if not found 

let user = await User.findOne({ name: message.username  });


if(!user){
user= new User({ name: message.username });

console.log(user);
}

user.messages.push(message);
user.save();



res.status(200).send();
})




//

//getting the data of the message

app.get("/api/message", async (req, res)=>{

    const docs =  await Message.find();
    
    if(!docs)
    res.json({ error: "Docs not found" })

    else
    res.json(docs);



})

app.get("/api/user/:name", async (req, res)=>{

  const name = req.params.name;
  return res.json(await User.findOne({ name }).populate('messages'));


});
  //listening on a port

app.listen(3000, ()=>{

console.log("Listening to event");

})