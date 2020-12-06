const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://ecommerce-user:newa123@cluster0.svzqz.mongodb.net/<dbname>?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Database connection is established');
  } catch (e) {
    console.log(err.message);
  }
};

module.exports = connectDB;
