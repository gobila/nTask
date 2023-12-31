/**
 * 
 * @api {get} / API Status
 * @apiGroup Status
 * @apiSuccess {String} status Mensagem de status da API
 * @apiSuccessExample {json} Sucesso
 *  HTTP/1.1 200 Ok
 *  {"status": "NTask API"} 
 * 
 */
module.exports = app=>{
    app.get('/', (req, res)=>{
        res.json({status: 'NTask API'});
    });
};
