import PropTypes from "prop-types";
import PeepModel from "./utils/Peep.model.js";

const Peep = ({ peep }) => {
  const { description, post_time } = peep;
  const postDate = new Date(post_time).toLocaleString();

  return (
    <div className="peep">
      <p>{description}</p>
      <p>{postDate}</p>
    </div>
  );
};

Peep.propTypes = {
  peep: PropTypes.instanceOf(PeepModel),
};

export default Peep;
