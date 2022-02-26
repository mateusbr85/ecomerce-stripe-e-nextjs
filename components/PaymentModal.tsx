import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import axios from 'axios'
import { Elements } from '@stripe/react-stripe-js';

class PaymentModal extends React.Component <any,{}> {
    public state = {
        show: false,
        publishabkley: "",
    }
    finalizarCompra = (id: any) => {
        // alert(id)
        axios
        .get("/api/keysStripe")
        .then((res => {
            console.log("teste", res)
            this.setState({
            publishabkley: res.data.publicKey
            })
        }))
        this.setState({show:true})
        axios 
            .post("/api/stripe/", {id: id, publicKey: this.state.publishabkley})
            .then((res: any) => {
                console.log(res.data[0])
                var produtos = res.data[0]
                this.setState({
                productDescrption: produtos.product_descrption,
                productName: produtos.product_name,
                productPrice: produtos.product_price
                })
            })
    }
    render() {
        return (<>
            <Modal
                show={this.props.show}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                    {this.props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{this.props.nameProduct}</h4>
                    <p>
                    {this.props.description}
                    </p>
                    <p>
                    R$ {this.props.productPrice}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.finalizarCompra(this.props.idModal)}> Comprar</Button>
                    <Button onClick={this.props.onCancel}>Close</Button>
                </Modal.Footer>
            </Modal>
        
        </>)
    }
}

export default PaymentModal