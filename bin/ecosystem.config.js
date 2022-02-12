module.exports={
    apps: [{
        name: 'app',
        script: './www',
        instances: 0,
        watch:true,
        exec_mode: 'cluster',
        wait_ready: true, //master process 에게 ready 이벤트를 기다리게 함
        listen_timeout: 50000, //기다릴 시간값 ms
        kill_timeout: 5000
}]
}