import { useState } from "react";
import PropTypes from "prop-types";
import TimePosted from "./utils/TimePosted.jsx";

const PostPeepForm = ({ submitAction, userId }) => {
  const isLoggedIn = userId.length > 0;
  const [peepText, setPeepText] = useState("");
  const [peepTimePosted, setPeepTimePosted] = useState(null);

  const handlePeepSubmit = (event) => {
    event.preventDefault();
    submitAction(peepText, peepTimePosted);
    setPeepText(``);
    setPeepTimePosted(null);
  };

  if (isLoggedIn) {
    return (
      <div className="container mt-5 mb-4">
        <div className="row justify-content-center ">
          <div className="card col-md-6">
            <div className="card-body">
              <form onSubmit={handlePeepSubmit}>
                <div className="post-peep-form ">
                  <input
                    className="form-control"
                    type="text"
                    name="peepText"
                    value={peepText}
                    placeholder="What's happening..."
                    onChange={(event) => setPeepText(event.target.value)}
                  />
                </div>
                <div
                  className="card-text mt-2 mb-2 text-muted"
                  style={{ fontSize: 12 }}>
                  <label title="peepTimePosted">
                    <TimePosted
                      updateDateCreated={(dateCreated) =>
                        setPeepTimePosted(dateCreated)
                      }
                    />
                  </label>
                  <input
                    className="btn btn-primary float-right"
                    type="submit"
                    value="Post"
                    disabled={!peepText}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="alert alert-primary" role="alert">
        Logged in users can post peeps!
      </div>
    );
  }
};

PostPeepForm.propTypes = {
  submitAction: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default PostPeepForm;
