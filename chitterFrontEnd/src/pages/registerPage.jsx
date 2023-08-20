import { useState } from "react";
import PropTypes from "prop-types";

import UserModel from "../Components/utils/User.model";

const Register = ({ submitAction }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setFirstName(value);
    }
    if (id === "lastName") {
      setLastName(value);
    }
    if (id === "username") {
      setUsername(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    const user = new UserModel(firstName, lastName, username, email, password);
    submitAction(user);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-6">
          <h2 className="mb-4">Register</h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-6">
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-row form-group">
              <div className="col">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  value={firstName}
                  id="firstName"
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => handleInputChange(e)}
                  id="lastName"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">@</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => handleInputChange(e)}
                required
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
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
            <button
              type="submit"
              data-testid="register"
              className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  submitAction: PropTypes.func.isRequired,
};

export default Register;
