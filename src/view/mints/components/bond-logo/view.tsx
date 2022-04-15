import { Box } from '@material-ui/core';
import { CSSProperties, ReactElement } from 'react';

interface IBondLogoProps {
  bondIcon: string;
  isLP?: boolean;
  iconSize?: number;
  iconLPSize?: number;
  styles?: CSSProperties;
}

export function BondLogo(props: IBondLogoProps): ReactElement {
  const { bondIcon, iconSize = 24, isLP } = props;
  const style: CSSProperties = { height: iconSize, width: iconSize };
  
  return (
    <Box
      display="flex"
      alignItems="center"
      style={{
        width: '100%',
        marginLeft: isLP ? '-24px' : 0,
        zIndex: isLP ? 1 : 0,
      }}
    >
      <img src={bondIcon} style={style} alt="bond" />
    </Box>
  )
}