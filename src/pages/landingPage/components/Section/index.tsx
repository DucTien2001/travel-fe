import { memo } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardFooter,
  } from "reactstrap";
import {images} from "configs/images";
import Button, {BtnType} from "components/common/buttons/Button";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar} from '@fortawesome/free-solid-svg-icons';

   // eslint-disable-next-line react/display-name
  const Section = memo(() => {
    const items = [
      {
          img: images.offer_1.src,
          title: "Ella Evelyn", 
          price: 70,
          stars: 3,
          category: "Air Crew Member", 
          desc: "Think in the morning. Act in the noon. Eat in the evening. Sleep in the night......",
      },
      {
          img: images.offer_1.src,
          title: "Ella Evelyn", 
          price: 70,
          stars: 5,
          category: "Air Crew Member", 
          desc: "Think in the morning. Act in the noon. Eat in the evening. Sleep in the night......",
      },
      {
          img: images.offer_1.src,
          title: "Ella Evelyn", 
          price: 70,
          stars:4,
          category: "Air Crew Member", 
          desc: "Think in the morning. Act in the noon. Eat in the evening. Sleep in the night......",
      },
      {
          img: images.offer_1.src,
          title: "Ella Evelyn", 
          price: 70,
          stars:4,
          category: "Air Crew Member", 
          desc: "Think in the morning. Act in the noon. Eat in the evening. Sleep in the night......",
      },
  ]
  return (
    <>
       <div className="team-4">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">
              <h2 className={clsx("title", classes.titleSection)}>THE BEST OFFERS WITH YOU</h2>
              <h4 className="description">
                This is the paragraph where you can write more details about
                your team. Keep you user engaged by providing meaningful
                information.
              </h4>
            </Col>
          </Row>
          <Row>
              {items.map((item, index) => (
              <Col md="6" key = {index}>
              <Card className="card-profile card-plain">
                  <Row>
                  <Col md="5">
                      <div className={clsx("card-image", classes.imgWrapper)}>
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img
                            alt="..."
                            className="img img-raised rounded"
                            src={item.img}
                            ></img>
                        </a>
                        <div className={classes.tagTitle}>
                          <p>{item.title}</p>
                        </div>
                      </div>
                  </Col>
                  <Col md="7">
                      <CardBody className={classes.cardBody}>
                        <CardTitle tag="h4" className={classes.title}>
                          <p className={classes.tagMobile}>{item.title}</p>
                          ${item.price} <span>per night</span>
                        </CardTitle>
                        <div className={classes.offerContentLike}>
                          {[...Array(item.stars)].map((star, index) => {
                            return (
                              <FontAwesomeIcon icon={faStar} key={index}></FontAwesomeIcon>
                            )
                          })}
                        </div>
                      <h6 className="category">{item.category}</h6>
                      <p className="card-description">
                          {item.desc}
                      </p>
                      <CardFooter>
                          <Button btnType={BtnType.Raised}>Read more</Button>
                      </CardFooter>
                      </CardBody>
                  </Col>
                  </Row>
              </Card>
              </Col>
              ))}
          </Row>
          <Row className={classes.btnViewMore}>
            <Button btnType={BtnType.Linear} isDot={true}>VIEW MORE</Button>
          </Row>
        </Container>
      </div>
    </>
  );
  })
  
  export default Section;
  