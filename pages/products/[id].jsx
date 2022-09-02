import React, { useState } from "react"
import Head from "next/head";
import Axios from "axios"
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { FaShoppingCart } from 'react-icons/fa';


const SingleProduct = ({ _product }) => {
  const [ product, setProduct ] = useState(_product)

  // add to cart by product id
  const addToCart = (e) => {
    e.preventDefault()

    Axios.post(`http://localhost:3000/api/cart/${product.id}`)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })

    
  };

  return (
    <>
      <Head>
        <title>{product.title} || Amazing Soaps</title>
      </Head>

      <section>
        <Container>
            <Row>
              <Col 
                xs={12} 
                md={4} 
                lg={3}
              >
                  <Card>
                      {product.media?.src && (
                        <Card.Img 
                          src={product.media.src} 
                          alt={product.media.alt}
                        />
                      )}

                      <Card.Body>
                          <Card.Title>{product.title}</Card.Title>
                          <Card.Text>{product.id}</Card.Text>

                          <Button 
                          variant="success"
                          onClick={(e) => {
                            addToCart(e);
                          }}
                          ><FaShoppingCart />
                          </Button>{' '}

                      </Card.Body>
                  </Card>
              </Col>
            </Row>
        </Container>
      </section>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps(ctx) {
  const productId = ctx.query?.id
  let _product = null

  try {
    const { data } = await Axios.get(`http://localhost:3000/api/product/${productId}`)

    if (data.product) {
      _product = data.product
    } else {
      // Return 404
      return {
        notFound: true,
      }
    }
  } catch (err) {
    // Return 404
    return {
      notFound: true,
    }
  }

  return { 
    props: { _product } 
  }
}

export default SingleProduct


