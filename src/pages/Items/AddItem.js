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
import Button from 'react-bootstrap/Button';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [devices, setDevices] = useState([]);

  const handleExpandClick = () => {
    setOpen(!open);
    if (!open && devices.length === 0) {
      axios.get(`http://phone-specs-api.vercel.app/brands/${row.brand_slug}`)
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
                    <TableCell>Add/Remove from stock</TableCell>
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
                        <a   href={`/Item?slug=${device.slug}`} target="_blank" rel="noopener noreferrer">Link</a>
                      </TableCell>
                      <TableCell>

                        {/*follow the logic*/}
                        if(Device.isExists){
                            <Button>add</Button> 
                        }else{
                            <Button>Remove</Button>
                        }
                        
                        

                      </TableCell>
                    </TableRow>
                    
                  ))}
                </TableBody>
              </Table>
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
    axios.get('http://phone-specs-api.vercel.app/brands')
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
