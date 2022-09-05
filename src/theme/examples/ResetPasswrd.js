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
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
// core components
import ScrollNavbar from "components/Navbars/ScrollNavbar";
import Footer from "components/Footers/FooterTransparent";
import { resetPassword } from '../../services/UserService';

function ResetPasswrd(props) {

    const [passwordFocus, setPasswordFocus] = React.useState(false);
    const [passwordConfirmationFocus, setPasswordConfirmationFocus] = React.useState(false);
    const location = useLocation();

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
            const parsed = queryString.parse(location.search);
            await resetPassword(parsed.code, e.target.password.value, e.target.passwordConfirmation.value);
            window.location = '/login-page';
        } catch (e) {
            console.log('failed to send forgot password');
            console.log(e.message);
        }
    }

    return (<>
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
                                                (passwordFocus ? " input-group-focus" : "")
                                            }
                                        >
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons users_circle-08"></i>
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
                                        <InputGroup
                                            className={
                                                "no-border input-lg" +
                                                (passwordConfirmationFocus ? " input-group-focus" : "")
                                            }
                                        >
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons users_circle-08"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Password Confirmation"
                                                type="password"
                                                onFocus={() => setPasswordConfirmationFocus(true)}
                                                onBlur={() => setPasswordConfirmationFocus(false)}
                                                name="passwordConfirmation"
                                            ></Input>
                                        </InputGroup>
                                        <Button
                                            block
                                            className="btn-round"
                                            color="primary"
                                            type="submit"
                                            size="lg"
                                        >
                                            Submit
                                        </Button>
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
    </>)
}

export default ResetPasswrd;
