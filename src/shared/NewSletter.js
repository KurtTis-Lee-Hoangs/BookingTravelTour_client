import React from 'react'
import "../styles/newsletter.css";
import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";

const NewSletter = () => {
  return <section className="newsletter">
    <Container>
        <Row>
            <Col lg="6">
                <div className='newsletter__content'>
                    <h2>Subscribe now to get useful traveling infomation</h2>
                    <div className="newsletter__input">
                        <input type="email" placeholder='Enter your email' />
                        <button className='btn newsletter__btn'>Subscribe</button>
                    </div>

                    <p>
                        By subscribing to our mailing list you will always be update with the latest news from us.
                    </p>
                </div>
            </Col>

            <Col lg="6">
                <div className="newsletter__img">
                    <img src={maleTourist} alt="" />
                </div>
            </Col>
        </Row>
    </Container>
  </section>
}

export default NewSletter
