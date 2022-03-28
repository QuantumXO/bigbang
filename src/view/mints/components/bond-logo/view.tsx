import { Box } from '@material-ui/core';
import { Bond } from '@services/helpers/bond/bond';
import { CSSProperties, ReactElement } from 'react';

interface IBondLogoProps {
  bond: Bond;
  iconSize?: number;
  iconLPSize?: number;
  styles?: CSSProperties;
}

export function BondLogo(props: IBondLogoProps): ReactElement {
  const { bond: { isLP, bondIconSvg }, iconSize = 24, iconLPSize = 24 } = props;
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