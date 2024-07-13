import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Card from "./Item_Card.js";

export default function Grid({ items }) {
    // Sample fake items (replace with your actual data)
    const fakeItems = [
        { id: 1, name: 'Item 1', price: '$10', img: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-40-iphone15hero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369781' },
        { id: 2, name: 'Item 2', price: '$20', img: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-40-iphone15hero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369781' },
        { id: 3, name: 'Item 3', price: '$30', img: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-40-iphone15hero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369781' },
        { id: 4, name: 'Item 1', price: '$10', img: 'https://5.imimg.com/data5/SELLER/Default/2023/6/312743853/CM/HM/IA/4630526/apple-iphone-14-pro-max-128gb-deep-purple-mobile-phone-250x250.png' },
        { id: 5, name: 'Item 2', price: '$20', img: 'https://via.placeholder.com/150' },
        { id: 6, name: 'Item 3', price: '$30', img: 'https://via.placeholder.com/150' },
        { id: 7, name: 'Item 1', price: '$10', img: 'https://via.placeholder.com/150' },
        { id: 8, name: 'Item 2', price: '$20', img: 'https://via.placeholder.com/150' },
        { id: 9, name: 'Item 3', price: '$30', img: 'https://via.placeholder.com/150' },
        { id: 10, name: 'Item 1', price: '$10', img: 'https://via.placeholder.com/150' },
        { id: 11, name: 'Item 2', price: '$20', img: 'https://via.placeholder.com/150' },
        { id: 12, name: 'Item 3', price: '$30', img: 'https://via.placeholder.com/150' },
    ];

    return (
        <div className="row">
            {fakeItems.map((item) => (
                <Card key={item.id} item={item} />
            ))}
        </div>
    );
}
