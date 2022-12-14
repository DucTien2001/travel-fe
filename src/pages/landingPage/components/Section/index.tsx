import { memo } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardFooter,
    Badge,
  } from "reactstrap";
import {images} from "configs/images";
import Button, {BtnType} from "components/common/buttons/Button";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import { ReducerType } from "redux/reducers";
import { fCurrency2VND } from "utils/formatNumber";
import Link from "next/link";

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
  const {allTours} = useSelector((state: ReducerType) => state.normal);
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
              <Col md="6">
              <Card className="card-profile card-plain">
                <Row>
                  <Col md="5" className={classes.col}>
                      <div className={clsx("card-image", classes.imgWrapper)}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                            alt="..."
                            className="img img-raised rounded"
                            src={allTours[2]?.images[0]}
                            ></img>
                      </div>
                  </Col>
                  <Col md="7" className={classes.col}>
                      <CardBody className={classes.cardBody}>
                        <CardTitle tag="h4" className={classes.title}>
                        <p className={classes.titleDesktop}>{allTours[2]?.title}</p>
                          <p className={classes.tagMobile}>{allTours[2]?.title}</p>
                          {fCurrency2VND(allTours[2]?.price)} VND
                        </CardTitle>
                        <div className={classes.offerContentLike}>
                          {[...Array(allTours[2]?.rate)].map((star, index) => {
                            return (
                              <FontAwesomeIcon icon={faStar} key={index}></FontAwesomeIcon>
                            )
                          })}
                        </div>
                        {allTours[2]?.tags.map((item, index) => (<Badge pill color="var(--violet-color)" className={classes.badge} key={index}>{item}</Badge>))}
                      <p className={clsx("card-description", classes.textDesc)}>
                          {allTours[2]?.description}
                      </p>
                      <CardFooter>
                        <Link href={`/listTour/:${allTours[2]?.id}`}>
                          <a>
                          <Button btnType={BtnType.Raised}>Read more</Button>
                          </a>
                        </Link>
                      </CardFooter>
                      </CardBody>
                  </Col>
                  </Row>
              </Card>
              </Col>
              <Col md="6">
              <Card className="card-profile card-plain">
                <Row>
                  <Col md="5" className={classes.col}>
                      <div className={clsx("card-image", classes.imgWrapper)}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                            alt="..."
                            className="img img-raised rounded"
                            src={allTours[3]?.images[0]}
                            ></img>
                      </div>
                  </Col>
                  <Col md="7" className={classes.col}>
                      <CardBody className={classes.cardBody}>
                        <CardTitle tag="h4" className={classes.title}>
                          <p className={classes.titleDesktop}>{allTours[3]?.title}</p>
                          <p className={classes.tagMobile}>{allTours[3]?.title}</p>                   
                          {fCurrency2VND(allTours[3]?.price)} VND
                        </CardTitle>
                        <div className={classes.offerContentLike}>
                          {[...Array(allTours[3]?.rate)].map((star, index) => {
                            return (
                              <FontAwesomeIcon icon={faStar} key={index}></FontAwesomeIcon>
                            )
                          })}
                        </div>
                        {allTours[3]?.tags.map((item, index) => (<Badge pill color="var(--violet-color)" className={classes.badge} key={index}>{item}</Badge>))}
                      <p className={clsx("card-description", classes.textDesc)}>
                          {allTours[3]?.description}
                      </p>
                      <CardFooter>
                        <Link href={`/listTour/:${allTours[3]?.id}`}>
                          <a>
                          <Button btnType={BtnType.Raised}>Read more</Button>
                          </a>
                        </Link>
                      </CardFooter>
                      </CardBody>
                  </Col>
                  </Row>
              </Card>
              </Col>
              <Col md="6">
              <Card className="card-profile card-plain">
                <Row>
                  <Col md="5" className={classes.col}>
                      <div className={clsx("card-image", classes.imgWrapper)}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                            alt="..."
                            className="img img-raised rounded"
                            src={allTours[4]?.images[0]}
                            ></img>
                      </div>
                  </Col>
                  <Col md="7" className={classes.col}>
                      <CardBody className={classes.cardBody}>
                        <CardTitle tag="h4" className={classes.title}>
                          <p className={classes.titleDesktop}>{allTours[4]?.title}</p>
                          <p className={classes.tagMobile}>{allTours[4]?.title}</p>
                          {fCurrency2VND(allTours[4]?.price)} VND
                        </CardTitle>
                        <div className={classes.offerContentLike}>
                          {[...Array(allTours[4]?.rate)].map((star, index) => {
                            return (
                              <FontAwesomeIcon icon={faStar} key={index}></FontAwesomeIcon>
                            )
                          })}
                        </div>
                        {allTours[4]?.tags.map((item, index) => (<Badge pill color="var(--violet-color)" className={classes.badge} key={index}>{item}</Badge>))}
                      <p className={clsx("card-description", classes.textDesc)}>
                          {allTours[4]?.description}
                      </p>
                      <CardFooter>
                        <Link href={`/listTour/:${allTours[4]?.id}`}>
                          <a>
                          <Button btnType={BtnType.Raised}>Read more</Button>
                          </a>
                        </Link>
                      </CardFooter>
                      </CardBody>
                  </Col>
                  </Row>
              </Card>
              </Col>
              <Col md="6">
              <Card className="card-profile card-plain">
                <Row>
                  <Col md="5" className={classes.col}>
                      <div className={clsx("card-image", classes.imgWrapper)}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                            alt="..."
                            className="img img-raised rounded"
                            src={allTours[5]?.images[0]}
                            ></img>
                      </div>
                  </Col>
                  <Col md="7" className={classes.col}>
                      <CardBody className={classes.cardBody}>
                        <CardTitle tag="h4" className={classes.title}>
                          <p className={classes.titleDesktop}>{allTours[5]?.title}</p>
                          <p className={classes.tagMobile}>{allTours[5]?.title}</p>
                          {fCurrency2VND(allTours[5]?.price)} VND
                        </CardTitle>
                        <div className={classes.offerContentLike}>
                          {[...Array(allTours[5]?.rate)].map((star, index) => {
                            return (
                              <FontAwesomeIcon icon={faStar} key={index}></FontAwesomeIcon>
                            )
                          })}
                        </div>
                        {allTours[5]?.tags.map((item, index) => (<Badge pill color="var(--violet-color)" className={classes.badge} key={index}>{item}</Badge>))}
                      <p className={clsx("card-description", classes.textDesc)}>
                          {allTours[5]?.description}
                      </p>
                      <CardFooter>
                        <Link href={`/listTour/:${allTours[5]?.id}`}>
                          <a>
                          <Button btnType={BtnType.Raised}>Read more</Button>
                          </a>
                        </Link>
                      </CardFooter>
                      </CardBody>
                  </Col>
                  </Row>
              </Card>
              </Col>
          </Row>
          <Row className={classes.btnViewMore}>
            <Link href="/listTour">
              <a>
              <Button btnType={BtnType.Linear} isDot={true}>VIEW MORE</Button>
              </a>
            </Link>
          </Row>
        </Container>
      </div>
    </>
  );
  })
  
  export default Section;
  