

module.exports= app =>{
    const Users = app.models.users;

    app.route('/user')
        .all(app.auth.authenticate())
        /**
         * 
         * @api {get} /user Exibe usuário autenticado 
         * @apiGroup Usuário
         * @apiHeader {String} Authorization Token de usuário
         * @apiHeaderExample {json} Header
         *      {
         *          "Authorization": "JWT xyz.abc.123.hgf"
         *       }
         * @apiSuccess {Number} id Id de registro
         * @apiSuccess {String} name Nome
         * @apiSuccess {String} email email
         * @apiSuccessExample {json} Sucesso
         *  HTTP/1.1 200 Ok
         *  {
         *      "id": "xyz.abc.123.hgf",
         *      "name": "John Silva",
         *      "email": "john@email.com",
         *  }
         * @apiErrorExample {json} Error de consulta
         *  HTTP/1.1 412 Precondition Failed
         * 
         */
        .get(async(req,res)=>{
            try {
                const {id} = req.user
                const attributes = ['id', 'name', 'email'];
                const options = {attributes}
                const result = await Users.findByPk(id, options)
    
                if(result){
                    res.json(result)
                }else{
                    res.sendStatus(404)
                }
            } catch (err) {
                res.status(412).json({msg: err.message})
            }
        })
        /**
         *  
         * @api {delete} /user Excluir usuário autenticado 
         * @apiGroup Usuário
         * @apiHeader {String} Authorization Token de usuário
         * @apiHeaderExample {json} Header
         *      {
         *          "Authorization": "JWT xyz.abc.123.hgf",
         *          "password": "password1234"
         *       }
         * @apiSuccessExample {json} Sucesso
         *  HTTP/1.1 204 No Contend 
         * @apiErrorExample {json} Error na exclução
         *  HTTP/1.1 412 Precondition Failed
         * 
         */     
        .delete(async (req,res)=>{
            try {
                const {id}= req.user
                const where = {id}
                await Users.destroy({where})
                res.sendStatus(204)
            } catch (err) {
                res.status(412).json({msg: err.message})
            }
        })
    /**
     * 
     * @api {post} /user Cadastra novos usuários 
     * @apiGroup Usuário
     *  @apiParam {String} name Nome
     *  @apiParam {String} email Email
     *  @apiParam {String} password Senha
     * @apiParamExample {json} Entrada
     *  {
     *      "name": "John Silva",
     *      "email": "john@email.com"
     *      "password": "password1234"
     *  }
     * @apiSuccess {Number} id Id de registro
     * @apiSuccess {String} name Nome
     * @apiSuccess {String} email email
     * @apiSuccess {String} password Senha criptografada
     * @apiSuccess {Date} updated_at Data de atualização
     * @apiSuccess {Date} created_at Data de criação
     * @apiSuccessExample {json} Sucesso
     *  HTTP/1.1 200 Ok
     *  {
     *      "id": "1",
     *      "name": "John Silva",
     *      "email": "john@email.com",
     *      "password": "vr#$(edf234gverA$HGa",
     *      "updated_at": "2023-11-22T19:08:45.435Z"
     *      "created_at": "2023-11-22T19:08:45.435Z"
     *  }
     * @apiErrorExample {json} Error no cadastro
     *  HTTP/1.1 412 Precondition Failed
     * 
     */
    app.post('/users', async (req,res) =>{
        try {
            const result = await Users.create(req.body)
            res.json(result)
        } catch (err) {
            res.status(412).json({msg: err.message})
        }
    })
}