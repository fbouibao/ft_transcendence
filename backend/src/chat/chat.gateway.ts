import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateRoomDto } from './dto/create-rooms.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server, Socket } from 'socket.io';
import { NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { JoinRoomDto } from './dto/join-room.dto';
import { CreateMsgDto } from './dto/create-msg.dto';


let users:Map<string, string> = new Map();

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createRoom')
  async  createRoom(@MessageBody() createRoomDto: CreateRoomDto) {
    let test =  await this.chatService.createRoom(createRoomDto);
    if(test == null)
      this.server.emit('createRoom', { created: false });
    else
      this.server.emit('createRoom', {  created: true });







      // { "title": "topic#", "description": "desc topic#", "privacy": true, "password": "pass123", "owner": { "id": +createNewRoom.value, "name": null } }
  }

  
  @SubscribeMessage('joinRoom')
  async  joinRoom(@MessageBody() joinRoomDto: JoinRoomDto, @ConnectedSocket() socket: Socket) {
    let join =  await this.chatService.joinRoom(joinRoomDto);
    if (join == 1)
      this.server.emit('joinRoom', { joined: false, error: "user not found" });
    else if (join == 2)
      this.server.emit('joinRoom', { joined: false, error: "room not found" });
    else
    {
      
      socket.join(joinRoomDto.roomId.toString());
      // this.server.to(joinRoomDto.roomId.toString()).emit("message", {msg: "right"})
      
      this.server.emit('joinRoom', { joined: true, error: "" });


      // { "userId": 4, "roomId": 2 }
    }
  }

  @SubscribeMessage('findAllRooms')
  async getRooms(@ConnectedSocket() client: Socket) {
    const rooms = await this.chatService.getRooms();
    this.server.to(client.id).emit('findAllRooms', { rooms });
  }
  









  @SubscribeMessage('createMsg')
  async  createMsg(@MessageBody() createMsgDto: CreateMsgDto) {
    
    let test =  await this.chatService.createMsg(createMsgDto);
    if(test == 1)
      this.server.emit('createMsg', { created: false, error: "user not found" });
    else if (test == 2)
      this.server.emit('createMsg', { created: false, error: "room not found" });
    else
      this.server.emit('createMsg', { created: true, error: "" });

      // { "title": "topic#", "description": "desc topic#", "privacy": true, "password": "pass123", "owner": { "id": +createNewRoom.value, "name": null } }
  }










  // last practice




  async handleConnection(socket: Socket)
  {
    // let number:any =  socket.handshake.headers.number;

    // number = parseInt(number);
    // if(number > 3)
    // {
    //   socket.join("right")
    // }
    // else{
    //   socket.join("left");
    // }
    // this.server.emit("greeting", {msg: "hello form faical server"});



    // const rooms = await this.chatService.getRooms();
    // this.server.to(socket.id).emit('findAllRooms', { rooms });
  }

  // @SubscribeMessage('message')
  // remove(@MessageBody() message: string) {
  //   console.log("message is recieved :" + message )
  //   this.server.to("right").emit("message", {msg: "right"})
  // }

}
