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

function valuetext(value) {
  return `${value}$`;
}

export default function Search({ searchText, onSearchTextChange, onFilterChange, priceRange, onPriceRangeChange, brands, screenSizes, maxPrice }) {
  const [value, setValue] = React.useState([0, maxPrice]);
  const [brandValue, setBrandValue] = React.useState([]);
  const [screenSizeValue, setScreenSizeValue] = React.useState([]);
  const [osValue, setOsValue] = React.useState('');
  const [sortValue, setSortValue] = React.useState('');

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

  const handleBrandChange = (event) => {
    const { target: { value } } = event;
    setBrandValue(typeof value === 'string' ? value.split(',') : value);
    onFilterChange('brand', value);
  };

  const handleScreenSizeChange = (event) => {
    const { target: { value } } = event;
    setScreenSizeValue(typeof value === 'string' ? value.split(',') : value);
    onFilterChange('screenSize', value);
  };

  const handleOsChange = (event) => {
    const value = event.target.value === "&nbsp;" ? "" : event.target.value;
    setOsValue(value);
    onFilterChange('os', value);
  };

  const handleSortChange = (event) => {
    setSortValue(event.target.value);
    onFilterChange('sort', event.target.value);
  };

  return (
    <Container style={{ maxWidth: '80%' }}>
      <Grid container spacing={1} wrap="nowrap">
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

        <Grid item xs="auto">
          <FormControl sx={{ minWidth: 150, maxWidth: 150 }} fullWidth>
            <InputLabel id="sort-select">Sort by</InputLabel>
            <Select
                labelId="sort-select"
                id="sort-select"
                value={sortValue}
                label="Sort by"
                onChange={handleSortChange}
            >
              <MenuItem value={"ABC"}>Alphabetical</MenuItem>
              <MenuItem value={"inc"}>Price INC</MenuItem>
              <MenuItem value={"dec"}>Price DEC</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs="auto">
          <FormControl sx={{ minWidth: 150, maxWidth: 300 }} fullWidth>
            <InputLabel id="filter1-select">Screen size</InputLabel>
            <Select
                labelId="filter1-select"
                id="filter1-select"
                multiple
                value={screenSizeValue}
                onChange={handleScreenSizeChange}
                input={<OutlinedInput label="Screen size" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
              {screenSizes.map((size) => (
                  <MenuItem key={size} value={size.split(' ')[0]}>
                    <Checkbox checked={screenSizeValue.indexOf(size.split(' ')[0]) > -1} />
                    <ListItemText primary={size} />
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs="auto">
          <FormControl sx={{ minWidth: 300, maxWidth: 300 }} fullWidth>
            <InputLabel id="filter2-select">Select by brand</InputLabel>
            <Select
                labelId="filter2-select"
                id="filter2-select"
                multiple
                value={brandValue}
                onChange={handleBrandChange}
                input={<OutlinedInput label="Brand" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
              {brands.map((brand) => (
                  <MenuItem key={brand} value={brand.split(' ')[0]}>
                    <Checkbox checked={brandValue.indexOf(brand.split(' ')[0]) > -1} />
                    <ListItemText primary={brand} />
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs="auto">
          <FormControl sx={{ minWidth: 110 }} fullWidth>
            <InputLabel id="filter3-select">OS</InputLabel>
            <Select
                labelId="filter3-select"
                id="filter3-select"
                value={osValue}
                label="OS"
                onChange={handleOsChange}
            >
              <MenuItem value="">&nbsp;</MenuItem>
              <MenuItem value={"Android"}>Android</MenuItem>
              <MenuItem value={"iOS"}>iOS</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={2} sx={{ m: 1 }}>
          <Slider
              getAriaLabel={() => 'Price range'}
              value={value}
              onChange={handleChange}
              min={0}
              max={maxPrice}
              valueLabelDisplay="auto"
              disableSwap
              getAriaValueText={valuetext}
          />
        </Grid>
      </Grid>
    </Container>
  );
}