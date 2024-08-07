import React, { useState, useEffect } from "react";
import { TableRow, TableCell, IconButton, Collapse, Box, Table, TableHead, TableBody, TextField, Button } from "@mui/material";
import { KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon, Sync as SyncIcon } from "@mui/icons-material";
import axios from "axios";
import axiosInstance from "../../utils/axiosConfig";
import PropTypes from "prop-types";

function RowComponent(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [devices, setDevices] = useState([]);
  const [itemDetails, setItemDetails] = useState({});
  const [initialItemDetails, setInitialItemDetails] = useState({});
  const [isChanged, setIsChanged] = useState(false);

  const handleExpandClick = () => {
    setOpen(!open);
    if (!open && devices.length === 0) {
      axios
        .get(`https://phone-specs-api.vercel.app/brands/${row.brand_slug}`)
        .then((response) => {
          if (response.data.status) {
            setDevices(response.data.data.phones);
          }
        })
        .catch((error) => {
          console.error("Error fetching devices:", error);
        });
    }
  };

  useEffect(() => {
    devices.forEach((device) => {
      axiosInstance
        .get(`http://localhost:5000/item-details/${device.slug}`)
        .then((response) => {
          setItemDetails((prevState) => ({
            ...prevState,
            [device.slug]: response.data,
          }));
          setInitialItemDetails((prevState) => ({
            ...prevState,
            [device.slug]: response.data,
          }));
        })
        .catch((error) => {
          console.error("Error fetching item details:", error);
        });
    });
  }, [devices]);

  const handleInputChange = (slug, field, value) => {
    if (value < 0) value = 0;
    setItemDetails((prevState) => ({
      ...prevState,
      [slug]: {
        ...prevState[slug],
        [field]: value,
      },
    }));
    setIsChanged(true);
  };

  const handleSync = () => {
    devices.forEach((device) => {
      const initialDetails = initialItemDetails[device.slug] || { stock: 0, price: 0 };
      const currentDetails = itemDetails[device.slug] || { stock: 0, price: 0 };

      if (initialDetails.stock !== currentDetails.stock || initialDetails.price !== currentDetails.price) {
        axios
          .get(`https://phone-specs-api.vercel.app/${device.slug}`)
          .then((response) => {
            const data = response.data.data;
            const displaySpec = data.specifications.find((spec) => spec.title === "Display");
            let screenSize = null;
            if (displaySpec) {
              const sizeSpec = displaySpec.specs.find((spec) => spec.key === "Size");
              if (sizeSpec && Array.isArray(sizeSpec.val) && sizeSpec.val.length > 0) {
                screenSize = sizeSpec.val[0].match(/\d+(\.\d+)?/)[0];
              }
            }

            const updatedDetails = {
              ...currentDetails,
              brand: data.brand,
              os: data.os,
              image: data.thumbnail,
              screenSize: screenSize,
              phone_name: data.phone_name,
            };

            axiosInstance
              .put(`http://localhost:5000/update-item/${device.slug}`, updatedDetails)
              .then((response) => {
                console.log("Item updated:", response.data);
              })
              .catch((error) => {
                console.error("Error updating item:", error);
              });
          })
          .catch((error) => {
            console.error("Error fetching additional device details:", error);
          });
      }
    });
    setIsChanged(false);
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
                  {devices.map((device) => (
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
                          onChange={(e) => handleInputChange(device.slug, "stock", parseInt(e.target.value))}
                          style={{ width: "60px", display: "inline-block", margin: "0 10px" }}
                          inputProps={{ min: 0 }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={itemDetails[device.slug]?.price || 0}
                          onChange={(e) => handleInputChange(device.slug, "price", parseFloat(e.target.value))}
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
                  onClick={handleSync}
                  style={{ position: "fixed", bottom: "80px", right: "20px" }} // Adjusted position
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
};

export default RowComponent;