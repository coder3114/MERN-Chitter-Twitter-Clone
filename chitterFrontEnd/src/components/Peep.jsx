import PropTypes from "prop-types";
import PeepModel from "./utils/Peep.model.js";

const Peep = ({ peep }) => {
  const { userId, content, time } = peep;
  const postTime = new Date(time).toLocaleString();

  return (
    <div className="row justify-content-center ">
      <div
        className="column card alert-primary col-md-6"
        style={{ margin: "20px" }}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h5 className="card-title">
                {userId.firstName} {userId.lastName}
              </h5>
              <h6 className="card-subtitle mb-4 text-muted">
                @{userId.username}
              </h6>
            </div>
            <div className="col-md-6">
              <p
                className="card-text font-italic text-muted text-right"
                style={{ fontSize: 12 }}>
                {postTime}
              </p>
            </div>
          </div>
          <p className="card-text">{content}</p>
        </div>
      </div>
    </div>
  );
};

Peep.propTypes = {
  peep: PropTypes.instanceOf(PeepModel),
};

export default Peep;
