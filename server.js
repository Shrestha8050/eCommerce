const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./database/db');
const authRoutes = require('./routes/auth');
//MiddleWare
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/auth', authRoutes);
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
