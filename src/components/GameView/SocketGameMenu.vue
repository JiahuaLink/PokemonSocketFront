<!-- YourComponent.vue -->
<template>
  <div>
    <div v-if="!inRoom">
      <h2>房间列表</h2>
      <ul>
        <li v-for="(room, roomName) in rooms" :key="roomName">
          {{ roomName }} ({{ room.users ? room.users.length : 0 }}/2)
          <button @click="joinRoom(roomName)" :disabled="room.users.length >= 2">加入房间</button>
        </li>
      </ul>
      <h2>创建房间</h2>
      <input v-model="newRoomName" placeholder="房间名称"/>
      <button @click="createRoom" :disabled="newRoomName.trim() === ''">创建房间</button>
    </div>

    <div v-if="inRoom">
      <h2>当前房间：{{ currentRoomName }}</h2>
      <p>当前人数：{{ currentUsers.length }}/2</p>
      <button @click="leaveRoom()">离开房间</button>
      <button @click="startGame" :disabled="currentUsers.length !== 2 || gameStarted">开始游戏</button>
    </div>

    <div v-if="gameStarted">
<SocketGameRoom/>
    </div>
  </div>


</template>

<script>
import socket from "@/plugins/socket";
import SocketGameRoom from "./SocketGameRoom"

export default {
  name: 'SocketGame',
  components: {SocketGameRoom},

  data() {
    return {
      rooms: {},
      inRoom: false,
      currentRoomName: '',
      currentUsers: [],
      newRoomName: '',
      gameStarted: false,
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
  },
  sockets: {
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
