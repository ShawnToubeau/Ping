import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import flash from 'connect-flash';
import session from 'express-session';
import passport from 'passport';
require('dotenv').config();

// // Route imports
import userRoute from './routes/users';
import loginRoute from './routes/auth';
import rootRoute from './routes/index';

const app = express();

// Passport config
import { passportConfig } from './config/passport';
passportConfig(passport);

// Connect to Mongo
const MongoURI = process.env.MONGO_URI;

if (MongoURI) {
  mongoose
    .connect(MongoURI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected...'))
    .catch((err: Error) => console.error(err));
} else {
  console.error('ERROR: Please provide a MongoDB URI');
}

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// CORS
app.use(cors());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global vars
app.use((req: Request, res: Response, next: NextFunction): void => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use(userRoute);
app.use(loginRoute);
app.use(rootRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
