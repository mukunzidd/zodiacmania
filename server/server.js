import express from 'express';
import mongoose from 'mongoose';
require('dotenv').config();
import signsRouter from './routes/signsRouter';

// DB connection
const mongoDB = `mongodb+srv://dodo:${process.env.DB_PASS}@cluster0.cgzvf.mongodb.net/${process.env.USER.DB_USER}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', () => {
  console.error.bind(console, 'MongoDB connection error');
});
db.once('open', () => console.log('DB Connected'));

// create app
const app = express();

// Middlewares
app.use(express.json());
app.use('/api/signs', signsRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
