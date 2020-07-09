import {Request, Response} from 'express'
import {User, users} from './users'

import * as jwt from 'jsonwebtoken'
import { apiConfig } from "./api-config";


export const handleAuthentication = (req: Request, resp: Response) => {
  const user: User = req.body
  console.log('Veio para o auth')
  if(isValid(user)){
    const dbUser = users[user.email]
    //Gerando token aqui
    const token = jwt.sign({sub: dbUser.email, iss: 'meat-api'}, apiConfig.secret)
    resp.json({name: dbUser.name, email: dbUser.email, accessToken: token})
  }else{
    resp.status(403).json({message: 'Dados inválidos.'})
  }
}


function isValid(user: User): boolean{
  if(!user){
    return false
  }
  const dbUser = users[user.email]
                                  //confere se os usuários são idênticos, inclusive password
  return dbUser !== undefined && dbUser.matches(user)
}
