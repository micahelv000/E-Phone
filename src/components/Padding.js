import React from 'react';

const Padding = ({ children }) => {
    return (
        <div style={{ padding: '10px' }}>
            {children}
        </div>
    );
};

export default Padding;
