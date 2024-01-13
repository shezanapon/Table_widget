import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const TableWidget = () => {
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const fetchData = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.easy-pluginz.com/admin/v2/utils/responselogs",
      headers: {
        orgid: "10698000000106085",
      },
    };

    const res = await axios.request(config);

    console.log("obj", res?.data.data);
    const formattedData = res?.data.data.map((row) => ({
      ...row,
      created_at: new Date(row.created_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }),
    }));
    const sortedData = formattedData.sort(
      (a, b) => new Date(...a.created_at) - new Date(...b.created_at)
    );

    setData(sortedData);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div style={{ padding: "50px 150px 150px 150px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 50 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>
                <h3>ID</h3>
              </TableCell>
              <TableCell align="right">
                <h3>DATE</h3>
              </TableCell>
              <TableCell align="right">
                <h3>INFO</h3>
              </TableCell>
              <TableCell align="right">
                <h3>RESPONSE</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.created_at}</TableCell>
                <TableCell align="right">{row.req}</TableCell>
                <TableCell align="right">{row.res}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableWidget;
