import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Container } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl';
import FloatingActionButton from '@mui/material/Fab';
import SyncIcon from '@mui/icons-material/Sync';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [devices, setDevices] = useState([]);
  const [itemDetails, setItemDetails] = useState({});
  const [initialItemDetails, setInitialItemDetails] = useState({});
  const [isChanged, setIsChanged] = useState(false);

  const handleExpandClick = () => {
    setOpen(!open);
    if (!open && devices.length === 0) {
      axios.get(`https://phone-specs-api.vercel.app/brands/${row.brand_slug}`)
        .then(response => {
          if (response.data.status) {
            setDevices(response.data.data.phones);
          }
        })
        .catch(error => {
          console.error('Error fetching devices:', error);
        });
    }
  };

  useEffect(() => {
    devices.forEach(device => {
      axios.get(`http://localhost:5000/item-details/${device.slug}`)
        .then(response => {
          setItemDetails(prevState => ({
            ...prevState,
            [device.slug]: response.data
          }));
          setInitialItemDetails(prevState => ({
            ...prevState,
            [device.slug]: response.data
          }));
        })
        .catch(error => {
          console.error('Error fetching item details:', error);
        });
    });
  }, [devices]);

  const handleInputChange = (slug, field, value) => {
    setItemDetails(prevState => ({
      ...prevState,
      [slug]: {
        ...prevState[slug],
        [field]: value
      }
    }));
    setIsChanged(true);
  };

  const handleSync = () => {
    devices.forEach(device => {
      const initialDetails = initialItemDetails[device.slug] || { stock: 0, price: 0 };
      const currentDetails = itemDetails[device.slug] || { stock: 0, price: 0 };

      if (initialDetails.stock !== currentDetails.stock || initialDetails.price !== currentDetails.price) {
        axios.put(`http://localhost:5000/update-item/${device.slug}`, currentDetails)
          .then(response => {
            console.log('Item updated:', response.data);
          })
          .catch(error => {
            console.error('Error updating item:', error);
          });
      }
    });
    setIsChanged(false);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleExpandClick}
          >
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
              <Typography variant="h6" gutterBottom component="div">
                Devices
              </Typography>
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
                        <img src={device.image} alt={device.phone_name} style={{ width: '50px' }} />
                      </TableCell>
                      <TableCell>
                        <a href={`/Item?slug=${device.slug}`} target="_blank" rel="noopener noreferrer">Link</a>
                      </TableCell>
                      <TableCell>
                        <FormControl
                          type="number"
                          value={itemDetails[device.slug]?.stock || 0}
                          onChange={(e) => handleInputChange(device.slug, 'stock', parseInt(e.target.value))}
                          style={{ width: '60px', display: 'inline-block', margin: '0 10px' }}
                        />
                      </TableCell>
                      <TableCell>
                        <FormControl
                          type="number"
                          value={itemDetails[device.slug]?.price || 0}
                          onChange={(e) => handleInputChange(device.slug, 'price', parseFloat(e.target.value))}
                          style={{ width: '100px' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {isChanged && (
                <FloatingActionButton
                  color="primary"
                  aria-label="sync"
                  onClick={handleSync}
                  style={{ position: 'fixed', bottom: '20px', right: '20px' }}
                >
                  <SyncIcon />
                </FloatingActionButton>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    brand_id: PropTypes.number.isRequired,
    brand_name: PropTypes.string.isRequired,
    brand_slug: PropTypes.string.isRequired,
    device_count: PropTypes.number.isRequired,
  }).isRequired,
};

export default function CollapsibleTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get('https://phone-specs-api.vercel.app/brands')
      .then(response => {
        if (response.data.status) {
          setRows(response.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <h2>This page is only for admins</h2>
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
              {rows.map((row) => (
                <Row key={row.brand_id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}