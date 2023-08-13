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
    <form onSubmit={handlePeepSubmit}>
      <div className="post-peep-form">
        <input
          type="text"
          name="peepText"
          value={peepText}
          placeholder="What's happening..."
          style={{ flex: 1, border: "none", minHeight: "50px" }}
          onChange={(event) => setPeepText(event.target.value)}
        />
        <br />
        <label title="peepTimePosted">
          Created on:&nbsp;
          <DateCreated
            updateDateCreated={(dateCreated) => setPeepTimePosted(dateCreated)}
          />
        </label>
        <br />
        <input type="submit" value="Post" disabled={!peepText} />
      </div>
    </form>
  );
};

PostPeepForm.propTypes = {
  submitAction: PropTypes.func.isRequired,
};

export default PostPeepForm;
