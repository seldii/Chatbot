import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core/";
import Chatbot from "./Chatbot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentAlt,
  faTimesCircle,
  faCommentDots
} from "@fortawesome/free-solid-svg-icons";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";

const StyledDialog = withStyles({
  paper: {
    position: "absolute",
    bottom: 0,
    right: 0
  },
  backdrop: {
    position: "relative"
  }
})(Dialog);

const useStyles = makeStyles({
  chatOpen: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 10,
    color: "#fff",
    backgroundColor: deepOrange[500]
  },

  chatClose: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepPurple[500]
  }
});

const Landing = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = scrollType => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  function handleClose() {
    setOpen(false);
  }
  return (
    <div>
      <p>Lytt is here to help you</p>
      <Button
        onClick={open === false ? handleClickOpen("paper") : handleClose}
        className={classes.chatOpen}
      >
        <FontAwesomeIcon
          icon={!open ? faCommentAlt : faTimesCircle}
        ></FontAwesomeIcon>
      </Button>

      <StyledDialog
        BackdropProps={{
          style: {
            background: "transparent"
          }
        }}
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
      >
        <DialogTitle id="scroll-dialog-title">
          <FontAwesomeIcon icon={faCommentDots}></FontAwesomeIcon>Lytt
        </DialogTitle>
        <DialogContent>
          <Chatbot></Chatbot>
        </DialogContent>
      </StyledDialog>
    </div>
  );
};
export default Landing;
