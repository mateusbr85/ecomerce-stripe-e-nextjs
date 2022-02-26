import {knex} from '../../config/connection'
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === "POST") {
        console.log(req.body.textProduct )
        var termSearch = "%" + req.body.textProduct +  "%"
        var produtos = await knex("products").where("product_name", "like", termSearch)
        //console.log(produtos)
        

        res.status(200)
        res.send([produtos]);
        res.end(JSON.stringify({publishabkley: process.env.STRIPE_PUBLIC_KEY}));
    }else{
        res.status(403);
        res.send("Falha com a requisição");
    }
    
}