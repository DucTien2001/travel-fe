import React, {memo} from "react";
import {
  Container,
  Row,
  Col,
} from "reactstrap";

// eslint-disable-next-line react/display-name
const ProductPage = memo(()=> {

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
    <div className="section">
          <Container>
            <div className="section">
              <Row>
                <Col className="ml-auto mr-auto text-center mr-5" md="8">
                  <h2 className="title">How to wear it</h2>
                  <h4 className="description">
                    You need more information? Check what other persons are
                    saying about our product. They are very happy with their
                    purchase.
                  </h4>
                </Col>
              </Row>
              <div className="section-story-overview">
                <Row>
                  <Col className="ml-auto mr-auto" md="4">
                    <div
                      className="image-container image-left"
                      style={{
                        backgroundImage:
                          "url(" + require("assets/img/pp-5.jpg") + ")",
                      }}
                    >
                      <p className="blockquote blockquote-info">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        "Over the span of the satellite record, Arctic sea ice
                        has been declining significantly, while sea ice in the
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        Antarctichas increased very slightly" <br></br>
                        <br></br>
                        <small>- NOAA</small>
                      </p>
                    </div>
                    <div
                      className="image-container"
                      style={{
                        backgroundImage:
                          "url(" + require("assets/img/bg29.jpg") + ")",
                      }}
                    ></div>
                  </Col>
                  <Col className="ml-auto mr-auto" md="4">
                    <div
                      className="image-container image-right"
                      style={{
                        backgroundImage:
                          "url(" + require("assets/img/pp-4.jpg") + ")",
                      }}
                    ></div>
                    <h3>
                      So what does the new record for the lowest level of winter
                      ice actually mean
                    </h3>
                    <p>
                      The Arctic Ocean freezes every winter and much of the
                      sea-ice then thaws every summer, and that process will
                      continue whatever happens with climate change. Even if the
                      Arctic continues to be one of the fastest-warming regions
                      of the world, it will always be plunged into bitterly cold
                      polar dark every winter. And year-by-year, for all kinds
                      of natural reasons, there’s huge variety of the state of
                      the ice.
                    </p>
                    <p>
                      For a start, it does not automatically follow that a
                      record amount of ice will melt this summer. More important
                      for determining the size of the annual thaw is the state
                      of the weather as the midnight sun approaches and
                      temperatures rise. But over the more than 30 years of
                      satellite records, scientists have observed a clear
                      pattern of decline, decade-by-decade.
                    </p>
                  </Col>
                </Row>
              </div>
            </div>
          </Container>
    </div>
    </>
  );
})

export default ProductPage;
