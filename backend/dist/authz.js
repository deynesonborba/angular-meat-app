"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
var api_config_1 = require("./api-config");
//Verifica se o token é válido
exports.handleAuthorizarion = function (req, resp, next) {
    var token = extractToken(req);
    console.log('sss');
    if (!token) {
        resp.setHeader('WWW-Autenticate', 'Bearer token_type="JWT"');
        resp.status(401).json({ message: 'Você precisa de autenticar.' });
    }
    else {
        jwt.verify(token, api_config_1.apiConfig.secret, function (error, decoded) {
            if (decoded) {
                next();
            }
            else {
                resp.status(403).json({ message: 'Não autorizado.' });
            }
        });
    }
};
function extractToken(req) {
    var token = undefined;
    if (req.headers && req.headers['authorization']) {
        //Autorization: Bearer zzz.zzz.zzz
        var parts = req.headers['authorization'].split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }
    return token;
}
