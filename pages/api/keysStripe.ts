import {knex} from '../../config/connection'
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === "GET") {
        var publicKey = 'sk_test_51KPyFeBErBDSWohk1uEmyvY1OMXorPd2Bgm6EYThMOOTOmRAI4sOvEL6RBEpG2gTu1OnA1CVuS7VEKVVH1nAHOVS00uhk6qMWX'
        res.status(200).json({
            publicKey: publicKey
        })
       
    }else{
        res.status(403);
        res.send("Falha com a requisição");
    }
    
}