<template>
  <div>
    <div>
      <h2>游戏房间</h2>
      <div>
        <!-- Display chat messages -->
        <div v-for="(message, index) in chatMessages" :key="index">
          {{ message.sender }}: {{ message.content }}
        </div>
      </div>
      <div>
        <!-- Input box for typing messages -->
        <input v-model="messageInput" placeholder="输入消息" />
        <!-- Button to send messages -->
        <button @click="sendMessage">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import socket from "@/plugins/socket";

export default {
  name: 'SocketGameRoom',
  data() {
    return {
      rooms: {},
      inRoom: false,
      currentRoomName: '',
      currentUsers: [],
      newRoomName: '',
      gameStarted: false,
      chatMessages:[],
      messageInput:''
    };
  },
  mounted() {

  },
  created() {
    console.log('getRoomsList')
    this.getRoomsList()
  },
  methods: {
    getRoomsList() {
      socket.emit('rooms_list')
    },
    createRoom() {
      socket.emit('create_room', {room_name: this.newRoomName});
      this.newRoomName = '';
    },
    joinRoom(roomName) {
      socket.emit('join_room', {room_name: roomName});
      this.currentRoomName = roomName
    },
    leaveRoom() {
      socket.emit('leave_room', this.currentRoomName);

    },
    startGame() {
      socket.emit('start_game', this.currentRoomName);
    },
    sendMessage() {
      if (this.messageInput.trim() !== '') {
        // Emit 'send_message' event to the server
        socket.emit('send_message', { room_name: this.currentRoomName, content: this.messageInput });
        this.messageInput = ''; // Clear the input box after sending the message
      }
    },
    // Function to receive chat messages
    receiveChatMessage(data) {
      this.chatMessages.push({ sender: data.sender, content: data.content });
    },
  },
  sockets: {

    chat_message(data){
      this.chatMessages.push({ sender: data.sender, content: data.content });
    },
    rooms_list(rooms_list) {
      console.log('rooms_list', rooms_list)
      this.rooms = rooms_list

    },
    room_created(data) {
      console.log('room_created', data)
    },
    room_joined(data) {
      this.inRoom = true;
      this.currentUsers = data.users;
    },
    room_left() {
      this.inRoom = false;
      this.currentRoomName = '';
      this.currentUsers = [];
    },
    update_room_info(data) {
      this.currentUsers = data.users;
      this.gameStarted = data.game_started;
    },
    game_started() {
      this.gameStarted = true;
    },
    // 在这里添加其他 socket 监听的方法
  },
};
</script>

<style scoped>
/* Your styles go here */
</style>
