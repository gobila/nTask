const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const config = require('../config');

/**
 * 
 * @api {post} /token Autentica o usuário e gera um token
 * @apiGroup Credential
 * @apiParam {String} email Email de usuário
 * @apiParam {String} password Senha de usuário
 * @apiParamExample {json} Entrada
 *      {
 *          "email": "john@email.com",
 *          "password": "password1234"
 *       }
 * @apiSuccess {String} token Token de usuário autenticado
 * @apiSuccessExample {json} Sucesso
 *  HTTP/1.1 200 Ok
 *  {"token": "xyz.abc.123.hgf"}
 * @apiErrorExample {json} Error de autenticação
 *  HTTP/1.1 401 Unauthorized
 * 
 */
module.exports= (app)=>{
    const Users = app.models.users;
    const {secret} = config.jwt;

    app.post('/token', async(req,res)=>{
        try {
            const {email, password} = req.body;
            if(email && password){
                const where = {email}
                const user = await Users.findOne({where});
                if(bcrypt.compareSync(password, user.password)){
                    const payload = {id: user.id};
                    const token = jwt.encode(payload,secret);
                    return res.json({token})
                }
            }
            return res.sendStatus(401)
        } catch (err) {
            return res.sendStatus(401)
        }
    })
}