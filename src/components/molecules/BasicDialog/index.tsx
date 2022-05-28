import React, {FC} from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {Button, DialogActions} from "@mui/material";

interface DialogProps {
    open: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
    title: string;
    content: string;
}

const BasicDialog: FC<DialogProps> = ({handleClose, handleConfirm, open, title, content} ) => {
    return (
            <Dialog open={open}>
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirm} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
    );
};

export default BasicDialog;