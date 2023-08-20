import PropTypes from "prop-types";
import Peep from "./Peep.jsx";
import PeepModel from "./utils/Peep.model";

export default function PeepList({ peepList }) {
  const populatePeepList = () => {
    if (peepList?.length > 0) {
      const displayPeeps = peepList.map((item, i) => {
        const peep = new PeepModel(item.userId, item.content, item.time);
        return <Peep peep={peep} key={i} />;
      });
      return displayPeeps;
    }
  };

  return (
    <div className="container mt-2">
      <div>{populatePeepList()}</div>
    </div>
  );
}
PeepList.propTypes = {
  peepList: PropTypes.array.isRequired,
};
