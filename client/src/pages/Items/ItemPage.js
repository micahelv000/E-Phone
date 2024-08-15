import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import Header from '../../components/layout/Header';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button, Container } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import BottomLongPages from '../../components/layout/BottomLongPages';
import axiosInstance from "../../utils/axiosConfig";

export default function ItemPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const { addToCart } = useContext(CartContext);

  const queryParams = new URLSearchParams(location.search);
  const slug = queryParams.get('slug');
  const price = parseFloat(queryParams.get('price')) || 0;
  const stock = parseInt(queryParams.get('stock')) || 0;

  const handleAddToCart = () => {
    if (!localStorage.getItem('authToken')) {
      navigate('/login');
      return;
    }

    if (itemData) {
      addToCart({ slug, ...itemData, quantity: 1, price, stock });
      navigate('/cart');
    }
  };

  useEffect(() => {
    if (slug) {
      fetch(`https://phone-specs-api.vercel.app/${slug}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Error fetching data: ${response.statusText}`);
            }
            return response.json();
          })
          .then(data => {
            if (data.status && data.data) {
              setItemData(data.data);
              fetchYouTubeVideo(data.data.phone_name);
            } else {
              throw new Error('No phone data found');
            }
            setLoading(false);
          })
          .catch(error => {
            setError(error.message);
            setLoading(false);
          });
    } else {
      setError('No slug parameter provided');
      setLoading(false);
    }
  }, [slug]);

  const fetchYouTubeVideo = (phoneName) => {
    axiosInstance.get(`/youtube-video?phoneName=${phoneName}`)
        .then(response => {
          setVideoUrl(response.data.videoUrl);
        })
        .catch(error => {
          console.error('Error fetching YouTube video:', error);
        });
  };

  if (loading) {
    return <div><Header/><center><CircularProgress size={300} /></center></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <div>
        <Header />
        <Container>
          <Card>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ width: '40%' }}>
                    <Card.Img variant="top" style={{ height: '80%', width: '300px', objectFit: 'cover' }} src={itemData.thumbnail} />
                  </td>
                  <td style={{ width: '60%' }}>
                    {videoUrl && (
                      <iframe width="560" height="315" src={videoUrl} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <Card.Body>
              <Card.Title>{itemData.phone_name}</Card.Title>
              <Card.Text>
                {itemData.os}, {itemData.storage}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Brand: {itemData.brand}</ListGroup.Item>
              <ListGroup.Item>Release Date: {itemData.release_date}</ListGroup.Item>
              <ListGroup.Item>Dimensions: {itemData.dimension}</ListGroup.Item>
              <ListGroup.Item>Storage: {itemData.storage}</ListGroup.Item>
              <ListGroup.Item>OS: {itemData.os}</ListGroup.Item>
              {itemData.specifications.map((specGroup, index) => (
                  <React.Fragment key={index}>
                    <ListGroup.Item variant="secondary" className="font-weight-bold">{specGroup.title}</ListGroup.Item>
                    {specGroup.specs.map((spec, specIndex) => (
                        <ListGroup.Item key={specIndex}>
                          <strong>{spec.key}:</strong> {spec.val.join(', ')}
                        </ListGroup.Item>
                    ))}
                  </React.Fragment>
              ))}
            </ListGroup>
            <Card.Body className="d-flex justify-content-between align-items-center">
              {stock > 0 ? (
                  <>
                    <Button onClick={handleAddToCart}>
                      Add to cart
                    </Button>
                    <h2>{price}$</h2>
                  </>
              ) : (
                  <h1>Out of stock</h1>
              )}
            </Card.Body>
          </Card>
        </Container>
        <br/>
        <BottomLongPages/>
      </div>
  );
}