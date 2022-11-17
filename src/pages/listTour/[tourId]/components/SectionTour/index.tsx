import React, {memo} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Collapse,
  Container,
  Row,
  Col,
  UncontrolledCarousel,
} from "reactstrap";
import {images} from "configs/images";
import Carousel from "components/Carousel";
import classes from "./styles.module.scss";
import Button, {BtnType} from "components/common/buttons/Button";
import Link from "next/link";
import { Tour } from "models/tour";
interface Props { 
  // id: number;
  // src: string;
  // title: string;
  // description: string;
  // businessHours: string;
  // location: string;
  // contact: string;
  // price: number;
  // discount?: number;
  // tags?: string;
  // rate: number;
  // creator: string;
  // isTemporarilyStopWorking?: boolean;
  // roomNumber?: string;
  // bookDates?: string;
  tour: Tour;
}

const items = [
  
  {
    src: images.phuQuoc.src,
    altText: "",
    caption: "",
  },
  {
    src: images.phuQuoc.src,
    altText: "",
    caption: "",
  },
  {
    src: images.phuQuoc.src,
    altText: "",
    caption: "",
  },
  {
    src: images.phuQuoc.src,
    altText: "",
    caption: "",
  },
];

// eslint-disable-next-line react/display-name
const SectionTour = memo(({
  // id, src, title, description, businessHours, 
  // location, contact, price, discount, 
  // tags, rate, creator, 
  // isTemporarilyStopWorking, roomNumber, bookDates
  tour
} : Props)=> {
  const [collapses, setCollapses] = React.useState([1]);
  const changeCollapse = (collapse: number) => {
    if (collapses.includes(collapse)) {
      setCollapses(collapses.filter((prop) => prop !== collapse));
    } else {
      setCollapses([...collapses, collapse]);
    }
  };

  React.useEffect(() => {
    document.body.classList.add("product-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("product-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  console.log(tour?.images);
  return (
    <>
        <div className="section">
          <Container>
            <Row>
              <Col md="5">
                {/* <Carousel
                  images={tour?.images}
                />
                 */}
                {/* <UncontrolledCarousel
                items={tour?.images}
                /> */}
                <p className={`blockquote blockquote-info ${classes.blockquote}`}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                  "And thank you for turning my personal jean jacket into a
                  couture piece. Wear yours with mirrored sunglasses on
               {/* eslint-disable-next-line react/no-unescaped-entities */}
                  vacation." <br></br>
                  <br></br>
                  <small>Kanye West</small>
                </p>
              </Col>
              <Col className="ml-auto mr-auto" md="6">
                <h2 className={`title ${classes.nameTour}`}>Saint Laurent</h2>
                <h5 className="category">Slim-Fit Leather Biker Jacket</h5>
                <h2 className={`main-price ${classes.price}`}>$3,390</h2>
                <div
                  aria-multiselectable={true}
                  className="card-collapse"
                  id="accordion"
                  role="tablist"
                >
                  <Card className="card-plain">
                    <CardHeader id="headingOne" role="tab">
                      <a
                        aria-expanded={collapses.includes(1)}
                        data-parent="#accordion"
                        data-toggle="collapse"
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          changeCollapse(1);
                        }}
                      >
                        Description{" "}
                        <i className="now-ui-icons arrows-1_minimal-down"></i>
                      </a>
                    </CardHeader>
                    <Collapse isOpen={collapses.includes(1)}>
                      <CardBody>
                        <p>
                          {/* eslint-disable-next-line react/no-unescaped-entities */}
                          Eres' daring 'Grigri Fortune' swimsuit has the fit and
                          coverage of a bikini in a one-piece silhouette. This
                          {/* eslint-disable-next-line react/no-unescaped-entities */}
                          fuchsia style is crafted from the label's sculpting
                          peau douce fabric and has flattering cutouts through
                          the torso and back. Wear yours with mirrored
                          sunglasses on vacation.
                        </p>
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card className="card-plain">
                    <CardHeader id="headingTwo" role="tab">
                      <a
                        aria-expanded={collapses.includes(2)}
                        data-parent="#accordion"
                        data-toggle="collapse"
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          changeCollapse(2);
                        }}
                      >
                        Designer Information{" "}
                        <i className="now-ui-icons arrows-1_minimal-down"></i>
                      </a>
                    </CardHeader>
                    <Collapse isOpen={collapses.includes(2)}>
                      <CardBody>
                        <p>
                          An infusion of West Coast cool and New York attitude,
                          Rebecca Minkoff is synonymous with It girl style.
                          Minkoff burst on the fashion scene with her
                          {/* eslint-disable-next-line react/no-unescaped-entities */}
                          best-selling 'Morning After Bag' and later expanded
                          her offering with the Rebecca Minkoff Collection - a
                          {/* eslint-disable-next-line react/no-unescaped-entities */}
                          range of luxe city staples with a "downtown romantic"
                          theme.
                        </p>
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card className="card-plain">
                    <CardHeader id="headingThree" role="tab">
                      <a
                        aria-expanded={collapses.includes(3)}
                        data-parent="#accordion"
                        data-toggle="collapse"
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          changeCollapse(3);
                        }}
                      >
                        Details and Care{" "}
                        <i className="now-ui-icons arrows-1_minimal-down"></i>
                      </a>
                    </CardHeader>
                    <Collapse isOpen={collapses.includes(3)}>
                      <CardBody>
                        <ul>
                          <li>Storm and midnight-blue stretch cotton-blend</li>
                          <li>
                            Notch lapels, functioning buttoned cuffs, two front
                            flap pockets, single vent, internal pocket
                          </li>
                          <li>Two button fastening</li>
                          <li>84% cotton, 14% nylon, 2% elastane</li>
                          <li>Dry clean</li>
                        </ul>
                      </CardBody>
                    </Collapse>
                  </Card>
                </div>
                <Row className="justify-content-end">
                  <Link href={`/book/[${tour?.id}]`}>
                  <Button className="mr-3" btnType={BtnType.Primary} isDot={true}>
                    Book now 
                  </Button>
                  </Link>
                </Row>
              </Col>
            </Row>
          </Container>
                      
        </div>
    </>
  );
})

export default SectionTour;
