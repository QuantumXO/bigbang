import { Box } from '@material-ui/core';
import { Bond } from '@services/common/bond';
import { CSSProperties, ReactElement } from 'react';

interface IBondLogoProps {
  bond: Bond;
  iconSize?: number;
  iconLPSize?: number;
  styles?: CSSProperties;
}

export function BondLogo(props: IBondLogoProps): ReactElement {
  const { bond: { bondIconSvg }, iconSize = 24 } = props;
  const style = { height: iconSize, width: iconSize };
  
  return (
    <Box
      display="flex"
      alignItems="center"
      style={{
        width: '100%',
      }}
    >
      <img src={bondIconSvg} style={style} alt="bond" />
    </Box>
  )
}