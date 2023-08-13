import { useState } from "react";
import PropTypes from "prop-types";
import DateCreated from "./utils/TimePosted.jsx";

const PostPeepForm = ({ submitAction }) => {
  const [peepText, setPeepText] = useState("");
  const [peepTimePosted, setPeepTimePosted] = useState(null);

  const handlePeepSubmit = (event) => {
    event.preventDefault();
    submitAction(peepText, peepTimePosted);
    setPeepText(``);
    setPeepTimePosted(null);
  };

  return (
    <div className="container mt-5">
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
            <div className="card-text mt-2 mb-2">
              <label title="peepTimePosted">
                <DateCreated
                  updateDateCreated={(dateCreated) =>
                    setPeepTimePosted(dateCreated)
                  }
                />
              </label>
            </div>
            <input
              className="btn btn-primary btn-sm"
              type="submit"
              value="Post"
              disabled={!peepText}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

PostPeepForm.propTypes = {
  submitAction: PropTypes.func.isRequired,
};

export default PostPeepForm;
