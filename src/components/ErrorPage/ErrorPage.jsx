import React from "react";
import "./styles.css";

export default function ErrorPage({ error }) {
  return (
    <div className="container">
      <div class="text">
        <h1>404, {error}.</h1>
      </div>

      <div class="astronaut">
        <img
          src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png"
          alt=""
          class="src"
        />
      </div>
      {/* <p>404, {error}.</p>
      <img src={"https://static.steamtime.info/img/404rm.webp"} /> */}
    </div>
  );
}
