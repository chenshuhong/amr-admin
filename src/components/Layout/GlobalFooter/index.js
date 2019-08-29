import React from 'react';
import styles from './index.less';

const GlobalFooter = ({ className, links, copyright }) => {
  const clsString = cn(styles.globalFooter, className);
  return (
    <div className={clsString}>
      {links && (
        <div className={styles.links}>
          {links.map(link => (
            <a key={link.key} target={link.blankTarget ? '_blank' : '_self'} href={link.href}>
              {link.title}
            </a>
          ))}
        </div>
      )}
      {copyright && <div className={styles.copyright}>{copyright}</div>}
    </div>
  );
};

// 指定 props 的默认值：
GlobalFooter.defaultProps = {
  copyright: 'Ant Design + React + Mobx ©2018 Created by baiye'
};

export default GlobalFooter;
