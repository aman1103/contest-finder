import Table from "./Table";
import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import axios from "axios";

function App() {
  const [contest, setContest] = useState("all");
  const [sites, setSites] = useState([]);
  const handleChange = (event) => {
    setContest(event.target.value);
  };
  const fetchSiteNames = async () => {
    const res = await axios.get("https://kontests.net/api/v1/sites");
    // console.log(res.data.pop());
    res.data.pop();
    setSites(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchSiteNames();
  }, []);
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Contest</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={contest}
          onChange={handleChange}
          autoWidth
          label="Age"
        >
          <MenuItem value="all">
            <em>All</em>
          </MenuItem>
          {sites !== undefined &&
            sites.map((site, idx) => {
              return (
                <MenuItem key={idx} value={site[1]}>
                  {site[0]}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <Table contest={contest} />
    </>
  );
}

export default App;
