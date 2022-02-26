import {knex} from '../../config/connection'
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === "POST") {
        var keystripe = 'sk_test_51KPyFeBErBDSWohk1uEmyvY1OMXorPd2Bgm6EYThMOOTOmRAI4sOvEL6RBEpG2gTu1OnA1CVuS7VEKVVH1nAHOVS00uhk6qMWX'
       // console.log("Chave por requisição",keystripe)
        var produtos = await knex("products").where("id", req.body.id)
        const stripe = require('stripe')(keystripe)
        await stripe.paymentIntents.create({
            amount: produtos[0].product_price,
            currency: "BRL",

        })
        //console.log(produtos)
        res.status(200); 
        res.send(produtos);
    }else{
        res.status(403);
        res.send("Falha com a requisição");
    }
    
}