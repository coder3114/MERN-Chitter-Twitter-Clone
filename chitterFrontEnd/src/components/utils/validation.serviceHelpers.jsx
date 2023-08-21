import { isEmail } from "validator";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 4 || value.length > 15) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 4 and 15 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 8 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 8 and 20 characters.
      </div>
    );
  }
};

const validationService = {
  required,
  validEmail,
  vusername,
  vpassword,
};

export default validationService;
