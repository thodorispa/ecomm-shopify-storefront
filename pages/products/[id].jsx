import React, { useState } from "react"
import Head from "next/head";
import Axios from "axios"
import { Card, Row, Col, Container } from "react-bootstrap";


const SingleProduct = ({ _product }) => {
  const [ product, setProduct ] = useState(_product)

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
                      {product.media?.image?.url && (
                        <Card.Img 
                          src={product.media.image.url} 
                          alt={product.alt}
                        />
                      )}

                      <Card.Body>
                          <Card.Title>{product.title}</Card.Title>
                          <Card.Text>{product.id}</Card.Text>
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


