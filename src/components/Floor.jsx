import PropTypes from 'prop-types';

function Floor({ floor, onCall, requests }) {
  const isWaiting = requests.includes(floor);

  return (
    <div className="floor">
      <div className="floor-number">{floor === 1 ? 'Ground Floor' : `${floor}th`}</div>
      <button
        className={`call-button ${isWaiting ? 'waiting' : ''}`}
        onClick={onCall}
        disabled={isWaiting}
      >
        {isWaiting ? 'Waiting' : 'Call'}
      </button>
    </div>
  );
}

Floor.propTypes = {
    floor: PropTypes.number.isRequired,
    onCall: PropTypes.any,
    requests: PropTypes.any
}
export default Floor;
