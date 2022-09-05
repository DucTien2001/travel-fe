import React from "react";
import Logo from "../../assets/img/logo.png"
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row,
} from "reactstrap";
import { useHistory } from "react-router-dom";
// core components
import ScrollNavbar from "components/Navbars/ScrollNavbar";
import Footer from "components/Footers/FooterTransparent";
import { login, getCurrentUser } from '../../services/AuthService';
import { Redirect } from "react-router-dom";
import authFactory from "services/authService/AuthFactory";

function LoginPage(props) {

  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const history = useHistory();


  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(e.target.email.value, e.target.password.value);
      const {state} = props.location;
      window.location = state ? state.from.pathname : '/presentation'; 
    } catch (e) {
      console.log('failed to log in');
      console.log(e.message);
    }
  }

  return getCurrentUser() ? <Redirect to="/" /> :
  
  (
    <>
      <ScrollNavbar />
      <div className="page-header header-filter" filter-color="yellow">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/login.jpg") + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="5">
                <Card className="card-login card-plain">
                  <Form action="" className="form" method="" onSubmit={handleSubmit}>
                    <CardHeader className="text-center">
                      <div className="logo-container">
                      <img
                          alt="..."
                          src={Logo}
                    
                        ></img>
                      </div>
                    </CardHeader>
                    <CardBody>
                    
                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (emailFocus ? " input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons users_circle-08"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email"
                          type="email"
                          onFocus={() => setEmailFocus(true)}
                          onBlur={() => setEmailFocus(false)}
                          name="email"
                        ></Input>
                      </InputGroup>
                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (passwordFocus ? " input-group-focus" : "")
                        }
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
                      <Button
                        block
                        color="primary"
                        type="submit"
                        size="lg"
                      >
                        Login / Sign Up
                      </Button>
                      <Button
                    block
                    
                    
                    size="mg"
                   
                    onClick={() => authFactory.generate().loginGoogle()}
                  >
                    Sign in with Google
                  </Button>
                  <div className="pull-right">
                    <h6>
                      <a
                        className="link footer-link"
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push({
                          pathname: '/forgot-password'
                        })}}
                      >
                        Forgot password?
                      </a>
                    </h6>
                  </div>
                    </CardBody>
                    
                    <CardFooter className="text-center">
                      
                    </CardFooter>
                    
                  </Form>
                  
                  
                  
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

export default LoginPage;
