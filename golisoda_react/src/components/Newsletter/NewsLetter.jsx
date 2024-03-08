import React from 'react'
import { Row, Form, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import newsImg from "assets/newsletter.png";

import "./styles.scss"

function NewsLetterComponent() {
  const { handleSubmit, register } = useForm({});
  const newsLetterSubmit = () => {
    console.log("submit");
  }
  return (
    <div className="bg-primary-bg">
      <div className="container py-5">
        <Row className='align-items-center'>
          <Col md={6} className='text-center'>
            <img src={newsImg} style={{ width: "40%" }} alt="" />
          </Col>
          <Col md={6}>
            <h4 className='text-white pb-3'>Subscribe to our newsletter</h4>
            <p className='text-white pb-4'>Subscribe now for hand-picked deals and offers, straight to your inbox.</p>
            <Form onSubmit={handleSubmit(newsLetterSubmit)}>
              <div className='newLetterCtr'>
                <div className="hstack gap-3">
                  <Form.Group as={Row} controlId="firstName" className='w-100'>
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Enter email to subscribe"
                        {...register('email', { required: true })}
                      />
                    </Col>
                  </Form.Group>
                  <Button className='submitBtnNewsLetter'>Submit</Button>
                </div>

              </div>
            </Form>
          </Col>
        </Row>

      </div>
    </div>
  )
}

export default NewsLetterComponent