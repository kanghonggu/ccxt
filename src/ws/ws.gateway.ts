import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,

} from '@nestjs/websockets';
import { WsService } from './ws.service';
import {Socket} from "socket.io";

@WebSocketGateway()
export class WsGateway {

    constructor(private readonly wsService: WsService) {}

    @SubscribeMessage('kline')
    onEvent(client: Socket, data: { exchangeId: string, symbol: string, timeframe: string, since: number }): void {

        this.wsService.watchOHLCV(data.exchangeId, data.symbol, data.timeframe,  client);

    }

}

