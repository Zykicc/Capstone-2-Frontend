import "./styles.css";

function TopFive({ top5Games }) {
  return (
    <div className="topFive">
      <div className="topFive-title">
        {top5Games.length > 0 && <h2>TOP 5 GAMES</h2>}
      </div>
      {top5Games.map((game, index) => {
        return (
          <div
            key={index}
            className="topFive-card"
            onClick={() => {
              window
                .open(
                  `https://store.steampowered.com/app/${game.appID}`,
                  "_blank"
                )
                .focus();
            }}
          >
            <div key={index}>
              <div className="topFive-infoWrap">
                <img className="topFive-img" src={game.image} alt="" />
                <div className="topFive-hours">
                  <b>{game.name}</b>
                  <span> : {Math.floor(game.playTime / 60)} Hours</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TopFive;
