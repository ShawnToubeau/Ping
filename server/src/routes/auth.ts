import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';

const router = Router();

// POST Login
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true
    },
    (err, user, info) => {
      // TODO: add last login logic
      console.log(user);
      res.send('hi');
    }
  )(req, res, next);
});

export default router;
