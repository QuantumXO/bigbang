import React, { ReactElement, CSSProperties } from 'react';
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
  { id: 'telegram', url: 'https://t.me/yelfinance' },
  { id: 'tw', url: 'https://twitter.com/yel_finance' },
  { id: 'medium', url: 'https://yel-finance.medium.com' },
];

export const Socials = ({ styles = {} }: IProps): ReactElement => {
  return (
    <div className="socials" style={styles}>
      <span className="title">{'Social channels'}</span>
      <div className="list">
        {socials.map(({ id, url }: ISocial): ReactElement => {
          return (
            <a
              href={url}
              key={id}
              target="_blank"
              className={cx('social', id )}
            />
          );
        })}
      </div>
    </div>
  );
};