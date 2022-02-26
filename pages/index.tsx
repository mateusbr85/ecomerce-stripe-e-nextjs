import type { NextPage } from 'next'
import React from 'react'
import {Card, Button, InputGroup, FormControl, Row, Col} from 'react-bootstrap'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import PaymentModal from '../components/PaymentModal'
import { ToastContainer, toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';

class Home extends React.Component <any,{}> {
  public state = {
    nameProductSearch: "",
    dadosProdutos: [],
    show: false,
    publishabkley: "",
    productDescrption: "",
    productName: "",
    productPrice: "",
    productId: "",
  }

  buscaProduto = (nameProduct: any) => {
    //console.log(nameProduct)
    axios
      .post("/api/products/", {textProduct: nameProduct})
      .then((res => {
        if(res.status == 200) {
          var resultSearch = res.data
          this.setState({dadosProdutos: resultSearch[0]})
          toast("Pesquisa realizada com sucesso")
        }
      }))
    
  }

  requiscaoStripe = (dados: any) => {
    // console.log(dados)
    this.setState({
      productId: dados.id,
      productDescrption: dados.description,
      productName: dados.name,
      productPrice: dados.price
    })
    this.setState({show:true})
  }


  render() {
    return(<>
      <PaymentModal
        show={this.state.show}
        title={"Pagamento via Stripe"}
        idModal={this.state.productId}
        nameProduct={this.state.productName}
        productPrice={this.state.productPrice}
        onCancel={() => {
          this.setState({show:false})
        }}
        keypublickstripe={this.state.publishabkley}
        description={this.state.productDescrption}
      />
      <ToastContainer/>
      <body>
        <div className="divPrincipal">
          <div>
            <div className="titulo">Pesquise pelo Produto</div>
          <InputGroup className="mb-5">
            <FormControl
              placeholder="Digite o Produto"
              aria-label="Recipient's username"
              onChange={(event) => this.setState({nameProductSearch: event.target.value})}
              
            />
            <Button variant="outline-primary" id="button-addon2" onClick={() => this.buscaProduto(this.state.nameProductSearch)}>
              Buscar
            </Button>
          </InputGroup>
          </div>
          <Row xs={1} md={3} className="g-4">
            {this.state.dadosProdutos.map((item: any) => {
              return (<>
                <Col>
                <Card style={{ width: '14rem', height: '16rem' }}>
                <Card.Body>
                  <Card.Title>{item.product_name}</Card.Title>
                  <Card.Text>
                    {item.product_descrption}
                  </Card.Text>
                  <Button variant="primary" onClick={() => this.requiscaoStripe({
                    id: item.id, 
                    description: item.product_descrption, 
                    name: item.product_name, 
                    price: item.product_price})}>R$ {item.product_price}</Button>
                </Card.Body>
              </Card>
              </Col>
            </>)
            })}
          </Row>
        </div>
      </body>
    </>)
  }
}


export default Home;