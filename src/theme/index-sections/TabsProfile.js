import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components

function Tabs() {
  const [iconTabs, setIconTabs] = React.useState("1");
  const [tabs, setTabs] = React.useState("1");
  return (
    <>
      <div className="section section-tabs">
        <Container>
          <Row>
          <Col className="ml-auto mr-auto" md="10" xl="6">
          <h2 className="title text-center">My Experience</h2>
          </Col>
          </Row>
          <Row>
            
            <Col className="ml-auto mr-auto" md="10" xl="6">
              
              <Card>
              <h3 className="category">Business Analyst</h3>
                <CardHeader>
                  <Nav className="justify-content-center" role="tablist" tabs>
                    <NavItem>
                      <NavLink
                        className={iconTabs === "1" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setIconTabs("1");
                        }}
                      >
                      
                        Main
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={iconTabs === "2" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setIconTabs("2");
                        }}
                      >
                        
                        Summary
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={iconTabs === "3" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setIconTabs("3");
                        }}
                      >
                        
                        Responsibilities
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent
                    className="text-left"
                    activeTab={"iconTabs" + iconTabs}
                  >
                    <TabPane tabId="iconTabs1">
                      <p>
                       - Ministry of Peace
                      </p>
                      <p>
                       - January 2021 until Present
                      </p>
                      <p>
                       - New Zealand
                      </p>
                      <p>
                       - 1 year 3 months
                      </p>
                    </TabPane>
                    <TabPane tabId="iconTabs2">
                      <p>
                        I will be the leader of a company that ends up being
                        worth billions of dollars, because I got the answers. I
                        understand culture. I am the nucleus. I think that’s a
                        responsibility that I have, to push possibilities, to
                        show people, this is the level that things could be at.
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at.
                      </p>
                    </TabPane>
                    <TabPane tabId="iconTabs3">
                      <p>
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at. So when you get something that has
                        the name Kanye West on it, it’s supposed to be pushing
                        the furthest possibilities. I will be the leader of a
                        company that ends up being worth billions of dollars,
                        because I got the answers. I understand culture. I am
                        the nucleus.
                      </p>
                    </TabPane>
                    
                  </TabContent>
                </CardBody>
              </Card>
            </Col>




            
            
            <Col className="ml-auto mr-auto" md="10" xl="6">
              
              <Card>
              <h3 className="category">Business Analyst</h3>
                <CardHeader>
                  <Nav className="justify-content-center" role="tablist" tabs>
                    <NavItem>
                      <NavLink
                        className={iconTabs === "1" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setIconTabs("1");
                        }}
                      >
                      
                        Main
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={iconTabs === "2" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setIconTabs("2");
                        }}
                      >
                        
                        Summary
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={iconTabs === "3" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setIconTabs("3");
                        }}
                      >
                        
                        Responsibilities
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent
                    className="text-left"
                    activeTab={"iconTabs" + iconTabs}
                  >
                    <TabPane tabId="iconTabs1">
                      <p>
                       - Ministry of Peace
                      </p>
                      <p>
                       - January 2021 until Present
                      </p>
                      <p>
                       - New Zealand
                      </p>
                      <p>
                       - 1 year 3 months
                      </p>
                    </TabPane>
                    <TabPane tabId="iconTabs2">
                      <p>
                        I will be the leader of a company that ends up being
                        worth billions of dollars, because I got the answers. I
                        understand culture. I am the nucleus. I think that’s a
                        responsibility that I have, to push possibilities, to
                        show people, this is the level that things could be at.
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at.
                      </p>
                    </TabPane>
                    <TabPane tabId="iconTabs3">
                      <p>
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at. So when you get something that has
                        the name Kanye West on it, it’s supposed to be pushing
                        the furthest possibilities. I will be the leader of a
                        company that ends up being worth billions of dollars,
                        because I got the answers. I understand culture. I am
                        the nucleus.
                      </p>
                    </TabPane>
                    
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
            <Col className="ml-auto mr-auto" md="10" xl="6">
              
              <Card>
              <h3 className="category">Business Analyst</h3>
                <CardHeader>
                  <Nav className="justify-content-center" role="tablist" tabs>
                    <NavItem>
                      <NavLink
                        className={iconTabs === "1" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setIconTabs("1");
                        }}
                      >
                      
                        Main
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={iconTabs === "2" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setIconTabs("2");
                        }}
                      >
                        
                        Summary
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={iconTabs === "3" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setIconTabs("3");
                        }}
                      >
                        
                        Responsibilities
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent
                    className="text-left"
                    activeTab={"iconTabs" + iconTabs}
                  >
                    <TabPane tabId="iconTabs1">
                      <p>
                       - Ministry of Peace
                      </p>
                      <p>
                       - January 2021 until Present
                      </p>
                      <p>
                       - New Zealand
                      </p>
                      <p>
                       - 1 year 3 months
                      </p>
                    </TabPane>
                    <TabPane tabId="iconTabs2">
                      <p>
                        I will be the leader of a company that ends up being
                        worth billions of dollars, because I got the answers. I
                        understand culture. I am the nucleus. I think that’s a
                        responsibility that I have, to push possibilities, to
                        show people, this is the level that things could be at.
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at.
                      </p>
                    </TabPane>
                    <TabPane tabId="iconTabs3">
                      <p>
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at. So when you get something that has
                        the name Kanye West on it, it’s supposed to be pushing
                        the furthest possibilities. I will be the leader of a
                        company that ends up being worth billions of dollars,
                        because I got the answers. I understand culture. I am
                        the nucleus.
                      </p>
                    </TabPane>
                    
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
            <Col className="ml-auto mr-auto" md="10" xl="6">
              
              <Card>
              <h3 className="category">Business Analyst</h3>
                <CardHeader>
                  <Nav className="justify-content-center" role="tablist" tabs>
                    <NavItem>
                      <NavLink
                        className={iconTabs === "1" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setIconTabs("1");
                        }}
                      >
                      
                        Main
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={iconTabs === "2" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setIconTabs("2");
                        }}
                      >
                        
                        Summary
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={iconTabs === "3" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setIconTabs("3");
                        }}
                      >
                        
                        Responsibilities
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent
                    className="text-left"
                    activeTab={"iconTabs" + iconTabs}
                  >
                    <TabPane tabId="iconTabs1">
                      <p>
                       - Ministry of Peace
                      </p>
                      <p>
                       - January 2021 until Present
                      </p>
                      <p>
                       - New Zealand
                      </p>
                      <p>
                       - 1 year 3 months
                      </p>
                    </TabPane>
                    <TabPane tabId="iconTabs2">
                      <p>
                        I will be the leader of a company that ends up being
                        worth billions of dollars, because I got the answers. I
                        understand culture. I am the nucleus. I think that’s a
                        responsibility that I have, to push possibilities, to
                        show people, this is the level that things could be at.
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at.
                      </p>
                    </TabPane>
                    <TabPane tabId="iconTabs3">
                      <p>
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at. So when you get something that has
                        the name Kanye West on it, it’s supposed to be pushing
                        the furthest possibilities. I will be the leader of a
                        company that ends up being worth billions of dollars,
                        because I got the answers. I understand culture. I am
                        the nucleus.
                      </p>
                    </TabPane>
                    
                  </TabContent>
                </CardBody>
              </Card>
            </Col>




            
            
            
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Tabs;
