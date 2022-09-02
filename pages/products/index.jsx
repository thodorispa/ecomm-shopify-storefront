import React from "react"
import Head from "next/head";
import Link from "next/link";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";


const AllProducts = ({ _products }) => {
  const [ products, setProducts ] = useState(_products)

  return (
    <>
      <Head>
        <title>Welcome to Katoi</title>
      </Head>

      <section className="feed">
        <Container>
            <Row>
                {products?.map((product, i) => (
                    <Col 
                      key={i}
                      xs={12} 
                      md={4} 
                      lg={3}
                    >
                      <Link href={`/products/${product.id}`}>
                        <a>
                          <Card>
                              {/* <Card.Img 
                                src={product.media.image.url} 
                                alt={product.alt}
                              /> */}

                              <Card.Body>
                                  <Card.Title>{product.title}</Card.Title>
                                  <Card.Text>{product.id}</Card.Text>
                              </Card.Body>
                          </Card>
                        </a>
                      </Link>
                    </Col>
                ))}
            </Row>
        </Container>
        <section id="contact">

          
        </section>
      </section>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  try {
    const { data } = await Axios.get(`http://localhost:3000/api/product/all`)


    const _products = data.products || []

    return {
      props: {
        _products
      }
    }
  } catch (err) {
    return {
      props: {
        _products: [],
      }
    }
  }
}

export default AllProducts;


