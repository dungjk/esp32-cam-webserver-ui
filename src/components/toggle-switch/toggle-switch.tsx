import { FunctionalComponent, h } from 'preact';
import { toggle_switch, toggle_slider } from './toggle-switch.scss';

const ToggleSwitch: FunctionalComponent<{ toggle: boolean; onChange?: (value: boolean) => void }> = () => {
  return (
    <label className={toggle_switch}>
      <input type="checkbox"></input>
      <span className={toggle_slider}></span>
    </label>
  );
};

export default ToggleSwitch;
