import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Switch, TextField } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { User } from "../../types/user.interface";
import { RootState } from "../../store/reducers/client.reducer";
import { useSelector } from "react-redux";
import { Role } from "../../types/role.interface";
import { Module } from "../../types/module.interface";
import { useDispatch } from "react-redux";
import { createUser } from "../../store/reducers/user.reducer";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function NewUserDg({ 
  showNewUserDg, 
  setShowNewUserDg,
}: { 
  showNewUserDg: boolean;
  setShowNewUserDg: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState<User>({
    name: '',
    lastName: '',
    username: '',
    email: '',
    active: false,
    roles: [] as Role[],
    modules: [] as Module[],
    password: '',
  } as User);
  const { data: roles } = useSelector((state: RootState) => state.roles);
  const { data: modules } = useSelector((state: RootState) => state.modules);

  const onSaveUser = async() => {
    dispatch(createUser(newUser));
    setShowNewUserDg(false);
  }


  const onSelectRole = (event: SelectChangeEvent<string[]>) => {
    const roleNames = event.target.value as string[];
    const rolesAssigned: Role[] = [];
    roleNames.forEach(rolName => { 
      roles.forEach(role => {
        if(role.name === rolName) {
          rolesAssigned.push({
            id: role.id,
            name: role.name,
          })
        }
      })
    });
    setNewUser({
      ...newUser,
      roles: rolesAssigned
    });
  };

  const onSelectModule = (event: SelectChangeEvent<string[]>) => {
    const moduleNames = event.target.value as string[];
    const modulesAssigned: Module[] = [];
    moduleNames.forEach(moduleName => { 
      modules.forEach(module => {
        if(module.name === moduleName) {
          modulesAssigned.push({
            name: module.name,
            path: module.path,
            description: module.description,
            icon: module.icon,
          })
        }
      })
    });
    setNewUser({
      ...newUser,
      modules: modulesAssigned
    });
  }

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      open={showNewUserDg}
      onClose={() => setShowNewUserDg(false)}
    >
      <DialogTitle>Nuevo Usuario</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} padding={1}>
          <Grid item xs={4}>
            <TextField 
              id="outlined-basic" 
              label="Nombre" 
              value={newUser?.name}
              variant="outlined" 
              onChange={(event: ChangeEvent<HTMLInputElement>) => setNewUser({
                ...newUser,
                name: event.target.value
              })}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField 
              id="outlined-basic" 
              label="Apellido Paterno" 
              value={newUser?.lastName}
              variant="outlined" 
              onChange={(event: ChangeEvent<HTMLInputElement>) => setNewUser({
                ...newUser,
                lastName: event.target.value,
              })}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField 
              id="outlined-basic" 
              label="Apellido Materno" 
              value={newUser?.secondLastName || ''}
              variant="outlined" 
              onChange={(event: ChangeEvent<HTMLInputElement>) => setNewUser({
                ...newUser,
                secondLastName: event.target.value,
              })}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField 
              id="outlined-basic" 
              label="Nombre de Usuario" 
              value={newUser?.username} 
              variant="outlined" 
              onChange={(event: ChangeEvent<HTMLInputElement>) => setNewUser({
                ...newUser,
                username: event.target.value,
              })}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField 
              id="outlined-basic" 
              label="Email"
              value={newUser?.email}
              variant="outlined" 
              onChange={(event: ChangeEvent<HTMLInputElement>) => setNewUser({
                ...newUser,
                email: event.target.value,
              })}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField 
              id="outlined-basic" 
              label="Contraseña"
              value={newUser?.password}
              variant="outlined" 
              type="password"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setNewUser({
                ...newUser,
                password: event.target.value
              })}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl sx={{width: '100%' }}>
              <InputLabel id="demo-multiple-checkbox-label">Roles</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={newUser?.roles?.map(role => role.name) || []}
                onChange={onSelectRole}
                input={<OutlinedInput label="Roles" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {roles?.map((role) => (
                  <MenuItem key={role.id} value={role.name}>
                    <Checkbox checked={newUser?.roles?.map(role => role.name).indexOf(role.name) > -1} />
                    <ListItemText primary={role.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl sx={{width: '100%' }}>
              <InputLabel id="demo-multiple-checkbox-label">Modulos</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"  
                onChange={onSelectModule}
                multiple
                value={newUser.modules?.map(module => module.name) || []}
                input={<OutlinedInput label="Modulos" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {modules?.map((module) => (
                  <MenuItem key={module.path} value={module.name}>
                    <Checkbox checked={newUser?.modules.map(module => module.name).indexOf(module.name) > -1} />
                    <ListItemText primary={module.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <FormGroup>
              <FormControlLabel 
                control={
                  <Switch 
                    checked={Boolean(newUser?.active)} 
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setNewUser({
                      ...newUser,
                      active: Boolean(event.target.checked)
                  })}/>
                } 
                label="Activo" />
            </FormGroup>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button variant='outlined' color="error" onClick={() => setShowNewUserDg(false)}>Cerrar</Button>
        <Button variant='outlined' onClick={onSaveUser}>Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}