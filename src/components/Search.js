import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';

import Container from '@mui/material/Container';

function valuetext(value) {
    return `${value}°C`;
  }

export default function Search({ searchText, onSearchTextChange, onFilterChange, priceRange, onPriceRangeChange }) {
    const handleSearchInputChange = (event) => {
        onSearchTextChange(event.target.value);
    };

    const handleFilterClick = (filter) => {
        onFilterChange(filter);
    };

    const handlePriceRangeChange = (event, newValue) => {
        onPriceRangeChange(newValue);
    };

    const [value, setValue] = React.useState([0, 10000]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        handlePriceRangeChange(event, newValue);
    };

    return (
        <Container style={{ maxWidth: '80%' }}>
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search Item by name..."
                    value={searchText}
                    onChange={handleSearchInputChange}
                />
            </Grid>
            <Grid item xs="auto">
                <button className="btn btn-outline-primary mx-1" onClick={() => handleFilterClick('Filter 1')}>Filter 1</button>
            </Grid>
            <Grid item xs="auto">
                <button className="btn btn-outline-primary mx-1" onClick={() => handleFilterClick('Filter 2')}>Filter 2</button>
            </Grid>
            <Grid item xs="auto">
                <button className="btn btn-outline-primary mx-1" onClick={() => handleFilterClick('Filter 3')}>Filter 3</button>
            </Grid>
            <Grid item xs={3}>
                <Slider
                    getAriaLabel={() => 'Price range'}
                    value={value}
                    onChange={handleChange}
                    min={0}
                    max={10000}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                />
            </Grid>
        </Grid>
        </Container>
    );
}
