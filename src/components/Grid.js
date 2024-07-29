import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ItemCard from './Item_Card';
import './Grid.css';

const Grid = ({ items }) => {
    return (
        <Row className="item-grid">
            {items.map((item) => (
                <Col key={item.slug} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
                    <ItemCard className="card" item={item} />
                </Col>
            ))}
        </Row>
    );
};

export default Grid;
