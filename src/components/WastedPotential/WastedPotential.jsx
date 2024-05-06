import React from "react";
import { accomplishments } from "../../data";

function WastedPotential({ top5Games, totalPlayTime }) {
  function compareHoursRequired(a, b) {
    if (a.hours_required < b.hours_required) {
      return -1;
    }
    if (a.hours_required > b.hours_required) {
      return 1;
    }
    return 0;
  }
  return (
    <div>
      {totalPlayTime && top5Games.length > 0 && <h1>Wasted Potential</h1>}
      {totalPlayTime &&
        top5Games.length > 0 &&
        accomplishments
          .filter((data) => data.hours_required <= totalPlayTime)
          .sort(compareHoursRequired)
          .map((data, index) => {
            return (
              <p key={index}>
                {data.message(Math.floor(totalPlayTime / data.hours_required))}
              </p>
            );
          })}
    </div>
  );
}

export default WastedPotential;
