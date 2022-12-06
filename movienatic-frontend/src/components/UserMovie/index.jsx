import style from "./style.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import Box from "@mui/material/Box";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

export const UserMovie = () => {
  const [userReview, setUserReview] = useState("");
  const [userRating, setUserRating] = useState(3);
  const [userMovieId, setUserMovieId] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [movieSummary, setMovieSummary] = useState("");
  const [openDelete, setDeleteOpen] = useState(false);
  const [openUpdate, setUpdateOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteClickOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleUpdateClickOpen = () => {
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  const getUserMovies = async () => {
    const user = await JSON.parse(localStorage.getItem("user"));
    const userId = await user._id;

    const usermoviesRes = await axios.get(
      `http://localhost:5173/usermovies/${userId}`
    );
    const movieId = await usermoviesRes.data[0].movieId;
    const userMovieId = await usermoviesRes.data[0]._id;
    setUserMovieId(usermoviesRes.data[0]._id);
    setUserReview(usermoviesRes.data[0].userReview);
    setUserRating(usermoviesRes.data[0].userRating);
    console.log(usermoviesRes.data[0]);
    console.log(movieId);

    const movieRes = await axios.get(`http://localhost:5173/movie/${movieId}`);
    setMovieTitle(movieRes.data.title);
    setMovieSummary(movieRes.data.summary);
    console.log(movieRes.data);
  };

  const deleteUserMovie = async (event) => {
    try {
      await axios.delete(`http://localhost:5173/user/usermovie/${userMovieId}`);
      navigate("/");
    } catch (error) {
      console.log(`Deleted Movie from the list`);
    }
  };

  const updateUserMovie = async (event) => {
    event.preventDefault();

    const editData = JSON.parse(
      JSON.stringify({
        userReview: userReview,
        userRating: userRating,
      })
    );
    try {
      await axios.patch(`http://localhost:5173/user/${userMovieId}`, editData);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserMovies();
  }, []);

  return (
    <>
      <div className={style.userMovie}>
        <div className={style.movieBanner}>
          <img src="https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_.jpg" />
          <ChangeCircleIcon
            variant="outlined"
            onClick={handleUpdateClickOpen}
            className={style.updateIcon}
          ></ChangeCircleIcon>
        </div>
        <div className={style.userMovieContent}>
          <div>Title : {movieTitle}</div>
          <div>My Review : {userReview}</div>
          <div>
            My Rating :<span> {userRating}</span>
            <div>Summary : {movieSummary}</div>
          </div>
        </div>

        <div>
          <Dialog
            open={openDelete}
            onClose={handleDeleteClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Do you really want to delete this movie from the list?"}
            </DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteClose}>Disagree</Button>
              <Button onClick={deleteUserMovie} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div className={style.movieDetails}>

          <div>
            <Box
              component="form"
              noValidate
              onSubmit={updateUserMovie}
              sx={{ mt: 3 }}
            >
              <Dialog open={openUpdate} onClose={handleUpdateClose}>
                <DialogTitle>Change your review for this movie?</DialogTitle>
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
                  <Button onClick={handleUpdateClose}>Cancel</Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={updateUserMovie}
                  >
                    Change
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </div>
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Typography component="legend">Rate Again</Typography>
            <Rating
              name="simple-controlled"
              value={userRating}
              onChange={(event, newValue) => {
                setUserRating(newValue);
              }}
            />
          </Box>
        </div>

        <DeleteIcon variant="outlined" onClick={handleDeleteClickOpen}>
          Open alert dialog
        </DeleteIcon>
      </div>
    </>
  );
};

export default UserMovie;

// import style from "./style.module.css";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import UserMovieDetails from "../UserMovieDetails";
// import { useNavigate } from "react-router-dom";

// export const UserMovie = () => {
//   const [userReview, setUserReview] = useState("");
//   const [userRating, setUserRating] = useState("");
//   const [userMovieId, setUserMovieId] = useState("");
//   const [movieTitle, setMovieTitle] = useState("");
//   const [movieSummary, setMovieSummary] = useState("");
//   const [userMovieList, setUserMovieList] = useState([]);

//   const getUserMovies = async () => {
//     const user = await JSON.parse(localStorage.getItem("user"));
//     const userId = await user._id;

//     const usermoviesRes = await axios.get(
//       `http://localhost:5173/usermovies/${userId}`
//     );
//     const movieId = await usermoviesRes.data[0].movieId;
//     setUserMovieId(usermoviesRes.data[0]._id);
//     setUserReview(usermoviesRes.data[0].userReview);
//     setUserRating(usermoviesRes.data[0].userRating);
//     console.log(usermoviesRes.data[0]);
//     setUserMovieList(usermoviesRes.data)

//     console.log(usermoviesRes.data);

//     const movieRes = await axios.get(`http://localhost:5173/movie/${movieId}`);
//     setMovieTitle(movieRes.data.title);
//     setMovieSummary(movieRes.data.summary);
//   };

//   useEffect(() => {
//     getUserMovies();
//   }, []);

//   return (
//     <>
//       {userMovieList.map(userMovie => (
//         <UserMovieDetails
//         userReview={userMovie.userReview}
//         userRating={userMovie.userRating}
//         userMovieId={userMovie.userMovieId}
//         movieTitle={userMovie.movieTitle}
//         movieSummary={userMovie.movieSummary}
//       />
//       ))}

//     </>
//   );
// };

// export default UserMovie;
