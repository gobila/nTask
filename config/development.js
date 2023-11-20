const SQLite = require('sqlite3');
const logger = require('../logger')

module.exports = {
    db:{
        database:'ntask',
        username:'',
        password:''
    },
    params:{
        dialect: 'sqlite',
        storage: 'ntask.sqlite',
        logging: (sql)=>{
            logger.info(`[${new Date()}] ${sql}`)
        },
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
// module.exports = {
//     db:{
//         database:'ntask',
//         username:'',
//         password:'',
//         params:{
//             dialect: 'sqlite',
//             storage: 'ntask.sqlite',
//             logging: (sql)=>{
//                 logger.info(`[${new Date()}] ${sql}`)
//             },
//             define:{
//                 undescored: true
//             },
//             mode: SQLite.OPEN_READWRITE
//         },
//     },
//     jwt: {
//         secret: 'Nta$K-AP1',
//         options:{session: false}
//     }
// }