import { h, FunctionalComponent } from 'preact';
import { connect } from 'unistore/preact';
import SettingFull from './settings-full/setting-full';
import MenuBar from './menu-bar/menu-bar';
import CameraView from './camera-view/camera-view';
import { section_main, content } from './app-component.scss';

const App: FunctionalComponent<{ settingShow: boolean; cameraUrl: string; cameraEnable: boolean }> = ({
  settingShow,
  cameraUrl,
  cameraEnable,
}) => {
  return (
    <section className={section_main}>
      <MenuBar />
      <div className={content}>
        {settingShow && <SettingFull />}
        <div>
          <CameraView source={cameraUrl} enable={cameraEnable} />
        </div>
      </div>
    </section>
  );
};

const mapToProps = ({ cameraUrl, cameraEnable, settingShow }) => ({ cameraUrl, cameraEnable, settingShow });
export default connect(mapToProps)(App);
