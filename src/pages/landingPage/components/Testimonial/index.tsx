import React, {memo}from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";
import {images} from "configs/images";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/display-name
const Testimonials = memo(() => {
  const items = [
    { 
        name: 'Michael',
        title: '@Michael',
        description: 'The networking at Web Summit is like no other European tech conference.',
        image: images.michael.src
    },
    { 
        name: 'Michael',
        title: '@Michael',
        description: 'The networking at Web Summit is like no other European tech conference.',
        image: images.michael.src
    },
    { 
        name: 'Michael',
        title: '@Michael',
        description: 'The networking at Web Summit is like no other European tech conference.',
        image: images.michael.src
    },     
]
  return (
  <>
    <div className="cd-section" id="testimonials">
      <div
        className ="testimonials-1 section-image"
        style={{
          backgroundImage: `url(${images.bg19.src})`,
        }}
      >
        <Container>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="6">
              <h2 className="title">What is ALPHA?</h2>
              <h4 className="description">
                If you’re selected for ALPHA you’ll also get 3 tickets,
                opportunity to access Investor Office Hours and Mentor Hours
                and much more all for €850.
              </h4>
            </Col>
          </Row>
          <Row>
              {items.map((item, index) => (
                  <Col md="4" key={index}>
                  <Card className="card-testimonial">
                      <div className="card-avatar">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img
                          alt="..."
                          className="img img-raised"
                          src={item.image}
                          ></img>
                      </a>
                      </div>
                      <CardBody>
                      <p className="card-description">
                          {item.description}
                      </p>
                      </CardBody>
                      <div className="icon icon-info">
                          <FontAwesomeIcon icon={faQuoteRight} className={classes.iconQuote}></FontAwesomeIcon>
                      </div>
                      <CardFooter>
                      <CardTitle tag="h4">{item.name}</CardTitle>
                      <p className="category">{item.title}</p>
                      </CardFooter>
                  </Card>
                  </Col>
              ))}
          </Row>
        </Container>
      </div>
    </div>
  </>
  );
})

export default Testimonials;
