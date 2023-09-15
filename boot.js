module.exports = app=>{
    app.listen(app.get('port'), () =>{
        console.log(`NTask APO - porta ${app.get('port')}`);
    });
}