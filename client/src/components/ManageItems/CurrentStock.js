import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axiosInstance from "../../utils/axiosConfig";

function CurrentStock() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("http://localhost:5000/items")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="current stock table">
        <TableHead>
          <TableRow>
            <TableCell>Device Name</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.slug}>
              <TableCell>{item.phone_name}</TableCell>
              <TableCell>{item.brand}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CurrentStock;