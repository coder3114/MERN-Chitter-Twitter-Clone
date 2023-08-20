import { useState } from "react";
import PropTypes from "prop-types";

const Login = ({ submitAction }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    submitAction({ email, password });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-6">
          <h2 className="mb-4">Login</h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-6">
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              data-testid="login"
              className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  submitAction: PropTypes.func.isRequired,
};

export default Login;
