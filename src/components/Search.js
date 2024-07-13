import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Search({ searchText, onSearchTextChange, onFilterChange, priceRange, onPriceRangeChange }) {
    
    const handleSearchInputChange = (event) => {
        onSearchTextChange(event.target.value);
    };

    const handleFilterClick = (filter) => {
        onFilterChange(filter);
    };

    const handlePriceRangeChange = (event) => {
        onPriceRangeChange(event.target.value);
    };    
    
    return (
        <div className="container-fluid mt-4 px-5">
            <div className="row align-items-center">
                <div className="col-7">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search text..."
                        value={searchText}
                        onChange={handleSearchInputChange}
                    />
                </div>
                <div className="col-5 d-flex align-items-center justify-content-end">
                    <button className="btn btn-outline-primary mx-1" onClick={() => handleFilterClick('Filter 1')}>Filter 1</button>
                    <button className="btn btn-outline-primary mx-1" onClick={() => handleFilterClick('Filter 2')}>Filter 2</button>
                    <button className="btn btn-outline-primary mx-1" onClick={() => handleFilterClick('Filter 3')}>Filter 3</button>
                    <div className="d-flex align-items-center ml-3">
                        <p className="mb-0">0 NIS</p>
                        <input
                            type="range"
                            className="form-range mx-3"
                            min="0"
                            max="100"
                            value={priceRange}
                            onChange={handlePriceRangeChange}
                        />
                        <p className="mb-0">6000 NIS</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
