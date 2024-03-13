import React from 'react'
import { Row, Form, Col, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import newsImg from "assets/newsletter.png";
import { toast } from 'react-hot-toast';
import "./styles.scss"
import { newsLetterApi } from 'services/customer.service';
import { useState } from 'react';

function NewsLetterComponent() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false)

  const onSubmit = async (formData) => {
    setLoading(true)
    newsLetterApi(formData).then(response => {
      if (response?.data?.status === 1) {
        setLoading(false)
        toast.success(response.data.message)
        reset()
      } else {
        setLoading(false)
        toast.error(response.data.message)
      }
    })
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
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className='newLetterCtr'>
                <div className="hstack gap-3">
                  <Form.Group as={Row} controlId="firstName" className='w-100'>
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Enter email to subscribe"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Please enter your email address",
                          },
                          pattern: {
                            value:
                              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Invalid email address",
                          },
                        })}
                      />
                    </Col>
                  </Form.Group>
                  <Button className='submitBtnNewsLetter' type="submit" >
                    {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
                  </Button>
                </div>
              </div>
              {errors?.email && <p className='text-white p-3'>{errors?.email?.message}</p>}
            </Form>
          </Col>
        </Row>

      </div>
    </div>
  )
}

export default NewsLetterComponent