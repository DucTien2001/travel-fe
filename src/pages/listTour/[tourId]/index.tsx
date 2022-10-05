import React, {memo} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardLink,
  CardTitle,
  Collapse,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import SectionHeader from "components/Header/SectionHeader";
import {images} from "configs/images";
import Carousel from "components/Carousel";
import classes from "./styles.module.scss";
import Button, {BtnType} from "components/common/buttons/Button";
import SectionTour from "./SectionTour";
import BodyTour from "./BodyTour";
import RelatedTour from "./RelatedTour";

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
const ProductPage = memo(()=> {
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
  return (
    <>
      <div className="wrapper">
        <SectionHeader
        title="VIEW TOUR"
        src={images.bgUser.src}
        />
        <SectionTour/>
        <BodyTour/>
        <RelatedTour/>
      </div>
    </>
  );
})

export default ProductPage;
