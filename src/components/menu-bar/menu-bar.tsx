import { Sliders, Aperture, Television } from 'icons';
import { FunctionalComponent, h } from 'preact';
import appActions from '../../store/app.actions';
import { connect } from 'redux-zero/preact';
import classNames from 'classnames';
import { menu_bar, menu_item, menu_active, menu_disable } from './menu-bar.scss';
import { IconsColor } from 'app-constants';

const MenuBar: FunctionalComponent<{
  settingShow: boolean;
  toggleSetting: (show: boolean) => void;
}> = ({ settingShow, toggleSetting }) => {
  return (
    <nav className={menu_bar}>
      <div
        className={classNames(menu_item, settingShow ? classNames(menu_disable, menu_active) : null)}
        onClick={() => {
          toggleSetting(!settingShow);
        }}
      >
        <Sliders size={16} color={IconsColor} />
        <span>Settings</span>
      </div>
      <div className={menu_item}>
        <Aperture size={16} color={IconsColor} />
        <span>Capture</span>
      </div>
      <div className={menu_item}>
        <Television size={16} color={IconsColor} />
        <span>Start Stream</span>
      </div>
    </nav>
  );
};

const mapToProps = ({ settingShow }) => ({ settingShow });
export default connect(mapToProps, appActions)(MenuBar);
