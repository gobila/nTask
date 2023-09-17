module.exports = app=>{
    app.get('/', (req, res)=>{
        res.json({status: 'NTask API'});
    });
    
};
module.exports = app=>{
    const Tasks = app.models.tasks;

    app.route('/tasks')
        .get( async (req,res)=>{
            // "/tasks" listas de tarefas
            try {
                const results = await Tasks.findAll()
                res.json(results)
            } catch (err) {
                res.status(412).json({msg: err.message})
            }
        }).post(async (req, res)=>{
            // "/tasks" cadastra uma nova tarefa
            try {
                const result = await Tasks.create(req.body);
                res.json(result)
            } catch (err) {
                res.status(412).json({msg: err.message})
            }
        })

    app.route('/tasks/:id')
        .get(async (req,res)=>{
            // "/tasks/1" consulta de tarefas
            try {
                const {id} = req.params;
                const where = {id};
                const result = await Tasks.findOne({where});
                if(result){
                    res.json(result)
                }else{
                    res.sendStatus(404)
                }
            } catch (err) {
                res.status(412).json({msg: err.message})
            }
        }).put(async (req,res)=>{
            // "/taks/1" atulaiza uma tarefa
            try {
                const {id} = req.params;
                const where = {id};
                await Tasks.update(req.body, {where});
                res.sendStatus(204);
            } catch (err) {
                res.status(412).json({msg: err.message})
            }

        }).delete(async(req,res)=>{
            // "taskas/1" exclui uma tarefa
            try{
                const {id} = req.params;
                const where = {id};
                await Tasks.destroy({where})
                res.sendStatus(204)
            } catch (err){
                res.status(412).json({msg: err.message})
            }
        })

    // app.get('/tasks', async (req, res)=>{
        
    //     try {
    //         const tasks = await Tasks.findAll()
    //         res.json({tasks})
    //     } catch (err) {
    //         res.stutus(500).json(err)
    //     }
    // })
}