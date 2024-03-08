import React from 'react'
import { Row, Form, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./styles.scss"

function NewsLetterComponent() {
  const { handleSubmit, register } = useForm({});
  const newsLetterSubmit = () => {
    console.log("submit");
  }
  return (
    <div className="bg-primary-bg">
      <div className="container py-5">
        <h4 className='text-white pb-3 text-center'>Subscribe to our newsletter</h4>
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
      </div>
    </div>
  )
}

export default NewsLetterComponent