import React, { useState, useEffect } from 'react';

export default function Home() {
  const [connection, setConnection] = useState("not started");

  async function checkDBConnection() {
    const response = await fetch("http://localhost:3001/db/check-db-connection", {
      method : "GET",
    });

    const data = await response.json();
    setConnection(data.text);
  };

  useEffect(() => {
    checkDBConnection();
  }, []);

  return (
    <>
      <h1>Database Connection Status: 
        <span id="dbStatus">{connection}</span>
        <p id="loadingGif" className={connection === "not started" ? "loading-text" : ""}> {connection}</p>
      </h1>
    </>
  );
}