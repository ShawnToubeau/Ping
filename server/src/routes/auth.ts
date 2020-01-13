// import { Router, Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
// import User from '../models/Users';

// const router = Router();

// // Login
// router.get('/login', (req: Request, res: Response) => {
//   res.send('Login');
// });

// // Register
// router.get('/register', (req: Request, res: Response) => {
//   res.send('Register');
// });

// // Register user
// router.post('/register', (req: Request, res: Response) => {
//   const { name, email, password } = req.body;

//   //TODO:(Shawn) add field validation

//   const newUser = new User({
//     name,
//     email,
//     password
//   });

//   // Hash password
//   bcrypt.genSalt(10, (err, salt) =>
//     bcrypt.hash(newUser.password, salt, (err, hash) => {
//       if (err) throw err;

//       newUser.password = hash;
//       newUser
//         .save()
//         .then(user => {
//           res.redirect('/login');
//         })
//         .catch(err => console.error(err));
//     })
//   );
// });

// export default router;
