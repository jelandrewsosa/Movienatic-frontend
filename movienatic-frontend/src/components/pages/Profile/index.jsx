import { useEffect, useState } from "react";
import style from './style.module.css'

// Component
import UserNavBar from '../../UserNavBar'
import UserMovie from "../../UserMovie";

const Profile = () => {

  const user = JSON.parse(localStorage.getItem("user"));

    return (
      <>
        <UserNavBar />
        <div className={style.profile}>
          <div className={style.leftSidePanel}>
            <div className={style.profilePic}>
              <img src="https://i.kym-cdn.com/entries/icons/original/000/026/152/gigachad.jpg" />
            </div>
            <div className={style.userName}>
              <h2>{user.firstName}</h2>
            </div>
            <div className={style.favoriteGenre}>
              <h4>Favorite Genre</h4>
              <span>Horror/Fantasy/Fiction</span>
            </div>
            <div className={style.featuredMovie}>
              <img src="https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_.jpg" />
              <h4>Featured Favorite</h4>
              <span>Black Panther</span>
            </div>
          </div>
          <div className={style.vl}></div>
          <div className={style.rightSidePanel}>
            <div className={style.profileNav}>
              <div>
                Movies Watched
              </div>
              <div>
                My Reviews
              </div>
              <div>
                Personal Blog
              </div>
              <div>
                Favorites
              </div>
            </div>
            <UserMovie />
          </div>
        </div>
      </>
  
    )

}

export default Profile;