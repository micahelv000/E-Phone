import React, { useState, useEffect } from "react";
import { TableRow, TableCell, IconButton, Collapse, Box, Table, TableHead, TableBody, TextField, Button } from "@mui/material";
import { KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon, Sync as SyncIcon } from "@mui/icons-material";
import axios from "axios";
import { fetchData, handleInputChange, handleSync } from "../../utils/itemUtils";
import PropTypes from "prop-types";

function RowComponent(props) {
  const { row, onDevicesFetched } = props;
  const [open, setOpen] = useState(false);
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [itemDetails, setItemDetails] = useState({});
  const [initialItemDetails, setInitialItemDetails] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleExpandClick = () => {
    setOpen(!open);
    if (!open && devices.length === 0) {
      axios
        .get(`https://phone-specs-api.vercel.app/brands/${row.brand_slug}`)
        .then((response) => {
          if (response.data.status) {
            setDevices(response.data.data.phones);
            setFilteredDevices(response.data.data.phones);
            onDevicesFetched(response.data.data.phones); // Notify parent component
          }
        })
        .catch((error) => {
          console.error("Error fetching devices:", error);
        });
    }
  };

  useEffect(() => {
    devices.forEach(async (device) => {
      const data = await fetchData(`/item-details/${device.slug}`);
      if (data) {
        setItemDetails((prevState) => ({
          ...prevState,
          [device.slug]: data,
        }));
        setInitialItemDetails((prevState) => ({
          ...prevState,
          [device.slug]: data,
        }));
      }
    });
  }, [devices]);

  const handleSearchChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    filterDevices(text);
  };

  const filterDevices = (text) => {
    if (text) {
      setFilteredDevices(devices.filter(device => device.phone_name.toLowerCase().includes(text.toLowerCase())));
    } else {
      setFilteredDevices(devices);
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={handleExpandClick}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.brand_name}
        </TableCell>
        <TableCell align="right">{row.device_count}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <TextField
                label="Search Devices"
                value={searchText}
                onChange={handleSearchChange}
                fullWidth
                margin="normal"
              />
              <Table size="small" aria-label="devices">
                <TableHead>
                  <TableRow>
                    <TableCell>Device Name</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Detail URL</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredDevices.map((device) => (
                    <TableRow key={device.slug}>
                      <TableCell component="th" scope="row">
                        {device.phone_name}
                      </TableCell>
                      <TableCell>
                        <img src={device.image} alt={device.phone_name} style={{ width: "50px" }} />
                      </TableCell>
                      <TableCell>
                        <a href={`/Item?slug=${device.slug}`} target="_blank" rel="noopener noreferrer">
                          Link
                        </a>
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={itemDetails[device.slug]?.stock || 0}
                          onChange={(e) => handleInputChange(device.slug, "stock", parseInt(e.target.value), setItemDetails, setIsChanged)}
                          style={{ width: "60px", display: "inline-block", margin: "0 10px" }}
                          inputProps={{ min: 0 }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={itemDetails[device.slug]?.price || 0}
                          onChange={(e) => handleInputChange(device.slug, "price", parseFloat(e.target.value), setItemDetails, setIsChanged)}
                          style={{ width: "100px" }}
                          inputProps={{ min: 0 }}
                        />
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
                  onClick={() => handleSync(devices, itemDetails, initialItemDetails, setIsChanged)}
                  style={{ position: "fixed", bottom: "80px", right: "20px" }}
                >
                  Sync
                </Button>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

RowComponent.propTypes = {
  row: PropTypes.shape({
    brand_id: PropTypes.number.isRequired,
    brand_name: PropTypes.string.isRequired,
    brand_slug: PropTypes.string.isRequired,
    device_count: PropTypes.number.isRequired,
  }).isRequired,
  onDevicesFetched: PropTypes.func.isRequired,
};

export default RowComponent;