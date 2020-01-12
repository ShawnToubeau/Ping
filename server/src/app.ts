import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Route imports
import userRoute from './routes/users';
import rootRoute from './routes/index';

const app = express();

// DB Config
import db from './config/keys';

// Connect to Mongo
mongoose
  .connect(db.MongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err: Error) => console.error(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayouts);

// Routes
app.use(userRoute);
app.use(rootRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
