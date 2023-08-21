import PropTypes from "prop-types";

import PostPeepForm from "../Components/PostPeepForm";
import PeepList from "../Components/PeepList";
import PeepModel from "../Components/utils/Peep.model.js";

const Home = ({ submitAction, peepList, userId }) => {
  const submitPeep = (peepText, peepTimeCreated) => {
    const peepToSubmit = new PeepModel(
      userId,
      peepText,
      new Date(peepTimeCreated).toISOString()
    );
    submitAction(peepToSubmit);
  };

  return (
    <div className="homePage container mt-5">
      <PostPeepForm userId={userId} submitAction={submitPeep} />
      <PeepList peepList={peepList} />
    </div>
  );
};

Home.propTypes = {
  submitAction: PropTypes.func.isRequired,
  peepList: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired,
};

export default Home;
