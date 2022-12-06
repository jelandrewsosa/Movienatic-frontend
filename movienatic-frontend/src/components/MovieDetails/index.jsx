import style from './style.module.css'
import AddCard from '@mui/icons-material/AddCard';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MovieDetails = ({movie}) => {
  const [userReview, setUserReview] = useState('');
  const [userRating, setUserRating] = useState(3);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = (user._id);
  const movieId = movie._id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = JSON.parse(
      JSON.stringify({
        userReview,
        userRating,
      })
    );
    try {
      await axios.post(`http://localhost:5173/user/${movieId}/${userId}`, data);
      console.log(`Added review and rating for Movie ${movie.title} to my watched list`);
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.movieDetails}>
      <AddCard variant="outlined" onClick={handleClickOpen}>
      </AddCard>
      <h4>Title: {movie.title}</h4>
      <span>Genres: {movie.details.genres}</span>
      <span>Release Date: {movie.details.releaseDate}</span>

      <div>
        <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add To Your Watched Movie Collection?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                If Yes, Please Give your Rating and Review.
              </DialogContentText>

              <TextField
                autoFocus
                margin="dense"
                name="userReview"
                id="userReview"
                onChange={(e) => setUserReview(e.target.value)}
                value={userReview}
                label="User Review"
                type="userReview"
                fullWidth
                variant="standard"
              />

            </DialogContent>
            <DialogActions>
              <Box
                sx={{
                  '& > legend': { mt: 2 },
                }}
              >
                <Typography component="legend">Rate Movie</Typography>
                <Rating
                  name="simple-controlled"
                  value={userRating}
                  onChange={(event, newValue) => {
                    setUserRating(newValue);
                  }}
                />
              </Box>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}>Add</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </div>
    </div>
  )
}

export default MovieDetails;