import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { Box, List, ListItemText } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { StyledNavItem, StyledNavItemIcon } from './styles';
import SvgColor from '../SvgColor';

const items = [{
  path: 'documentos',
  title: 'Documentos',
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

const fIcon = (name: string) => (
  <SvgColor src={`/assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

export default function NavSection(): JSX.Element {
  const { pathname } = useLocation();
  return (
    <Box>
      <List disablePadding sx={{ p: 1 }}>
        {items.map((item) => (
          <StyledNavItem
            component={RouterLink}
            to={item.path}
            key={item.path}
            sx={{
              '&.active': {
                color: 'white',
                bgcolor: 'white',
                fontWeight: 'fontWeightBold',
                backgroundColor: alpha('#919EAB', 0.15),
              },
            }}
          >
            <StyledNavItemIcon sx={{
              color: pathname.split('/')[1] === item.path ? 'primary.main' : 'white',
            }}>
              {fIcon(item.icon)} 
            </StyledNavItemIcon>
    
          <ListItemText sx={{ color: 'white' }} disableTypography primary={item.title} />
        </StyledNavItem>
        ))}
      </List>
    </Box>
  );
}
