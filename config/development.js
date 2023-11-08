const SQLite = require('sqlite3');

module.exports = {
    db:{
        database:'ntask',
        username:'',
        password:''
    },
    params:{
        dialect: 'sqlite',
        storage: 'ntask.sqlite',
        define:{
            undescored: true
        },
        mode: SQLite.OPEN_READWRITE
    },
    jwt: {
        secret: 'Nta$K-AP1',
        options:{session: false}
    }
}