import React, { Component } from 'react';
import { getUserProfile } from '../lib/auth';

class Profile extends Component {
  componentDidMount() {
    getUserProfile();
  }
  state = {};
  render() {
    return <div>Profile</div>;
  }
}

export default Profile;
