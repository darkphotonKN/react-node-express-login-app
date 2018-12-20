const next = require('next');
const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3001; // process.env.PORT || 3000; // normally, but force port 3001 for now
const app = next({ dev });
// let next handle all the requests that comes to our app
const handle = app.getRequestHandler();

const AUTH_USER_TYPE = 'authenticated'; // indicates authenticated
const COOKIE_SECRET = 'cookie123'; // cookie secret for cookie parser
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !dev,
  signed: true
};

// authenticating user
const authenticate = async (email, password) => {
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );

  // matching with saved json records if the incoming email and password
  // matches any "user" inside the "data".
  return data.find((user) => {
    if (user.email === email && user.website === password) {
      return user;
    }
  });
};

app.prepare().then(() => {
  const server = express();

  // use middleware so it can handle json form data
  server.use(express.json());
  // another middleware to be able to parse cookies
  server.use(cookieParser(COOKIE_SECRET));

  // post request for log in
  server.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Simple auth resp - send back an object with email, password, and a success 'true'
    // res.json({
    //   email,
    //   password,
    //   success: true
    // });

    // authenticate our user
    const user = await authenticate(email, password);
    // there is no returned user object, therefore auth failed
    if (!user) {
      // send an auth failed error code back (403)
      return res.status(403).send('Error, login credentials are wrong.');
    }
    const userData = {
      name: user.name,
      email: user.email,
      type: AUTH_USER_TYPE
    };
    // send back the response and a cookie
    res.cookie('token', userData, COOKIE_OPTIONS);
    res.json(userData);
  });

  // get requests for retrieving user profile
  server.get('/api/profile', (req, res) => {
    // get signed cookies back from req body
    const { signedCookies = {} } = req; // also setting default to = {} in case no signed cookies
  });

  // usually
  // server.get('/users', (req, res) => {
  // });
  // but with next we can do
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err; // throw error if caught
    console.log(`Listening on port ${port}`);
  });
});
