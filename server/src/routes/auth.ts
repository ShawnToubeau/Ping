import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/Users';
import passport from 'passport';

const router = Router();

// GET Login
router.get('/login', (req: Request, res: Response) => {
  res.send('Login');
});

// GET Register
router.get('/register', (req: Request, res: Response) => {
  res.send('Register');
});

// POST Register
router.post('/register', (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  //TODO:(Shawn) add field validation

  const newUser = new User({
    name,
    email,
    password
  });

  // Hash password
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;

      newUser.password = hash;
      newUser
        .save()
        .then(user => {
          res.redirect('/login');
        })
        .catch(err => console.error(err));
    })
  );
});

// POST Login
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

export default router;
