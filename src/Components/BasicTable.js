import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

class BasicTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen : false,
    }
  }

  toggleModals = (flag, id) => {
    this.props.toggleModals(flag, id);
  }

  deleteItem = (id) => {
    this.props.deleteItem(id);
  }

  render(){
    const { data } = this.props;
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">S. No</TableCell>
              <TableCell align="center">Avtar</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index+1}
                </TableCell>
                <TableCell align="center"><img src={row.avatar} width={80} /></TableCell>
                <TableCell align="center">{row.first_name}</TableCell>
                <TableCell align="center">{row.last_name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined" onClick={()=>this.toggleModals(true, row.id)} >Edit</Button> 
                </TableCell>
                <TableCell align="center">
                  <Button color="primary" variant="outlined" onClick={()=>this.deleteItem(row.id)} >Delete</Button> 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}


export default BasicTable;