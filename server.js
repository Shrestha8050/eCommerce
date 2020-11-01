const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./database/db');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

//MiddleWare
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
//DataBase connection
connectDB();

app.get('/', (req, res) => {
  res.send('hello world');
  console.log('hello');
});

//Port Assign
const PORT = process.env.PORT || 5000;

//Listening to port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
