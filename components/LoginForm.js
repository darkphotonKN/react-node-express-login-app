import React, { Component } from 'react';

import { loginUser } from '../lib/auth';

class LoginForm extends Component {
  state = {
    // temporarily hardcoded so that typing in the log-in each time
    // isn't necessary
    email: 'Telly.Hoeger@billy.biz',
    password: 'elvis.io'
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    const { email, password } = this.state;
    event.preventDefault();
    loginUser(email, password);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter Email .."
            // controlled component
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter Password .."
            value={this.state.password}
            // controlled component
            onChange={this.handleChange}
          />
        </div>
        <div className="row">
          <div className="col-12 text-left">
            <button className="btn btn-light" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default LoginForm;
