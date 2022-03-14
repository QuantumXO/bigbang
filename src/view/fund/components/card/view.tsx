import { FC, ReactElement } from 'react';
import cx from 'classnames';

import "./styles.scss";

export interface ICardProps {
  index: number;
  icon?: string;
  title?: string;
  value?: string;
  color: string;
  percent?: number;
  isSelected?: boolean;
  handleSelect: (index: number) => void;
}

export const Card: FC<ICardProps> = (props: ICardProps): ReactElement => {
  const { isSelected, icon, title, value, color = '#A0A1A8' } = props;
  return (
    <div className={cx('card', { active: isSelected })}>
      {icon && <img src={icon} alt="icon" className="icon" />}
      <div>
        <div className="title">{title}</div>
        <div className="value">{`$${value}`}</div>
      </div>
      <span className="tag" style={{ backgroundColor: color }} />
    </div>
  );
};