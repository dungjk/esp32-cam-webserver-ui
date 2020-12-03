import { FunctionalComponent, h } from 'preact';
import classNames from 'classnames';
import { button_base, button_secondary } from './button.scss';

const ButtonSecondary: FunctionalComponent<{ label: string; onClick?: () => void }> = ({ label }) => {
  return <button className={classNames(button_base, button_secondary)}>{label}</button>;
};

export default ButtonSecondary;
