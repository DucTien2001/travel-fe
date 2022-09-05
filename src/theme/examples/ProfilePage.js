import React from "react";
import ScrollNavbar from "components/Navbars/ScrollNavbar";
import TabsProfile from "../index-sections/TabsProfile.js";
// reactstrap components
import { Button, Container, UncontrolledTooltip } from "reactstrap";

// core components

import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import FooterDefault from "components/Footers/FooterDefault";

function ProfilePage() {
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <>
      <ScrollNavbar />
      <div className="wrapper">
        <ProfilePageHeader />
        <div className="section">
          <Container>
            <div className="button-container">
              <Button
                className="btn-round mr-1"
                color="primary"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                size="lg"
              >
                Message
              </Button>
              <Button
                className="btn-round btn-icon mr-1"
                color="default"
                href="#pablo"
                id="tooltip871723210"
                onClick={(e) => e.preventDefault()}
                size="lg"
              >
                <i className="fab fa-linkedin"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip871723210">
                See my Linkedin Profile
              </UncontrolledTooltip>
            </div>
            <h3 className="title">About me</h3>
            <p className="description text-left">
              Purpose: To partner with leaders to maximise their organisations
              potential I focus on three key areas; lean business innovation,
              agility coaching and adaptive strategy. With sixteen years in a
              broad range of industries and ten years of leadership experience,
              I have learnt to approach problems critically, ensuring I go
              between consultation and educational leadership to deliver
              customer value while growing those around me. I love working with
              people to identify customer needs and how to provide value to
              them, then using that data to feed into the next learning cycle I
              am always looking for the next challenge, both for my clients and
              for myself. This led me to join the Masseys Executive MBA
              programme, focusing my thesis on increasing customer value through
              adaptive organisation design. Surge.Coach works to deliver value
              through Agility Transformations, certified training and coaching
              as a service (Remote Scrum Master and executive coaching) My
              experience to date have allowed me to: • Identify measurable
              benefits focused on delivering value to end customers • Challenge
              my knowledge of different frameworks • Manage projects using
              Prince2 methodology • Enable Teams to achieve high-quality results
              on time Strengths I will bring to my next role include: • ICAGILE
              Certified for agile Training • Valuable experience in Design
              Thinking, Business Development and Lean Transformations •
              Certified Scrum master • Excellent written and verbal
              communication • Passion for SuperLeadership and to enable people
              to meet their intrinsic goals • Leveraging social leadership and
              personal brand to manage stakeholder relationships
            </p>
          </Container>
        </div>
        <TabsProfile />
        <FooterDefault />
      </div>
    </>
  );
}

export default ProfilePage;
