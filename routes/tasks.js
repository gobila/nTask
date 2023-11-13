module.exports = app=>{
    const Tasks = app.models.tasks;

    app.route('/tasks')
        .all(app.auth.authenticate())
         /**
         * 
         * @api {get} /tasks Exibe lista de tarefas
         * @apiGroup Tarefas
         * @apiHeader {String} Authorization Token de usuário
         * @apiHeaderExample {json} Header
         *      {
         *          "Authorization": "JWT xyz.abc.123.hgf"
         *       }
         * @apiSuccess {Object[]} tasks Lista de tarefas
         * @apiSuccess {Number} tasks.id Id de registro
         * @apiSuccess {String} tasks.title Título da tarefa
         * @apiSuccess {Bollean} tasks.done Tarefa comcluida?
         * @apiSuccess {Date} tasks.updated_at Data de atualização
         * @apiSuccess {Date} tasks.created_at Data de criação
         * @apiSuccess {Number} tasks.userId Id do usuário
         * @apiSuccessExample {json} Sucesso
         *  HTTP/1.1 200 Ok
         *  [{
         *      "id": "1",
         *      "title": "Estudar",
         *      "done": true,
         *      "updated_at": "2023-11-22T19:08:45.435Z"
         *      "created_at": "2023-11-22T19:08:45.435Z",
         *      "userId": 1
         *  }]
         * @apiErrorExample {json} Error de consulta
         *  HTTP/1.1 412 Precondition Failed
         * 
         */
        .get( async (req,res)=>{
            try {
                const where = {userId: req.user.id}
                const results = await Tasks.findAll({where})
                res.json(results)
            } catch (err) {
                res.status(412).json({msg: err.message})
            }
        })
        /**
         * 
         * @api {post} /tasks Cadastro de tarefas
         * @apiGroup Tarefas
         * @apiHeader {String} Authorization Token de usuário
         * @apiHeaderExample {json} Header
         *      {
         *          "Authorization": "JWT xyz.abc.123.hgf"
         *       }
         * @apiParam {String} title Título da tarefa
         * @apiParamExample {json} Entrada
         *  { "title": "Estudar" }
         * @apiSuccess {Object[]} Lista de tarefas
         * @apiSuccess {Number} id Id de registro
         * @apiSuccess {String} title Título da tarefa
         * @apiSuccess {Bollean} done Tarefa comcluida?
         * @apiSuccess {Date} updated_at Data de atualização
         * @apiSuccess {Date} created_at Data de criação
         * @apiSuccess {Number} userId Id do usuário
         * @apiSuccessExample {json} Sucesso
         *  HTTP/1.1 200 Ok
         *  {
         *      "id": "1",
         *      "title": "Estudar",
         *      "done": true,
         *      "updated_at": "2023-11-22T19:08:45.435Z"
         *      "created_at": "2023-11-22T19:08:45.435Z",
         *      "userId": 1
         *  }
         * @apiErrorExample {json} Error de consulta
         *  HTTP/1.1 412 Precondition Failed
         * 
         */
        .post(async (req, res)=>{
            try {
                req.body.userId = req.user.id
                const result = await Tasks.create(req.body);
                res.json(result)
            } catch (err) {
                res.status(412).json({msg: err.message})
            }
        })

    app.route('/tasks/:id')
        .all(app.auth.authenticate())
        /**
         * 
         * @api {get} /tasks/:id Exibe uma tarefa
         * @apiGroup Tarefas
         * @apiHeader {String} Authorization Token de usuário
         * @apiHeaderExample {json} Header
         *      {
         *          "Authorization": "JWT xyz.abc.123.hgf"
         *       }
         * @apiParam {id} id Id da tarefa
         * @apiSuccess {Number} id Id de registro
         * @apiSuccess {String} title Título da tarefa
         * @apiSuccess {Bollean} done Tarefa comcluida?
         * @apiSuccess {Date} updated_at Data de atualização
         * @apiSuccess {Date} created_at Data de criação
         * @apiSuccess {Number} userId Id do usuário
         * @apiSuccessExample {json} Sucesso
         *  HTTP/1.1 200 Ok
         *  {
         *      "id": "1",
         *      "title": "Estudar",
         *      "done": true,
         *      "updated_at": "2023-11-22T19:08:45.435Z"
         *      "created_at": "2023-11-22T19:08:45.435Z",
         *      "userId": 1
         *  }
         * @apiErrorExample {json} Tarefa não existe
         *  HTTP/1.1 404 Not Found
         * @apiErrorExample {json} Error de consulta
         *  HTTP/1.1 412 Precondition Failed
         * 
         */
        .get(async (req,res)=>{
            try {
                const {id} = req.params;
                const where = {id, userId: req.user.id};
                const result = await Tasks.findOne({where});
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
         * @api {put} /tasks/:id Atualiza uma tarefa
         * @apiGroup Tarefas
         * @apiHeader {String} Authorization Token de usuário
         * @apiHeaderExample {json} Header
         *      {
         *          "Authorization": "JWT xyz.abc.123.hgf"
         *       }
         * @apiParam {id} id Id da tarefa
         * @apiParam {String} title Título da tarefa
         * @apiParam {Bollean} done Tarefa comcluida?
         * @apiSuccessExample {json} Sucesso
         *  HTTP/1.1 204  Not Contend
         * @apiErrorExample {json} Error de consulta
         *  HTTP/1.1 412 Precondition Failed
         * 
         */
        .put(async (req,res)=>{
            try {
                const {id} = req.params;
                const where = {id, userId: req.user.id};
                req.body.userId = req.user.id
                await Tasks.update(req.body, {where});
                res.sendStatus(204);
            } catch (err) {
                res.status(412).json({msg: err.message})
            }

        })
         /**
         * 
         * @api {put} /tasks/:id Exclui uma tarefa
         * @apiGroup Tarefas
         * @apiHeader {String} Authorization Token de usuário
         * @apiHeaderExample {json} Header
         *      {
         *          "Authorization": "JWT xyz.abc.123.hgf"
         *       }
         * @apiParam {id} id Id da tarefa
         * @apiSuccessExample {json} Sucesso
         *  HTTP/1.1 204  Not Contend
         * @apiErrorExample {json} Error de consulta
         *  HTTP/1.1 412 Precondition Failed
         * 
         */
        .delete(async(req,res)=>{
            try{
                const {id} = req.params;
                const where = {id, userId: req.user.id};
                await Tasks.destroy({where})
                res.sendStatus(204)
            } catch (err){
                res.status(412).json({msg: err.message})
            }
        })

}