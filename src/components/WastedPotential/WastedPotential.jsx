import { useState } from "react";
import { accomplishments } from "../../data";
import Message from "./Message";

function WastedPotential({ top5Games, totalPlayTime }) {
  const [image, setImage] = useState(accomplishments[0].img);

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
    <div className="wasted-wrapper">
      {totalPlayTime && top5Games.length > 0 && <h1 className="wastedPotential-title">Wasted Potential</h1>}
      {totalPlayTime && top5Games.length > 0 && (
        <div className="mesageGif-wrapper">
          <img className="mesageGif-img" src={image} />
        </div>
      )}
      {totalPlayTime &&
        top5Games.length > 0 &&
        accomplishments
          .filter((data) => data.hours_required <= totalPlayTime)
          .sort(compareHoursRequired)
          .map((data, index) => {
            return (
              <Message
                key={index}
                message={data.message(
                  Math.floor(totalPlayTime / data.hours_required)
                )}
                imgUrl={data.img}
                setImage={setImage}
              />
            );
          })}
    </div>
  );
}

export default WastedPotential;
