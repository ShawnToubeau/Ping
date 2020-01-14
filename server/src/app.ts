import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import flash from 'connect-flash';
import session from 'express-session';
import passport from 'passport';

// // Route imports
import userRoute from './routes/users';
import rootRoute from './routes/index';

const app = express();

// Passport config
import { passportConfig } from './config/passport';
passportConfig(passport);

// DB Config
import db from './config/keys';

// Connect to Mongo
mongoose
  .connect(db.MongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err: Error) => console.error(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

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

// Global vars
app.use((req: Request, res: Response, next: NextFunction): void => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Connect flash
app.use(flash());

// Routes
app.use(userRoute);
app.use(rootRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
