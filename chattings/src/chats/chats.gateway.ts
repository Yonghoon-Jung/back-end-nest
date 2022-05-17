import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'dgram';

@WebSocketGateway()
export class ChatsGateway {
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
