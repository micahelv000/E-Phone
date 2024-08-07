import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Select, MenuItem } from "@mui/material";
import { fetchData, handleInputChange, handleSync } from "../../utils/itemUtils";
import SyncIcon from "@mui/icons-material/Sync";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosInstance from "../../utils/axiosConfig";

function CurrentStock() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [itemDetails, setItemDetails] = useState({});
  const [initialItemDetails, setInitialItemDetails] = useState({});

  useEffect(() => {
    const fetchItems = async () => {
      const data = await fetchData("http://localhost:5000/items");
      if (data) {
        setItems(data);
        setFilteredItems(data);
        setBrands([...new Set(data.map(item => item.brand))]);
        const details = {};
        data.forEach(item => {
          details[item.slug] = { stock: item.stock, price: item.price };
        });
        setItemDetails(details);
        setInitialItemDetails(details);
      }
    };
    fetchItems();
  }, []);

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    filterItems(event.target.value, searchText);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    filterItems(selectedBrand, event.target.value);
  };

  const filterItems = (brand, text) => {
    let tempItems = [...items];
    if (brand) {
      tempItems = tempItems.filter(item => item.brand === brand);
    }
    if (text) {
      tempItems = tempItems.filter(item => item.phone_name.toLowerCase().includes(text.toLowerCase()));
    }
    setFilteredItems(tempItems);
  };

  const handleDelete = async (slug) => {
    try {
      await axiosInstance.delete(`http://localhost:5000/delete-item/${slug}`);
      setItems(items.filter(item => item.slug !== slug));
      setFilteredItems(filteredItems.filter(item => item.slug !== slug));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div>
      <Select value={selectedBrand} onChange={handleBrandChange} displayEmpty>
        <MenuItem value=""><em>Select Brand</em></MenuItem>
        {brands.map((brand, index) => (
          <MenuItem key={index} value={brand}>{brand}</MenuItem>
        ))}
      </Select>
      <TextField
        label="Search by Name"
        value={searchText}
        onChange={handleSearchChange}
      />
      <TableContainer component={Paper}>
        <Table aria-label="current stock table">
          <TableHead>
            <TableRow>
              <TableCell>Device Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.slug}>
                <TableCell>{item.phone_name}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={itemDetails[item.slug]?.stock || 0}
                    onChange={(e) => handleInputChange(item.slug, "stock", parseInt(e.target.value), setItemDetails, setIsChanged)}
                    style={{ width: "60px" }}
                    inputProps={{ min: 0 }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={itemDetails[item.slug]?.price || 0}
                    onChange={(e) => handleInputChange(item.slug, "price", parseFloat(e.target.value), setItemDetails, setIsChanged)}
                    style={{ width: "100px" }}
                    inputProps={{ min: 0 }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(item.slug)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isChanged && (
            <Button
                variant="contained"
                color="primary"
                startIcon={<SyncIcon />}
                onClick={() => handleSync(items, itemDetails, initialItemDetails, setIsChanged)}
                style={{ position: "fixed", bottom: "80px", right: "20px" }}
            >
              Sync
            </Button>
        )}
      </TableContainer>
    </div>
  );
}

export default CurrentStock;