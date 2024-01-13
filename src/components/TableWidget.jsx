import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';


function createData(ID,Date,Info) {
    return { ID,Date,Info};
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    
  ];
const TableWidget = () => {
    const [data,setData]=useState([])
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
           
            
        fetchData();
        console.log("obj",res?.data);
            setData(res?.data);
           
          };
    return (
        <div style={{padding:"50px 50px 50px 50px"}}>
            {console.log(data)}
               <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Info</TableCell>
           
          </TableRow>
        </TableHead>
        
          {rows.map((row) => (
            <TableBody>
            <TableRow
              key={row.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.ID}
              </TableCell>
              <TableCell align="right">{row.Date}</TableCell>
              <TableCell align="right">{row.Info}</TableCell>
             
            </TableRow>
            </TableBody>
          ))}
        
      </Table>
    </TableContainer>
            
        </div>
    );
};

export default TableWidget;