import React, { useState, useEffect } from "react";
import * as sessionActions from '../../store/session';
import './Navigation.css';
import {NavLink} from "react-router-dom";
// import { oneUser } from "../../store/user"
import { loadAllUsers } from "../../store/allUsers";
import {ReactComponent as SVG} from "../../logo.svg";
import Popup from "reactjs-popup"
import {useDispatch, useSelector} from "react-redux"


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  // const currentUser = useSelector(state => state.user.user);

  // console.log("THIS IS CURRENT USER------", currentUser)

  const allUsers = useSelector(state => state.allUsers.user);
  console.log("THIS IS ALL USERS----", allUsers)

  const users = {};
  allUsers?.forEach((user) => {
    users[user.id] = user;
  });
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

    useEffect (() => {
      dispatch(loadAllUsers())
    },[dispatch])


  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  
  return (
    <>
    <div className="together">
            <Popup
              trigger ={users[user?.id]?.profileUrl ? <img src={users[user?.id]?.profileUrl} onClick={openMenu} className="profile-homepage side"></img>:
              <img src="https://cdn.myportfolio.com/0da7f5fbc31f3b0a622becb5c04363c6/ee759715-7080-4029-8458-50a20bff014c_rw_1920.jpg?h=ba7face07c8aec7970909f3eb3c91045" className="profile-homepage side" onClick={openMenu}></img>
              }
              position="bottom right"
              className="foo"
              closeOnDocumentClick
              >
                <ul className="pro">
                  <div className="side">
                    <div>
                      <NavLink to={`/users/${user?.id}`}>            
                        <li className="username">{user?.username}</li>
                      </NavLink>
                    </div>
                    <li>
                        <NavLink to={`/users/${user?.id}/edit`}> 
                          Settings
                        </NavLink>
                      </li>
                    <div className="user">
                      <li>
                        <NavLink exact to="/">
                        <button onClick={logout} className="logout">Log Out</button>
                        </NavLink>
                      </li>
                    </div>
                  </div>
                </ul>
          </Popup>
    </div>
    </>
  );
}

export default ProfileButton;