import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Dispatch } from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface AlertDialogSlideProps {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>; 
  title: string;
  text: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AlertDialogSlide({
  open,
  setOpen,
  title,
  text,
  onClose,
  onConfirm,
}: AlertDialogSlideProps) {

  const handleContinue = () => {
    onConfirm();
    setOpen(false);
  }

  const handleDiscard = () => {
    onClose();
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDiscard}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDiscard}>Descartar</Button>
          <Button onClick={handleContinue}>Continuar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}