import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/layout/Header';
import axiosInstance from "../utils/axiosConfig";
import { Card } from 'react-bootstrap';

export default function TransactionDetails() {
    const { id } = useParams();
    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch item image from phone-specs API
    const fetchItemImage = async (slug) => {
        try {
            const response = await fetch(`http://phone-specs-api.vercel.app/${slug}`);
            const data = await response.json();
            if (data.status) {
                return {
                    thumbnail: data.data.thumbnail,
                    images: data.data.phone_images
                };
            }
            return { thumbnail: 'default-thumbnail-url', images: ['default-image-url'] };
        } catch (error) {
            console.error('Error fetching item image:', error);
            return { thumbnail: 'default-thumbnail-url', images: ['default-image-url'] };
        }
    };

    // Fetch transaction details and images
    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const response = await axiosInstance.get(`http://localhost:5000/transaction/${id}`);
                const transactionData = response.data;

                // Fetch images for each item
                const itemsWithImages = await Promise.all(transactionData.Items.map(async (item) => {
                    const { thumbnail, images } = await fetchItemImage(item.ItemSlug);
                    return { ...item, thumbnail, images };
                }));

                setTransaction({ ...transactionData, Items: itemsWithImages });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTransaction();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <div className="receipt p-4 border rounded shadow-sm">
                    <h1 className="text-center mb-4">Receipt</h1>
                    <div className="mb-3">
                        <h5 className="mb-1">Transaction ID:</h5>
                        <p>{transaction._id}</p>
                    </div>
                    <div className="mb-3">
                        <h5 className="mb-1">User:</h5>
                        <p>{transaction.username}</p>
                    </div>
                    <div className="mb-3">
                        <h5 className="mb-1">Total Quantity:</h5>
                        <p>{transaction.TotalQuantity}</p>
                    </div>
                    <div className="mb-3">
                        <h5 className="mb-1">Total Price:</h5>
                        <p>${transaction.TotalPrice.toFixed(2)}</p>
                    </div>
                    
                    <div className="mb-3">
                        <h5 className="mb-1">Order Date:</h5>
                        <p>{new Date(transaction.OrderDate).toLocaleString()}</p>
                    </div>
                    <h5 className="mt-4 mb-3">Items:</h5>
                    <ul className="list-group">
                        {transaction.Items.map(item => (
                            <li key={item.ItemSlug} className="list-group-item d-flex align-items-center">
                                <div className="d-flex align-items-center">
                                    <Card.Img
                                        variant="top"
                                        src={item.thumbnail || 'default-thumbnail-url'} // Use fetched thumbnail URL
                                        alt={item.ItemName}
                                        style={{ height: '150px', width: '200px', objectFit: 'contain', marginRight: '10px' }}
                                    />
                                    <div>
                                        <p><strong>Item Name:</strong> {item.ItemName}</p>
                                        <p><strong>Quantity:</strong> {item.Quantity}</p>
                                        <p><strong>Price:</strong> ${item.Price.toFixed(2)}</p>

                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
