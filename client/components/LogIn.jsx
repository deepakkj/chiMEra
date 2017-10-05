import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../store';

export const LogIn = (props) => {
  const { handleSubmit, error } = props;
  return (
    <div id="login" className="center">
      <form onSubmit={handleSubmit}>
        <div className="email">
          <label htmlFor="email"><small>Email</small></label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            required
          />
        </div>
        <br />
        <div className="form-group">
          <div>
            <label htmlFor="password"><small>Password</small></label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              required
            />
          </div>
        </div>
        <br />
        {error && error.response && <div className="errorMessage"> {error.response.data} </div>}
        <div>
          <button type="submit" className="btn">LOG IN</button>
        </div>
        <div>
          <Link to="/signup">
            <button className="btn-flat">SIGN UP</button>
          </Link>
        </div>
      </form>
      <a href="/auth/google"><img id="google-icon" src="https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-128.png" alt="" />Log in with Google</a>
    </div>
  );
};

const mapLogin = state =>
  ({ error: state.user.error });

const mapDispatch = dispatch =>
  ({ handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    dispatch(login(email, password));
  } });

export default connect(mapLogin, mapDispatch)(LogIn);


LogIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
