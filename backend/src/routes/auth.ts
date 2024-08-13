import express from 'express';
import passport from 'passport';
import { PrismaClient } from '@prisma/client';
import GoogleStrategy from 'passport-google-oidc';

const prisma = new PrismaClient();
const authRouter = express.Router();

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect/google',
    scope: ['profile', 'email']
  },
  async (issuer, profile, cb) => {
    try {
      let user = await prisma.user.findUnique({
        where: {
          email: profile.emails[0].value
        }
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            provider: 'GOOGLE',
            lastLogin: new Date()
          }
        });
      } else {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() }
        });
      }

      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Route to start the authentication process
authRouter.get('/auth/google', passport.authenticate('google'));

// Callback route to handle the response from Google
authRouter.get('/oauth2/redirect/google',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/');
  }
);

// Logout route
authRouter.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

export default authRouter;
