import { FunctionalComponent, h } from 'preact';

const CameraView: FunctionalComponent<{ enable: boolean; source?: string }> = ({ enable, source }) => {
  return <div className="camera_view">{enable ? <image src={source} /> : null}</div>;
};

export default CameraView;
