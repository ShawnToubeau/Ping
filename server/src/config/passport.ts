import { Strategy as LocalStrategy, IVerifyOptions } from 'passport-local';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/Users';

export const passportConfig = (passport: any): void => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      (
        email: string,
        password: string,
        done: (error: any, user?: any, options?: IVerifyOptions) => void
      ) => {
        // Match user
        User.findOne({ email: email })
          .then(user => {
            if (!user) {
              return done(null, false, {
                message: 'That email is not registered'
              });
            }

            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;

              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: 'Password is incorrect' });
              }
            });
          })
          .catch(err => console.error(err));
      }
    )
  );

  passport.serializeUser(
    (
      user: IUser,
      done: (error: any, user?: any, options?: IVerifyOptions) => void
    ) => {
      done(null, user.id);
    }
  );

  passport.deserializeUser(
    (
      id: any,
      done: (error: any, user?: any, options?: IVerifyOptions) => void
    ) => {
      User.findById(id, (err, user) => {
        done(err, user);
      });
    }
  );
};
