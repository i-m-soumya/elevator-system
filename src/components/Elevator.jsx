import PropTypes from "prop-types";
import elevatorIcon from "../assets/elevator.svg";
function Elevator({ position, status }) {
  return (
    <div
      className={`elevator ${status}`}
      style={{ transform: `translateY(${(9 - position) * 60}px)` }}
    >
      <img  className="elevator-icon" src={elevatorIcon}></img><br></br>
    </div>
  );
}

Elevator.propTypes = {
  position: PropTypes.any,
  status: PropTypes.any,
};

export default Elevator;
