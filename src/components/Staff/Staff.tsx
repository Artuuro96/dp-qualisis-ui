import { 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  Modal, 
  Button, 
  Chip, 
  Typography, 
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Switch,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  FormGroup,
} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useTitleContext } from "../../context/TitleContext";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers, updateUser } from "../../store/reducers/user.reducer";
import { RootState } from "../../store/reducers/client.reducer";
import PermissionBoxes from "./PermissionBoxes";
import { useLoaderContext } from "../../context/LoaderContext";
import { User } from "../../types/user.interface";
import { Role } from "../../types/role.interface";
import { getRoles } from "../../store/reducers/role.reducer";
import { getModules } from "../../store/reducers/module.reducer";
import { Module } from "../../types/module.interface";
import { getPermissionsByRoleId } from "../../store/reducers/permission.reducer";
import { NewUserDg } from "./NewUserDg";
import { useAlertContext } from "../../context/AlertContext";
import { getErrorMessage } from "../../utils/get-context.util";
import { format } from "date-fns";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
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

export default function Staff(): JSX.Element {
  const { setTitle } = useTitleContext();
  const { setShowLoader } = useLoaderContext();
  const { setAlert } = useAlertContext();
  const { data: users, loading, error } = useSelector((state: RootState) => state.users);
  const { data: roles } = useSelector((state: RootState) => state.roles);
  const { data: modules } = useSelector((state: RootState) => state.modules);
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [isUpdateUserEnabled, setIsUpdateUserEnabled] = useState<boolean>(false);
  const [showNewUserDg, setShowNewUserDg] = useState<boolean>(false);
  const [userSelected, setUserSelected] = useState<User>(users[0]);

  const handleClose = () => setOpen(false);

  const onSelectRole = (event: SelectChangeEvent<string[]>) => {
    const roleNames = event.target.value as string[];
    const rolesAssigned: Role[] = [];
    roleNames.forEach(rolName => { 
      roles.forEach(rol => {
        if(rol.name === rolName) {
          rolesAssigned.push({
            id: rol.id,
            name: rol.name
          })
        }
      })
    });
    setUserSelected({
      ...userSelected,
      roles: rolesAssigned
    });
  };

  const onSelectModule = (event: SelectChangeEvent<string[]>) => {
    const moduleNames = event.target.value as string[];
    const modulesAssigned: Module[] = [];
    moduleNames.forEach(moduleName => { 
      modules.forEach(module => {
        if(module.name === moduleName) {
          modulesAssigned.push({...module})
        }
      })
    });
    setUserSelected({
      ...userSelected,
      modules: modulesAssigned
    });
  }

  const onDeleteUser = (userId: string) => {
    dispatch(deleteUser(userId));
    setOpen(false);
  }

  const onUpdateUser = () => {
    dispatch(updateUser(userSelected as User))
    setIsUpdateUserEnabled(false);
  }

  const handleEnableUpdateUser = (user: User) => {
    setUserSelected(user);
    setIsUpdateUserEnabled(true);
    dispatch(getPermissionsByRoleId(user.activeRole.id))
  }
  
  useEffect(() => {
    setShowLoader(true)
    if(!loading) {
      setShowLoader(false);
    }
    if(error) {
      setAlert({
        message: getErrorMessage(error),
        type: 'error',
        isOpen: true,
      })
    }
  }, [dispatch, setTitle, loading, setShowLoader, error, users, setAlert]);

  useEffect(() => {
    setTitle('Personal');
    dispatch(getUsers());
    dispatch(getRoles());
    dispatch(getModules());
  }, [setTitle, dispatch])

  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Permisos
        </Typography>
          <PermissionBoxes />
        </Box>
      </Modal>
      <Grid item xs={6} marginBottom={1}>
        <Box display="flex" alignItems="center" justifyContent='flex-end' gap={1}>
          <Button 
            variant="contained" 
            size='medium' 
            startIcon={<AddBoxIcon/>}
            onClick={() => setShowNewUserDg(true)}
          >
            Nuevo Usuario
          </Button>
        </Box>
      </Grid>
      <Box>
        <Card sx={{ minWidth: 275, borderColor: (theme) => theme.palette.background.default, borderWidth: '3px', borderStyle: 'solid'}}>
          <CardContent>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={1.7}>
                Nombre
              </Grid>
              <Grid item xs={1.3}>
                Usuario
              </Grid>
              <Grid item xs={2}>
                Correo Electrónico
              </Grid>
              <Grid item xs={1.5}>
                Roles
              </Grid>
              <Grid item xs={1.5}>
                Fecha de Creación
              </Grid>
              <Grid item xs={2}>
                Modulos
              </Grid>
              <Grid item xs={1}>
                Activo
              </Grid>
              <Grid item xs={1}>
                Acción
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Grid paddingTop={2}>
          {users.map((user, index) => (
            <Grid paddingTop={1} key={index}>
              <Card sx={{ minWidth: 275, borderColor: (theme) => theme.palette.background.default, borderWidth: '1px', borderStyle: 'solid'}}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={1.7}>
                      {user.name} {user.lastName}
                    </Grid>
                    <Grid item xs={1.3}>
                      {user.username}
                    </Grid>
                    <Grid item xs={2}>
                      {user.email}
                    </Grid>
                    <Grid item xs={1.5}>
                      <Box sx={{ width: 100 }}>
                        <Chip
                          sx={{
                            height: 'auto',
                            '& .MuiChip-label': {
                              display: 'block',
                              whiteSpace: 'normal',
                            },
                          }}
                          label={user.roles?.map(role => role.name).join(' ').replace(' ', '\t')}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={1.5}>
                      {format(user?.createdAt || new Date(), 'dd/MM/yyyy HH:mm:ss')}
                    </Grid>
                    <Grid item xs={2}>
                    <Box sx={{ width: 100 }}>
                      <Chip
                        sx={{
                          height: 'auto',
                          '& .MuiChip-label': {
                            display: 'block',
                            whiteSpace: 'normal',
                          },
                        }}
                        label={user.modules?.map(module => module.name).join(' ').replace(' ', '\t')}
                      />
                    </Box>
                    </Grid>
                    <Grid item xs={1}>
                      <Chip
                        label={user.active ? 'activo' : 'desactivado'}
                        color={user.active ? 'success' : 'error'}
                        sx={{ color: "white" }} 
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton aria-label="edit" onClick={() => handleEnableUpdateUser(user)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => onDeleteUser(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Dialog
        fullWidth
        maxWidth='md'
        open={isUpdateUserEnabled}
        onClose={() => setIsUpdateUserEnabled(false)}
      >
        <DialogTitle>Actualizar Usuario</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} padding={1}>
            <Grid item xs={4}>
              <TextField 
                id="outlined-basic" 
                label="Nombre" 
                value={`${userSelected?.name} ${userSelected?.lastName}`} 
                variant="outlined" 
                size="small"
                onChange={(event: ChangeEvent<HTMLInputElement>) => setUserSelected({
                  ...userSelected,
                  name: event.target.value.split(' ')[0],
                  lastName: event.target.value.split(' ')[1]
                })}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField 
                id="outlined-basic" 
                label="Nombre de Usuario" 
                value={userSelected?.username} 
                variant="outlined" 
                size="small"
                onChange={(event: ChangeEvent<HTMLInputElement>) => setUserSelected({
                  ...userSelected,
                  username: event.target.value
                })}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField 
                id="outlined-basic" 
                label="Email"
                value={userSelected?.email}
                variant="outlined" 
                size="small"
                onChange={(event: ChangeEvent<HTMLInputElement>) => setUserSelected({
                  ...userSelected,
                  email: event.target.value
                })}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
            <FormControl sx={{width: '100%' }} size="small">
              <InputLabel id="demo-multiple-checkbox-label">Roles</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={userSelected?.roles?.map(role => role.name)}
                onChange={onSelectRole}
                input={<OutlinedInput label="Rol Activo " />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {roles?.map((role) => (
                  <MenuItem key={role.id} value={role.name}>
                    <Checkbox checked={userSelected?.roles?.map(role => role.name).indexOf(role.name) > -1} />
                    <ListItemText primary={role.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{width: '100%' }} size="small">
                <InputLabel id="demo-multiple-checkbox-label">Modulos</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"  
                  multiple
                  value={userSelected?.modules.map(module => module.name)}
                  onChange={onSelectModule}
                  input={<OutlinedInput label="Modulos" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {modules?.map((module) => (
                    <MenuItem key={module.path} value={module.name}>
                      <Checkbox checked={userSelected?.modules.map(module => module.name).indexOf(module.name) > -1} />
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
                      checked={Boolean(userSelected?.active)} 
                      onChange={(event: ChangeEvent<HTMLInputElement>) => setUserSelected({
                        ...userSelected,
                        active: Boolean(event.target.checked)
                    })}/>
                  } 
                  label="Activo" />
              </FormGroup>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button variant='outlined' color="error" onClick={() => setIsUpdateUserEnabled(false)}>Cerrar</Button>
          <Button variant='outlined' onClick={onUpdateUser} >Guardar</Button>
        </DialogActions>
      </Dialog>
      <NewUserDg showNewUserDg={showNewUserDg} setShowNewUserDg={setShowNewUserDg} />
    </>
  )
}