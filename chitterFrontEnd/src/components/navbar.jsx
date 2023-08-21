import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, logoutHandler }) => {
  const navigate = useNavigate();
  const navigateToLogin = () => navigate("/login");
  const navigateToRegister = () => navigate("/register");

  function ButtonsToDisplay() {
    if (isLoggedIn) {
      return (
        <button
          className="btn btn-light my-2 my-sm-0"
          type="button"
          data-testid="Logout"
          onClick={logoutHandler}>
          Logout
        </button>
      );
    } else {
      return (
        <div>
          <button
            className="btn btn-light my-2 my-sm-0 mr-2"
            type="button"
            data-testid="Register"
            onClick={navigateToRegister}>
            Register
          </button>
          <button
            className="btn btn-light my-2 my-sm-0"
            type="button"
            data-testid="Login"
            onClick={navigateToLogin}>
            Login
          </button>
        </div>
      );
    }
  }
  return (
    <div>
      <nav className="navbar navbar-light bg-primary text-white">
        <a className="navbar-brand ml-5" href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="white"
            className="bi bi-chat-heart-fill mr-2 mb-1 align-content-center"
            viewBox="0 0 16 16">
            <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15Zm0-9.007c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
          </svg>
          <strong className="text-white">Chitter</strong>
        </a>
        <ButtonsToDisplay />
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logoutHandler: PropTypes.func.isRequired,
};

export default Navbar;
