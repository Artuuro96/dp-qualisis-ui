import { Box, Card, CardContent, Grid } from "@mui/material"
import { useTitleContext } from "../context/TitleContext";
import { useEffect } from "react";
import SelectRole from "./SelectRole";

export default function Staff(): JSX.Element {
  const { setTitle } = useTitleContext();
  const users = [
    {
      name: 'Arturo',
      username: 'arturo96',
      email: 'arturorodr96@gmail.com',
      permissions: ['create:users', 'get:users'],
      roles: ['worker', 'metrologo', 'admin'],
      modulos: ['tools', 'users', 'staff'],
      active: true,
    }
  ]
  
  useEffect(() => {
    setTitle('Personal');
  }, [setTitle]);

  return (
    <Box>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={2}>
              Nombre
            </Grid>
            <Grid item xs={2}>
              Usuario
            </Grid>
            <Grid item xs={2}>
              Rol
            </Grid>
            <Grid item xs={2}>
              Permisos
            </Grid>
            <Grid item xs={2}>
              Modulos
            </Grid>
            <Grid item xs={2}>
              Activo
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {users.map(user => (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                {user.name}
              </Grid>
              <Grid item xs={2}>
                {user.username}
              </Grid>
              <Grid item xs={2}>
                <SelectRole data={user.roles}/>
              </Grid>
              <Grid item xs={2}>
                {JSON.stringify(user.permissions)}
              </Grid>
              <Grid item xs={2}>
                {JSON.stringify(user.modulos)}
              </Grid>
              <Grid item xs={2}>
                {user.active.toString()}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}