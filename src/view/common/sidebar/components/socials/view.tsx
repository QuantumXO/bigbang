import React, { ReactElement, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import '@view/common/sidebar/components/socials/styles.scss';

interface IProps {
  styles?: CSSProperties;
}

interface ISocial {
  id: string;
  url: string;
}

const socials: ISocial[] = [
  { id: 'tw', url: '/' },
  { id: 'reddit', url: '/' },
  { id: 'discord', url: '/' },
];

export const Socials = ({ styles = {} }: IProps): ReactElement => {
  return (
    <div className="socials" style={styles}>
      <span className="title">{'Social channels'}</span>
      <div className="list">
        {socials.map(({ id, url }: ISocial): ReactElement => {
          return (
            <Link
              to={url}
              key={id}
              className={cx('social', id )}
            />
          );
        })}
      </div>
    </div>
  );
};