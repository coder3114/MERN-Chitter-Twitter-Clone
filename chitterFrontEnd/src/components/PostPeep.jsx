import PropTypes from "prop-types";
import PostPeepForm from "./PostPeepForm.jsx";
import PeepModel from "./utils/Peep.model.js";

const PostPeep = ({ submitAction }) => {
  const submitPeep = (peepText, peepTimeCreated) => {
    const peepToSubmit = new PeepModel(
      peepText,
      new Date(peepTimeCreated).toISOString()
    );
    submitAction(peepToSubmit);
  };

  return (
    <>
      <div className="addEditPeep row">
        <h3>Post a Peep</h3>
      </div>
      <PostPeepForm submitAction={submitPeep} />
    </>
  );
};

PostPeep.propTypes = {
  submitAction: PropTypes.func.isRequired,
};

export default PostPeep;
