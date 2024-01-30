/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from 'react';
import { Box } from '@mui/material';


const SvgColor = forwardRef<HTMLSpanElement>(({ src, sx, ...other }: any, ref) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: 'inline-block',
      bgcolor: 'currentColor',
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx,
    }}
    {...other}
  />
));

export default SvgColor;
