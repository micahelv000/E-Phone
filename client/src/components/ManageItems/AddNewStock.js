import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, CircularProgress, Box } from "@mui/material";
import RowComponent from "./RowComponent";
import axios from "axios";

function AddNewStock() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [loading, setLoading] = useState(true); // State variable for loading

  useEffect(() => {
    axios
      .get("https://phone-specs-api.vercel.app/brands")
      .then((response) => {
        if (response.data.status) {
          setRows(response.data.data);
          setFilteredRows(response.data.data);
          setBrands(response.data.data.map((row) => row.brand_name));
        }
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    setSelectedBrand(brand);
    filterRows(brand);
  };

  const filterRows = (brand) => {
    if (brand) {
      setFilteredRows(rows.filter((row) => row.brand_name === brand));
    } else {
      setFilteredRows(rows);
    }
  };

  return (
    <div>
      {loading ? ( // Show loading spinner while data is being fetched
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Select value={selectedBrand} onChange={handleBrandChange} displayEmpty>
            <MenuItem value=""><em>Select Brand</em></MenuItem>
            {brands.map((brand, index) => (
              <MenuItem key={index} value={brand}>{brand}</MenuItem>
            ))}
          </Select>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Brand Name</TableCell>
                  <TableCell align="right">Device Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows.map((row) => (
                  <RowComponent key={row.brand_id} row={row} onDevicesFetched={() => {}} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
}

export default AddNewStock;
