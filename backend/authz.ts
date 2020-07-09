import {Request, Response} from 'express'
import * as jwt from 'jsonwebtoken'
import { apiConfig } from "./api-config";


//Verifica se o token é válido
export const handleAuthorizarion = (req: Request, resp: Response, next) => {
  const token = extractToken(req)
  console.log('sss')
  if(!token){
    resp.setHeader('WWW-Autenticate', 'Bearer token_type="JWT"')
    resp.status(401).json({message: 'Você precisa de autenticar.'})
  }else{
    jwt.verify(token, apiConfig.secret, (error, decoded) => {
      if(decoded){
        next()
      }else{
        resp.status(403).json({message: 'Não autorizado.'})
      }
    })
  }
}

function extractToken(req: Request): string{
  let token = undefined

  if(req.headers && req.headers['authorization']){
    //Autorization: Bearer zzz.zzz.zzz
    const parts: string[] = req.headers['authorization'].split(' ')
    if(parts.length === 2 && parts[0] === 'Bearer'){
      token = parts[1]
    }
  }
  return token
}
