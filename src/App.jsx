import { useState } from "react";
import CallApi from "./CallApi";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <CallApi />
      </div>
    </>
  );
}

export default App;
