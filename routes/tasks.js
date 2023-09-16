module.exports = app=>{
    app.get('/', (req, res)=>{
        res.json({status: 'NTask API'});
    });
    
};
module.exports = app=>{
    const Tasks = app.models.tasks;

    app.get('/tasks', async (req, res)=>{
        
        try {
            const tasks = await Tasks.findAll()
            res.json({tasks})
        } catch (err) {
            res.stutus(500).json(err)
        }
    })
}