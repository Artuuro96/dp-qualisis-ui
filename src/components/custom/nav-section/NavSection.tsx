import { NavLink as RouterLink } from 'react-router-dom';
import { Box, List, ListItemText } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { StyledNavItem, StyledNavItemIcon } from './styles';
import SvgColor from '../SvgColor';

const items = [{
  path: 'ordenes',
  title: 'Ordenes',
  icon: 'order',
}, 
{
  path: 'asignaciones',
  title: 'Asignaciones',
  icon: 'assignment'
},
{
  path: 'personal',
  title: 'Personal',
  icon: 'staff'
},
{
  path: 'clientes',
  title: 'Clientes',
  icon: 'client'
},
{
  path: 'herramientas',
  title: 'Herramientas',
  icon: 'tool'
}];

const fIcon = (name: string) => <SvgColor src={`assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

export default function NavSection(): JSX.Element {
  return (
    <Box>
      <List disablePadding sx={{ p: 1 }}>
        {items.map((item) => (
          <StyledNavItem
            component={RouterLink}
            to={item.path}
            sx={{
              '&.active': {
                color: 'white',
                bgcolor: 'white',
                fontWeight: 'fontWeightBold',
                backgroundColor: alpha('#919EAB', 0.70),
              },
            }}
          >
          <StyledNavItemIcon>{fIcon(item.icon)}</StyledNavItemIcon>
    
          <ListItemText sx={{ color: 'white' }} disableTypography primary={item.title} />
        </StyledNavItem>
        ))}
      </List>
    </Box>
  );
}
