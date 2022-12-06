import * as React from "react";
import style from "./style.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function UserMovieDetails({ userReview, userRating, userMovieId, movieTitle, movieSummary}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const deleteUserMovie = async (event) => {
    try {
      await axios.delete(`http://localhost:5173/user/usermovie/${userMovieId}`);
      navigate("/");
    } catch (error) {
      console.log(`Deleted Movie from the list`);
    }
  };

  return (
    <div className={style.userMovie}>
      <div className={style.movieBanner}>
        <img src="https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_.jpg" />
      </div>
      <div className={style.userMovieContent}>
        Content
        <div>{movieTitle}</div>
        <div>Review: {userReview}</div>
        <div>
          Rating :<span>{userRating}</span>
          <div>Summary :{movieSummary}</div>
        </div>
      </div>
      <DeleteIcon variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </DeleteIcon>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you really want to delete this movie from the list?"}
          </DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={deleteUserMovie} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}