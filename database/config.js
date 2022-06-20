const mongoose = require("mongoose");


const dbConection = async() => {

    try {
        // await mongoose.connect(process.env.MONGODB_CNN);
        await mongoose.connect(process.env.MONGODB_CNN_DOCKER);

        console.log("Base de datos online");
        
    } catch (error) {
        throw new Error("Error a la hora de iniciar la base de datos.");
    }
}

module.exports = {
    dbConection
}