import { useState, useEffect } from "react";
import "./lifeWasted.css";
import { accomplishments } from "./data";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import TopFive from "./components/TopFive/TopFive";
import WastedPotential from "./components/WastedPotential/WastedPotential";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Loading from "./components/Loading/Loading";
import Odometer from "react-odometerjs";

function LifeWasted() {
  const [steamIdInput, setSteamIdInput] = useState("76561199005985110");
  const [totalPlayTime, setTotalPlayTime] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [top5Games, setTop5Games] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (steamId) => {
    let result = await fetch(`http://localhost:3000/getOwnedGames/${steamId}`, {
      method: "GET",
    });

    result = await result.json();
    if (result.status == 400) {
      return result.message;
    }
    const allGames = result?.response?.games;
    return allGames;
  };

  const fetchGameData = async (playerGameInfo) => {
    const appId = playerGameInfo.appid;
    let result = await fetch(`http://localhost:3000/getGameInfo/${appId}`, {
      method: "GET",
    });
    result = await result.json();
    const gameinfo = result?.[appId]?.data;
    return {
      name: gameinfo.name,
      image: gameinfo.capsule_image,
      playTime: playerGameInfo?.playtime_forever,
      appID: appId,
    };
  };

  const fetchProfileData = async (steamId) => {
    let result = await fetch(
      `http://localhost:3000/getProfileData/${steamId}`,
      {
        method: "GET",
      }
    );
    result = await result.json();
    const profileData = result?.response?.players[0];
    return {
      profileName: profileData?.personaname,
      profileAvatar: profileData?.avatarfull,
      profileURL: profileData?.profileurl,
      timeCreated: profileData?.timecreated * 1000,
      lastLogOff: profileData?.lastlogoff * 1000,
      currentGame: profileData?.gameextrainfo,
      status: profileData?.personastate,
    };
  };

  const calcTotalPlayTime = (gameList) => {
    // calc total play time
    let totalTime = 0;
    for (let game of gameList) {
      totalTime += game.playtime_forever;
    }

    return totalTime;
  };

  const getTopFiveGames = (gameList) => {
    function sortByPlayTime(a, b) {
      if (a.playtime_forever < b.playtime_forever) {
        return -1;
      }
      if (a.playtime_forever > b.playtime_forever) {
        return 1;
      }
      return 0;
    }
    // get top played games
    let topFiveGames = gameList.sort(sortByPlayTime).reverse().slice(0, 5);
    // console.log(topFiveGames);
    return topFiveGames;
  };

  const getPlayerData = async (steamId) => {
    setLoading(true);
    const gameList = await fetchData(steamId);
    if (typeof gameList == "string") {
      setError(gameList);
    } else {
      setError(null);
      const profileData = await fetchProfileData(steamId);
      setProfileData(profileData);

      const totalTime = calcTotalPlayTime(gameList);
      setTotalPlayTime(totalTime / 60);

      const topFive = getTopFiveGames(gameList);

      let top5Games = [];
      for (let game of topFive) {
        const gameInfo = await fetchGameData(game);
        top5Games.push(gameInfo);
      }
      setTop5Games(top5Games);
    }
    setLoading(false);
  };

  return (
    <div className="lifeWasted">
      {/* <h2>Enter Steam Id</h2> */}
      <h1>Steam Hours</h1>
      <img
        className="steamLogo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png"
      ></img>
      <div className="lifeWasted-input-wrapper">
        <div className="input-btn">
          <input
            className="lifeWasted-input"
            type="text"
            placeholder="Enter Steam ID"
            value={steamIdInput}
            onChange={(e) => setSteamIdInput(e.target.value)}
          />
          <button
            className="lifeWasted-button"
            onClick={() => getPlayerData(steamIdInput)}
          >
            Enter
          </button>
        </div>
        <button
          className="lifeWasted-button topWasted"
          onClick={() => getPlayerData("76561197960372450")}
        >
          Check Top Wasted Life
        </button>
      </div>
      {loading && <Loading />}
      {error ? (
        <ErrorPage error={error} />
      ) : (
        <>
          <span className="hoursWasted">
            {totalPlayTime ? Math.floor(totalPlayTime) + " Hours Wasted!" : ""}
          </span>

          {totalPlayTime && Math.floor(totalPlayTime * 0.000114155) > 0 ? (
            <p className="timeSpent">
              {" "}
              {"You spent " +
                Math.floor(totalPlayTime * 0.000114155) +
                " YEAR(S) of your life playing games on steam"}{" "}
            </p>
          ) : (
            ""
          )}

          {Math.floor(totalPlayTime * 0.000114155) < 1 && totalPlayTime ? (
            <p className="timeSpent">
              {" "}
              {"You spent " +
                Math.floor(totalPlayTime * 0.00136986) +
                " MONTH(S) of your life playing games on steam "}{" "}
            </p>
          ) : (
            ""
          )}

          {Object.keys(profileData).length > 0 && (
            <ProfileInfo profileData={profileData} />
          )}
          <TopFive top5Games={top5Games} />
          <WastedPotential
            top5Games={top5Games}
            totalPlayTime={totalPlayTime}
          />
        </>
      )}
    </div>
  );
}

export default LifeWasted;
