import React from "react";
import moment from "moment";
import "./styles.css";

const onlineStatus = (status) => {
  if (status == 0) {
    return "Offline ⚫";
  } else if (status == 1) {
    return "Online 🟢";
  } else if (status == 2) {
    return "Busy 🔴";
  } else if (status == 3) {
    return "Away 🟠";
  } else if (status == 4) {
    return "Snooze 😴";
  } else if (status == 5) {
    return "looking to trade 🔁";
  } else if (status == 6) {
    return "looking to play 🎮";
  }
};

function ProfileInfo({ profileData }) {
  return (
    <div className="profileInfo">
      <img className="profileInfo-img" src={profileData.profileAvatar}></img>
      <div className="profileInfo-info">
        <div id="info-col1">
          <h2 className="profileInfo-name">{profileData.profileName}</h2>
          <a className="profileInfo-link" href={profileData.profileURL}>
            link to profile
          </a>
        </div>
        <div id="info-col3">
          <span>Status: {onlineStatus(profileData.status)}</span>
        </div>
        <div id="info-col4">
          {profileData.currentGame ? (
            <span>Currently playing: {profileData.currentGame}</span>
          ) : (
            ""
          )}
        </div>
        <div id="info-col2">
          <div className="profileInfo-created">
            <span>
              Account created: {moment(profileData.timeCreated).format("LL")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
