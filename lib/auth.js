import axios from 'axios';

// configure axios to pass over the cookie data
axios.defaults.withCredentials = true;

// post the email and password we get from the form
export const loginUser = async (email, password) => {
  const { data } = await axios.post('/api/login', {
    email,
    password
  });

  console.log(data);

  return data;
};

// for retrieving user profiles

export const getUserProfile = async () => {
  // create end point '/api/profile' that allows returning of user profile info the
  // cookie setup we had earlier will be automatically put in the "headers" to determine
  // authorized users (check axios config top of this file to enable this)
  const response = await axios.get('/api/profile');
  return response.data;
};
