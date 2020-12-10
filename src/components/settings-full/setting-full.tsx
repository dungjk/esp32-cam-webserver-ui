import { FunctionalComponent, h } from 'preact';
import { IconsColor } from 'app-constants';
import ButtonSecondary from 'components/button/button-normal';
import ButtonPrimary from 'components/button/button-primary';
import Dropdown from 'components/dropdown/dropdown';
import RangeSlider from 'components/range-slider/range-slider';
import ToggleSwitch from 'components/toggle-switch/toggle-switch';
import { Close } from 'icons';
import { useState } from 'preact/hooks';
import appStore from 'store/app.store';
import { container_settings, close_setting, setting_block, setting_options, setting_foot } from './settings-full.scss';

const effectOptions = [
  {
    key: 0,
    value: 'No Effect',
  },
  { key: 1, value: 'Negative' },
  { key: 2, value: 'Grayscale' },
  { key: 3, value: 'Red Tint' },
  { key: 4, value: 'Green Tint' },
  { key: 5, value: 'Blue Tint' },
  { key: 6, value: 'Sepia' },
];

const SettingFull: FunctionalComponent = () => {
  const [open, setOpen] = useState(true);
  return (
    <nav className={container_settings}>
      <div className={close_setting}>
        <span
          title="close settings"
          onClick={() => {
            appStore.setState({ settingShow: false });
          }}
        >
          <Close size={24} color={IconsColor}></Close>
        </span>
      </div>
      <div
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        {open ? 'Yes' : 'No'}
      </div>
      <div className={setting_options}>
        <div className={setting_block}>
          <span>Light</span>
          <div>
            <RangeSlider min={0} max={100} value={20} labelMin="Off" labelMax="On" />
          </div>
        </div>
        <div className={setting_block}>
          <span>Auto Lamp</span>
          <div>
            <ToggleSwitch toggle={false} />
          </div>
        </div>
        <div className={setting_block}>
          <span>Quality</span>
          <div>
            <RangeSlider min={10} max={63} value={10} />
          </div>
        </div>
        <div className={setting_block}>
          <span>Brightness</span>
          <div>
            <RangeSlider min={-2} max={2} value={0} />
          </div>
        </div>
        <div className={setting_block}>
          <span>Contrast</span>
          <div>
            <RangeSlider min={-2} max={2} value={0} />
          </div>
        </div>
        <div className={setting_block}>
          <span>Saturation</span>
          <div>
            <RangeSlider min={-2} max={2} value={0} />
          </div>
        </div>
        <div className={setting_block}>
          <span>Special Effect</span>
          <div><Dropdown options={effectOptions} /></div>
        </div>
      </div>
      <div className={setting_foot}>
        <ButtonPrimary label="Reboot" />
        <ButtonSecondary label="Erase" />
        <ButtonPrimary label="Save" />
      </div>
    </nav>
  );
};

export default SettingFull;
