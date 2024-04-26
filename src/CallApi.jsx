import { useState, useEffect } from "react";

const KEY = "90013C80CBD3FEA67DED4D882ACD455C";

const URL = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${KEY}=76561199005985110&format=json`;

function CallApi() {
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:3000/`, {
        method: "GET",
      });
      console.log(result);
      setTemp(temp + 1);
    };
    fetchData();
  }, []);

  return <div className="CallApi">response: {temp}</div>;
}

export default CallApi;
