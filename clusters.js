const cluster = require('cluster');
const os = require('os')

const CPUS = os.cpus()

// Se o processo inicializado for um cluster principal,
// então inicialiaza os eventos para monitorar e 
// inicializar os clusters segundários (processos filhos)
if(cluster.isMaster){
    CPUS.forEach(()=>cluster.fork());

    cluster.on('listening', worker=>{
        console.log(`Cluster ${worker.process.pid} conectado`)
    })

    cluster.on('discommect', worker=>{
        console.log(`Cluster ${worker.process.pid} desconectado`)
    })

    cluster.on('exit', worker=>{
        console.log(`Cluster ${worker.process.pid} saiu do ar`)
        // Garante que um novo cluster inicie se um antigo morrer
        cluster.fork();
    })
} else{
    // Se processo iniciado for um cluster secundário, então inicia o servidor
    require('./index.js')
}