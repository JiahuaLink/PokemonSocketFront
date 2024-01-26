import Vue from "vue";
import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';
const socketInstance = SocketIO('http://192.168.1.2:8889', {
    secure: true,
    rejectUnauthorized: false,
    transports: ['websocket']
});
let connected = false;
Vue.use(new VueSocketIO({
    debug: true,
    connection: socketInstance,
}));

if(!connected){
    socketInstance.connect();
    connected=true;
    console.log('socketInstance is connected')
}
window.addEventListener('beforeunload',()=>{
    if(connected){
        socketInstance.disconnect();
        connected=false;
        console.log('socketInstance is disconnected')
    }
})
export default socketInstance;
