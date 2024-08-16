// ToggleButton.js
import '../styles/ToggleButton.css';
import { ToggelProps } from '../types/index.types';

const ToggleButton = ({setIsOn, isOn}: ToggelProps) => {

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className={`toggle-button ${isOn ? 'on' : 'off'}`} onClick={handleToggle}>
      <div
        className="toggle-slider"
        style={{
          transform: isOn ? 'translateX(30px)' : 'translateX(0)',
        }}
      ></div>
    </div>
  );
};

export default ToggleButton;
