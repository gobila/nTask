module.exports = {
    db:{
        database:'ntask_test',
        username:'',
        password:''
    },
    params:{
        dialect: 'sqlite',
        storage: 'ntask_test.sqlite',
        loggin: false,
        define:{
            undescored: true
        }
    },
    jwt: {
        secret: 'Nta$K-AP1',
        options:{session: false}
    }
}