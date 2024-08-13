import express from 'express';
import session from 'express-session';
import passport from 'passport';
import authRouter from './routes/auth.js';

const app = express();

// Session configuration
app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: true }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use authentication routes
app.use(authRouter);

app.get('/', (req, res) => {
  res.send(`Hello, ${req.user ? req.user.name : 'Guest'}`);
});

app.get('/protected', ensureAuthenticated, (req, res) => {
  res.send('This is a protected route');
});

function ensureAuthenticated(req : any, res : any, next : any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
