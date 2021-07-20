import "./App.css";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { css } from "@emotion/react";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const App = () => {

  const classes = useStyles();
  let [color, setColor] = useState("#ffffff");
  const [vehicles, setVehicles] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [url, setUrl] = useState("https://swapi.dev/api/vehicles/");

  useEffect(() => {
        axios.get(url).then(response => {
        setVehicles(response.data);
        setLoading(false);
    })
     
  }, [url]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    setUrl("https://swapi.dev/api/vehicles/?page=" + (newPage + 1));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setTimeout(() => {
      setUrl("https://swapi.dev/api/vehicles/?search=" + (event.target.value));
    }, 500)
    
  }

  if (loading) {
    return (<ClipLoader color={color} loading={loading} css={override} size={150} />)
              
  }

  return (
    <div className="App">
      <h2>Vehicles</h2>
      <>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-basic" label="Search vehicles" onChange={handleSearch} />
        </form>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Cost In Credits</TableCell>
                <TableCell align="left">Length</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles ? (vehicles.results.map((vehicle) => (
                <TableRow key={vehicle.name}>
                  <TableCell align="left">{vehicle.name}</TableCell>
                  <TableCell align="left">{vehicle.cost_in_credits}</TableCell>
                  <TableCell align="left">{vehicle.length}</TableCell>
                </TableRow>
              ))) : (null) }
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={loading ? (0) : (vehicles.count)}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </>
    </div>
  );
}

export default App;
