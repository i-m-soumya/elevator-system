import { useState, useEffect } from 'react';
import Floor from './Floor';
import Elevator from './Elevator';

const floors = Array.from({ length: 9 }, (_, i) => i + 1).reverse(); 
const elevatorCount = 5;

function ElevatorSystem() {
  const [elevatorPositions, setElevatorPositions] = useState(Array(elevatorCount).fill(1));
  const [requests, setRequests] = useState([]);
  const [elevatorStatus, setElevatorStatus] = useState(Array(elevatorCount).fill('idle'));

  const callElevator = (floor) => {
    setRequests((prevRequests) => [...prevRequests, floor]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (requests.length > 0) {
        const floor = requests[0];
        let nearestElevator = null;
        let minDistance = Infinity;

        elevatorPositions.forEach((pos, index) => {
          if (elevatorStatus[index] === 'idle') {
            const distance = Math.abs(floor - pos);
            if (distance < minDistance) {
              minDistance = distance;
              nearestElevator = index;
            }
          }
        });

        if (nearestElevator !== null) {
          moveElevator(nearestElevator, floor);
          setRequests((prevRequests) => prevRequests.slice(1));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [requests, elevatorPositions, elevatorStatus]);

  const moveElevator = (elevatorIndex, targetFloor) => {
    setElevatorStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[elevatorIndex] = 'moving';
      return newStatus;
    });

    const interval = setInterval(() => {
      setElevatorPositions((prevPositions) => {
        const newPositions = [...prevPositions];
        if (newPositions[elevatorIndex] < targetFloor) newPositions[elevatorIndex]++;
        else if (newPositions[elevatorIndex] > targetFloor) newPositions[elevatorIndex]--;
        else {
          clearInterval(interval);
          setElevatorStatus((prevStatus) => {
            const newStatus = [...prevStatus];
            newStatus[elevatorIndex] = 'arrived';
            return newStatus;
          });

          setTimeout(() => {
            setElevatorStatus((prevStatus) => {
              const newStatus = [...prevStatus];
              newStatus[elevatorIndex] = 'idle';
              return newStatus;
            });
          }, 2000);
        }
        return newPositions;
      });
    }, 500);
  };

  return (
    <div className="elevator-system">
      <div className="floor-indicators">
        {floors.map((floor) => (
          <Floor key={floor} floor={floor} onCall={() => callElevator(floor)} requests={requests} />
        ))}
      </div>
      <div className="elevators">
        {Array(elevatorCount).fill().map((_, index) => (
          <Elevator key={index} position={elevatorPositions[index]} status={elevatorStatus[index]} />
        ))}
      </div>
    </div>
  );
}

export default ElevatorSystem;