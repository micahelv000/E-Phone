import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Search from "../components/Search";
import Grid from "../components/Grid";
import 'bootstrap/dist/css/bootstrap.min.css';
import Gallery from '../components/Gallery';
import { Container } from 'react-bootstrap';
import Bottom from '../components/Bottom';
import axios from 'axios';

export default function Home() {
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/items');
                setItems(response.data);
                setFilteredItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            let tempItems = [...items];

            if (searchText) {
                tempItems = tempItems.filter(item =>
                    item.phone_name.toLowerCase().includes(searchText.toLowerCase())
                );
            }

            if (filter) {
                // Apply other filters if any
            }

            if (priceRange) {
                tempItems = tempItems.filter(
                    item => item.price >= priceRange[0] && item.price <= priceRange[1]
                );
            }

            setFilteredItems(tempItems);
        };

        applyFilters();
    }, [searchText, filter, priceRange, items]);

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
            <Gallery />
            <Search
                searchText={searchText}
                onSearchTextChange={handleSearchTextChange}
                onFilterChange={handleFilterChange}
                priceRange={priceRange}
                onPriceRangeChange={handlePriceRangeChange}
            />
            <br />
            <Container>
                <Grid items={filteredItems} />
            </Container>
            <Bottom />
        </div>
    );
}
