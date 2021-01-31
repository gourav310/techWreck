import React from "react";
import {Link} from 'react-router-dom'
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, CardLink
} from 'reactstrap';
import image1 from "../myImage.png"
export default function Aboutus() {
    return <>
        <div className="container">
            <div className="row">
                <div>
                    <div className="aboutOurServices">About Founder</div>
                    <Card width="300px">
                        <CardBody>
                            <CardTitle tag="h5">Gourav Khurana</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">Govt. Engineering College, Bikaner</CardSubtitle>
                        </CardBody> <img width="100%" src={image1} alt="Card cap" />
                        <CardBody>
                            <CardText>Learner || Full Stack Developer || GECB-2021</CardText>
                            <CardLink href="https://www.linkedin.com/in/gouravkhurana/" target="_Blank">Linkedin</CardLink>
                            <CardLink href="https://github.com/gourav310" target="_Blank">Github</CardLink>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="aboutOurServices">TechWreck - About Our Services</div>
                <div className="aboutServices">We are your one stop PC repair shop on wheels! We have become the company people trust when it comes to onsite and online computer and IT repairs. Professionals & experts at  online and onsite computer repair and computer support services.</div>
                <div className="aboutServices">We are also experts at home and office, business and residential TV and Home Theater installation services , as well as traditional business and residential computer repair services.</div>
                <div className="aboutServices">We also provide installation services for TVs and peripherals, including smart home installations.</div>
                <div className="aboutServices">We believe in a personalized , one on one experience when having your computers worked on and TVs installed.</div>
                <div className="aboutServices">With us, always expect a warm friendly reception , or a timely reply to your inquiry.</div>
                <div className="aboutServices">We are always in constant communication with our customers until the job is done to their satisfaction.</div>
                <div className="aboutServices">Our large fleet of Geek Technicians , who all sign agreements when working for us, are highly qualified with years of experience in fixing computers and network related issues. Our experts service all computers like MAC, Dell, Hp, Compaq, Gateway… They remove virus, spywares, fix errors, remove private internet browsing history, upgrade PCs, Laptops, install networks, wireless or not, give you tips and advice!</div>
            </div> 
            <div className="aboutStart">Follow this <span style={{marginLeft:"10px",marginRight:"10px"}}><Link to="/"> link </Link></span> to get started.</div>
        </div>
    </>
}