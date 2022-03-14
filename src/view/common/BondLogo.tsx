import { Box } from '@material-ui/core';
import { Bond } from '@services/helpers/bond/bond';
import { CSSProperties } from 'react';

interface IBondLogoProps {
  bond: Bond;
  iconSize?: number;
  iconLPSize?: number;
  styles?: CSSProperties;
}

function BondLogo({ bond: { isLP, bondIconSvg }, iconSize = 24, iconLPSize = 24 }: IBondLogoProps) {
  let style = { height: iconSize, width: iconSize };
  
  if (isLP) {
    style = { height: iconLPSize, width: iconLPSize * 2 };
  }
  
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{
        marginLeft: isLP ? -iconLPSize : 0,
      }}
    >
      <img src={bondIconSvg} style={style} alt="bond" />
    </Box>
  )
}

export default BondLogo;
