import React, { useState } from 'react';
import Header from "../components/Header";
import Search from "../components/Search";
import Grid from "../components/Grid";
import 'bootstrap/dist/css/bootstrap.min.css';
import Gallery from '../components/Gallery';

export default function Home() {
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState('');
    const [priceRange, setPriceRange] = useState(0);

    const handleSearchTextChange = (text) => {
        setSearchText(text);
    };

    const handleFilterChange = (filter) => {
        setFilter(filter);
    };

    const handlePriceRangeChange = (range) => {
        setPriceRange(range);
    };
    

    return (
        <div>
            <Header />
            <Gallery/>
            <Search 
                searchText={searchText}
                onSearchTextChange={handleSearchTextChange}
                onFilterChange={handleFilterChange}
                priceRange={priceRange}
                onPriceRangeChange={handlePriceRangeChange}
            />
            <br></br>
         {/* here we need to do something smart to get all the data from the search
                and pass it to the Grid as json or something */} 
            <Grid  />
        </div>
    )
}
