
import React from "react";
import {Row, Col, Container} from 'reactstrap';
import "./PrivacyPolicySection.scss";

const PrivacyPolicySection = ({ data }) => {
  return (
    <div className="section section-sections" style={{minHeight:'600px', paddingBottom: '20px'}}>
      <Container>
          <Row>
              <Col className="ml-auto mr-auto" md="8">
                <div className="text-start privacy-policy-title">
                    Privacy Policy
                </div>
              </Col>
          </Row>
            <Row>
                <Col className="ml-auto mr-auto" md="8">
                {data && data.attributes && data.attributes.Description ? <p className="privacy-description">{data.attributes.Description}</p>: <span />}
                </Col>
            </Row>
      </Container>
    </div>
  );
};
export default PrivacyPolicySection;
