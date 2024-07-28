import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ItemCard from './Item_Card';

const Grid = ({ items }) => {
    return (
        <Row>
            {items.map((item) => (
                <Col key={item.slug} xs={8} sm={6} md={4} lg={3}>
                    <ItemCard item={item} />
                </Col>
            ))}
        </Row>
    );
};

export default Grid;
