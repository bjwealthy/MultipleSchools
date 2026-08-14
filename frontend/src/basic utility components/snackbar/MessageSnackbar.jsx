import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
//import IconButton from '@mui/material/IconButton';
//import CloseIcon from '@mui/icons-material/Close';
import {Alert} from '@mui/material'; 

export default function MessageSnackbar({ open, message, messageType, handleClose }) {
  
  return (
    <div>
      <Snackbar
        open={true}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={messageType || "info"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
