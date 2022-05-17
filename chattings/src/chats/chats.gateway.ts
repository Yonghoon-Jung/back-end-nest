import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chattings' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');

  constructor() {
    this.logger.log('constructor');
  }

  // 클라이언트와 연결이 끊기자마자 실행되는 함수
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`disconnected : ${socket.id} ${socket.nsp.name}`);
  }

  // 클라이언트와 연결되자마자 실행되는 함수
  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected : ${socket.id} ${socket.nsp.name}`);
  }

  // constructor 다음으로 실행되는 거
  afterInit(server: any) {
    this.logger.log('init');
  }
  @SubscribeMessage('new_user') // new_user -> 이벤트 이름
  handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ): string {
    console.log(username);
    socket.emit('hello_user', 'hello' + username);
    return 'Hello world!';
  }
}
