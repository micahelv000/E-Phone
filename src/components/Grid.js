import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ItemCard from './Item_Card';
import './Grid.css'

const Grid = ({ items }) => {
    return (
        <Row>
            {items.map((item) => (
                <Col key={item.slug}>
                    <ItemCard item={item} />
                </Col>
            ))}
        </Row>
    );
};

export default Grid;
