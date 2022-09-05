import React from "react";
import Logo from "../../assets/img/logo.png"
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useHistory } from "react-router-dom";
// core components

import ScrollNavbar from "components/Navbars/ScrollNavbar";
import Footer from "components/Footers/FooterTransparent";
import { register, confirm, amplifyRegister } from '../../services/UserService';

function SignupPage() {
  // const [nameFocus, setNameFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [usernameFocus, setUsernameFocus] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const history = useHistory();

  React.useEffect(() => {
    document.body.classList.add("signup-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("signup-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      const results = await confirm(user);
      console.log(results);
      history.push('/login-page');
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await amplifyRegister(e.target.username.value, e.target.email.value, e.target.password.value);
      const {user: { email }} = response.data;
      setUser(email);
    } catch (e) {
      console.error(e.message);
      setUser(null);
    }
  }
  return (
    <>
      <ScrollNavbar />
      <div className="page-header header-filter" filter-color="yellow">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/employer_login.jpg") + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="6" lg="4">
                <div className="info info-horizontal">
                  <div className="icon icon-info">
                    <i className="now-ui-icons media-2_sound-wave"></i>
                  </div>
                  <div className="description">
                    <h5 className="info-title">Connecting the right people</h5>
                    <p className="description">
                      We simplify the finding talent experience. Our software allows you to enter your requirements and automatically recieve offers that match the closest
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon icon-info">
                    <i className="now-ui-icons media-1_button-pause"></i>
                  </div>
                  <div className="description">
                    <h5 className="info-title">End to End Technology Partner</h5>
                    <p className="description">
                      Continuously updating new features to simplify finding talent, managing contracts, approving timesheets and creating a single payroll invoice for all.
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon icon-info">
                    <i className="now-ui-icons users_single-02"></i>
                  </div>
                  <div className="description">
                    <h5 className="info-title">Simple Pricing</h5>
                    <p className="description">
                      Necta is a membership system, we offer everyone the chance to join. Its free for one active engagement and a simple tier system for increased needs.
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="mr-auto" md="6" lg="4">
                <Card className="card-signup">
                  <CardBody>
                  <img
                          alt="..."
                          src={Logo}
                          width={150}
                        ></img>
                    <CardTitle className="text-center" tag="h4">
                      Employer Sign In or Register
                    </CardTitle>
                    
                    {!user ? (
                      <Form action="" className="form" method="" onSubmit={handleSignUp}>
                        
                        <InputGroup
                          className={emailFocus ? "input-group-focus" : ""}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons ui-1_email-85"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            autoComplete="email"
                            placeholder="Email"
                            type="email"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            name="email"
                          ></Input>
                        </InputGroup>
                        <InputGroup
                          className={passwordFocus ? "input-group-focus" : ""}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons text_caps-small"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                            name="password"
                          ></Input>
                        </InputGroup>
                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox"></Input>
                            <span className="form-check-sign"></span>I agree to
                            the terms and{" "}
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                              conditions
                            </a>
                            .
                          </Label>
                        </FormGroup>
                        <CardFooter className="text-center">
                          <Button
                            className="btn-round"
                            color="primary"
                            // onClick={(e) => e.preventDefault()}
                            type="submit"
                            size="lg"
                          >
                            Get Started
                          </Button>
                        </CardFooter>
                      </Form>
                    ) : (
                      <Form action="" className="form" method="" onSubmit={handleConfirm}>
                        <CardFooter className="text-center">
                          <Button
                            className="btn-round"
                            color="primary"
                            type="submit"
                            size="lg"
                          >
                            Resend Confirmation Email
                          </Button>
                        </CardFooter>
                      </Form>
                    )}

                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default SignupPage;
