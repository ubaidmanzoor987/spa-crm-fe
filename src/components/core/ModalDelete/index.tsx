import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxTypedHooks";
import { getAppDataSelector } from "@/store/app";
import { setDeleteModal } from "@/store/app/appSlice";
import ButtonX from "@/components/core/Button";
import {
  DialogTitleStyle,
  DialogContentTextStyle,
  DialogActionsStyle,
} from "./index.style";
import { CircularProgress } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteModal() {
  const dispatch = useAppDispatch();
  const { deleteModal } = useAppSelector(getAppDataSelector);

  const handleClose = () => {
    dispatch(
      setDeleteModal({
        ...deleteModal,
        visibile: false,
      })
    );
  };

  return (
    <Dialog
      open={deleteModal.visibile}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitleStyle>{deleteModal.title}:</DialogTitleStyle>
      <DialogContent>
        <DialogContentTextStyle id="alert-dialog-slide-description">
          {deleteModal.description}
        </DialogContentTextStyle>
      </DialogContent>
      <DialogActionsStyle>
        <ButtonX id="btn-1" onClick={handleClose}>
          No
        </ButtonX>
        <ButtonX
          onClick={deleteModal.onClickYes}
          disabled={deleteModal.isDeleting}
        >
          {deleteModal.isDeleting === true ? (
            <CircularProgress size={20} />
          ) : (
            "Yes"
          )}
        </ButtonX>
      </DialogActionsStyle>
    </Dialog>
  );
}
