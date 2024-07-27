import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { FitScreen, Margin } from '@mui/icons-material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

//temp
const brands = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function valuetext(value) {
  return `${value}°C`;
}

export default function Search({ searchText, onSearchTextChange, onFilterChange, priceRange, onPriceRangeChange }) {
  const [value, setValue] = React.useState([0, 10000]);
  const [value1, setValue1] = React.useState('');
  const [value2, setValue2] = React.useState([]);
  const [value3, setValue3] = React.useState('');
  const [ValueSort, setValueSort] = React.useState('');

  const handleSearchInputChange = (event) => {
    onSearchTextChange(event.target.value);
  };

  const handlePriceRangeChange = (event, newValue) => {
    onPriceRangeChange(newValue);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    handlePriceRangeChange(event, newValue);
  };

  const handleSortChange = (event) => {
    setValueSort(event.target.value);
    onFilterChange(event.target.value);
  };

  const handleSelect1Change = (event) => {
    setValue1(event.target.value);
    onFilterChange(event.target.value);
  };
  

  const handleSelect2Change = (event) => {
    const { target: { value } } = event;
    setValue2(typeof value === 'string' ? value.split(',') : value);
    onFilterChange(value);
  };

  const handleSelect3Change = (event) => {
    setValue3(event.target.value);
    onFilterChange(event.target.value);
  };

  return (
    <Container style={{ maxWidth: '80%'}}>
    
    {/* search */}

      <Grid container spacing={1}>
        <Grid item xs={4}>
          <input 
            style={{ height: '56px', padding: '16.5px 14px', boxSizing: 'border-box' }}

            type="text"
            className="form-control"
            placeholder="Search Item by name..."
            value={searchText}
            onChange={handleSearchInputChange}
          />
        </Grid>

        {/* Filter by */}
        <Grid item xs="auto">
            <FormControl sx={{ minWidth: 150, maxWidth: 150 }} fullWidth>
            <InputLabel id="sort-select">Sort by</InputLabel>
            <Select
              labelId="sort-select"
              id="sort-select"
              value={ValueSort}
              label="Sort by"
              onChange={handleSortChange}
            >
              <MenuItem value={"ABC"}>Alphabtical</MenuItem>
              <MenuItem value={"inc"}>Price INC</MenuItem>
              <MenuItem value={"dec"}>Price DEC</MenuItem>
            </Select>
          </FormControl>
        </Grid>


        {/* Screen size */}
        <Grid item xs="auto">
        <FormControl sx={{ minWidth: 120, maxWidth: 300 }} fullWidth>
        <InputLabel id="filter1-select">Screen size</InputLabel>
            <Select
              labelId="filter1-select"
              id="filter1-select"
              value={value1}
              label="Value 1"
              onChange={handleSelect1Change}
            >
              <MenuItem value={10}>S</MenuItem>
              <MenuItem value={20}>M</MenuItem>
              <MenuItem value={30}>L</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Brand */}
        <Grid item xs="auto">
            <FormControl sx={{ minWidth: 300, maxWidth: 300 }} fullWidth>

            <InputLabel id="filter2-select">Select by brand</InputLabel>
            <Select
              labelId="filter2-select"
              id="filter2-select"
              multiple
              value={value2}
              onChange={handleSelect2Change}
              input={<OutlinedInput label="Brand" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {brands.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  <Checkbox checked={value2.indexOf(brand) > -1} />
                  <ListItemText primary={brand} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>


        {/* OS size */}
        <Grid item xs="auto">
            <FormControl sx={{ minWidth: 110 }} fullWidth>
            <InputLabel id="filter3-select">OS</InputLabel>
            <Select
              labelId="filter3-select"
              id="filter3-select"
              value={value3}
              label="Value 3"
              onChange={handleSelect3Change}
            >
              <MenuItem value={"IOS"}>IOS</MenuItem>
              <MenuItem value={"Android"}>Android</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Price Range */}
        <Grid item xs={2} sx={{ m: 1 }}>
          <Slider
            getAriaLabel={() => 'Price range'}
            value={value}
            onChange={handleChange}
            min={0}
            max={1000}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
