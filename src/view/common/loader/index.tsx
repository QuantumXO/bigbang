import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './styles.scss';

function Loader() {
  return (
    <div className="wrap">
      <CircularProgress size={120} color="inherit" />
    </div>
  );
}

export default Loader;
