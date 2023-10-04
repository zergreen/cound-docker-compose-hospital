import React, { useState, useEffect } from "react";
import SearchFilterTable from "./SearchFilterTable";

function Appoint() {
  const [data, setData] = useState([]);
  const domain = `${process.env.REACT_APP_DB_DOMAIN}`


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log(domain);
    const response = await fetch(domain + '/appoint');
    const jsonData = await response.json();
    setData(jsonData);
  };

  // const domain = `${process.env.REACT_APP_DB_DOMAIN}/appoint`

  return (
    <>
      <SearchFilterTable data={data} />
    </>
  );
}

export default Appoint;
