const mongoose =  require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://2022pcecysachin051:sachin%4023@devtinder.gpzju.mongodb.net/devtinder'
        );
    } catch (err) {
        console.error("Database connection error:", err);
    }
};
module.exports = connectDB;