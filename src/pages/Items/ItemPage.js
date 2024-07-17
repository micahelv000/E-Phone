import Header from '../../../src/components/Header';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Container } from 'react-bootstrap';


var value = 2;

export default function ItemPage(item) {

  return (
    <div>
      <Header />
      <Container>
        <Card style={{ width: 'fit' }}>
        <Card.Img variant="top"  style={{ height: '300px', width: '300px', objectFit: 'cover'}} src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-40-iphone15hero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369781" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          <ListGroup.Item>
            <Typography component="legend">Read only</Typography>
            <Rating name="read-only" value={value} readOnly />        
          </ListGroup.Item>

        </ListGroup>
        <Card.Body>
          <button href="#">add to cart </button>
        </Card.Body>
      </Card>
    </Container>
      
      </div>
  )
}
