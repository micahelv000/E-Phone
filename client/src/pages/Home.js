import React, { useState, useEffect } from 'react';
import Header from "../components/layout/Header";
import Search from "../components/search/Search";
import Grid from "../components/grid/Grid";
import 'bootstrap/dist/css/bootstrap.min.css';
import Gallery from '../components/gallery/Gallery';
import { Container } from 'react-bootstrap';
import BottomLongPages from '../components/layout/BottomLongPages';
import './Home.css';
import axiosInstance from "../utils/axiosConfig";

export default function Home() {
    const [searchText, setSearchText] = useState('');
    const [brandFilter, setBrandFilter] = useState([]);
    const [osFilter, setOsFilter] = useState('');
    const [screenSizeFilter, setScreenSizeFilter] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 2500]);
    const [sortOption, setSortOption] = useState('');
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [brands, setBrands] = useState([]);
    const [screenSizes, setScreenSizes] = useState([]);
    const [maxPrice, setMaxPrice] = useState(2500);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axiosInstance.get('/items');
                setItems(response.data);
                setFilteredItems(response.data);

                const brandCounts = {};
                const screenSizeCounts = {};
                let maxPrice = 0;

                response.data.forEach(item => {
                    brandCounts[item.brand] = (brandCounts[item.brand] || 0) + 1;
                    screenSizeCounts[item.screenSize] = (screenSizeCounts[item.screenSize] || 0) + 1;
                    if (item.price > maxPrice) {
                        maxPrice = item.price;
                    }
                });

                setBrands(Object.entries(brandCounts).map(([brand, count]) => `${brand} (${count})`));
                setScreenSizes(Object.entries(screenSizeCounts).map(([size, count]) => `${size} (${count})`));
                setMaxPrice(maxPrice);
                setPriceRange([0, maxPrice]);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            let tempItems = [...items];
            tempItems = tempItems.filter(item => item.price);

            if (searchText) {
                tempItems = tempItems.filter(item =>
                    item.phone_name.toLowerCase().includes(searchText.toLowerCase())
                );
            }

            if (brandFilter.length > 0) {
                tempItems = tempItems.filter(item =>
                    brandFilter.includes(item.brand)
                );
            }

            if (osFilter) {
                tempItems = tempItems.filter(item =>
                    item.os.toLowerCase().startsWith(osFilter.toLowerCase())
                );
            }

            if (screenSizeFilter.length > 0) {
                tempItems = tempItems.filter(item =>
                    screenSizeFilter.includes(item.screenSize)
                );
            }

            if (priceRange) {
                tempItems = tempItems.filter(
                    item => item.price >= priceRange[0] && item.price <= priceRange[1]
                );
            }

            if (sortOption) {
                tempItems.sort((a, b) => {
                    if (sortOption === 'ABC') {
                        return a.phone_name.localeCompare(b.phone_name);
                    } else if (sortOption === 'inc') {
                        return a.price - b.price;
                    } else if (sortOption === 'dec') {
                        return b.price - a.price;
                    }
                    return 0;
                });
            }

            setFilteredItems(tempItems);
        };

        applyFilters();
    }, [searchText, brandFilter, osFilter, screenSizeFilter, priceRange, sortOption, items]);

    const handleSearchTextChange = (text) => {
        setSearchText(text);
    };

    const handleFilterChange = (filterType, filterValue) => {
        switch (filterType) {
            case 'brand':
                setBrandFilter(filterValue);
                break;
            case 'os':
                setOsFilter(filterValue);
                break;
            case 'screenSize':
                setScreenSizeFilter(filterValue);
                break;
            case 'sort':
                setSortOption(filterValue);
                break;
            default:
                break;
        }
    };

    const handlePriceRangeChange = (range) => {
        setPriceRange(range);
    };

    return (
        <>
            <Header />
            <Container>

            <Gallery />
            <Search
                class-name="search-bar"
                searchText={searchText}
                onSearchTextChange={handleSearchTextChange}
                onFilterChange={handleFilterChange}
                priceRange={priceRange}
                onPriceRangeChange={handlePriceRangeChange}
                brands={brands}
                screenSizes={screenSizes}
                maxPrice={maxPrice}
                
            />
            <br />
                <Grid items={filteredItems} />
            </Container>
            <BottomLongPages/>
        </>
    );
}
