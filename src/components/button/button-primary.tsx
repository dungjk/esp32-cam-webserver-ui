import { FunctionalComponent, h } from 'preact';
import classNames from 'classnames';
import { button_base, button_primary } from './button.scss';

const ButtonPrimary: FunctionalComponent<{ label: string; onClick?: () => void }> = ({ label }) => {
  return <button className={classNames(button_base, button_primary)}>{label}</button>;
};

export default ButtonPrimary;
