const mongoose = require('mongoose');

const dbConnecrtion = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('base de datos online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inciar DB');
    }
}

module.exports = {
    dbConnecrtion,
}