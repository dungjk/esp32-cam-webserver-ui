import { FunctionalComponent, h } from 'preact';
import { range_slider, min_max, slider_control } from './range-slider.scss';

const RangeSlider: FunctionalComponent<{
  min: number;
  max: number;
  value: number;
  labelMin?: string;
  labelMax?: string;
  onChange?: (value: number) => void;
}> = ({ min, max, value, labelMin, labelMax, onChange }) => {
  const onValueChange = (e) => {
    const value = e.target.value;
    onChange && onChange(value);
  };
  return (
    <div className={range_slider}>
      <div className={slider_control}>
        <input type="range" min={min} max={max} value={value || 0} onChange={onValueChange}></input>
      </div>
      <div className={min_max}>
        <span>{labelMin ?? min}</span>
        <span>{labelMax ?? max}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
