const mongoose = require('mongoose'); 


async function testMongo (){

mongoose.connect(`mongodb://localhost:27017/Clientes`, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
}); 

const User = mongoose.model('Role', { 
    rol: {
        type: String,
    },
}); 

// Function call, here is your snippet
await User.insertMany([ 
    {rol:"ADMIN_ROLE"},
    {rol:"USER_ROLE"},
    {rol:"VENTAS_ROLE"}
]).then(function(){ 
    console.log("Data inserted")  // Success 
}).catch(function(error){ 
    console.log(error)      // Failure 
});

await mongoose.disconnect();

}

testMongo();

  

  




