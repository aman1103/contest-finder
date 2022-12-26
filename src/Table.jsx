//@ts-noCheck
import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import axios from "axios";

export default function BasicTable(props) {
  const contest = props.contest;

  const [allContests, setAllContests] = useState();

  const fetchContestInfo = async (contest) => {
    const res = await axios.get(`https://kontests.net/api/v1/${contest}`);
    let data = res.data;
    data = data.map((value) => {
      let d = parseInt(value.duration) / 3600;
      if (d >= 24) {
        d = parseInt(d / 24);
        d = `${d} days`;
      } else {
        if (d % 0.5 !== 0) {
          d = d.toFixed(2);
        }
        d = `${d} hours`;
      }
      value = { ...value, duration: d };
      return value;
    });
    // console.log(data);
    data.sort((a, b) => new Date(b.start_time) - new Date(a.start_time));
    data.reverse();
    // console.log(data);
    setAllContests(data);
    // console.log(allContests);
  };

  useEffect(() => {
    fetchContestInfo(contest);
  }, [contest]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Site</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">End Time</TableCell>
            <TableCell align="right">Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allContests !== undefined &&
            allContests.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link href={row.url} target="_blank">
                    {row.name}
                  </Link>
                </TableCell>
                <TableCell align="right">
                  {row.site !== undefined
                    ? row.site
                    : contest
                        .split("_")
                        .map(
                          (txt) => txt.charAt(0).toUpperCase() + txt.slice(1)
                        )
                        .join(" ")}
                </TableCell>
                <TableCell align="right">
                  {row.start_time.substring(0, 10)}
                </TableCell>
                <TableCell align="right">
                  {row.end_time.substring(0, 10)}
                </TableCell>
                <TableCell align="right">
                  {row.start_time.substring(11, 16)}
                </TableCell>
                <TableCell align="right">
                  {row.end_time.substring(11, 16)}
                </TableCell>
                <TableCell align="right">{row.duration}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
