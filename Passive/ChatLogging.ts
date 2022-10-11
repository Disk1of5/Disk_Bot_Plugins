import { PrivateMessage } from "@twurple/chat/lib";
import { Request, Response } from "express";
import { model, Model, Models, Mongoose, Schema } from "mongoose";
import { Logger } from "tslog";
import { ChatMsgCommandConstructor, iChatMsgCommandConstructor } from "../../Classes/ChatMsgCommandConstructor";
import { iChatMsgCommandInterpreter } from "../../Classes/ChatMsgCommandInterpreter";
import { MongoDBService } from "../../Classes/MongoDBService";
import { iChatMsgCommand } from "../../Interfaces/iChatMsgCommand";
//Test Private Commit
interface iChatLog{
    user: string;
    channel: string;
    message: string;
    timestamp: Date;
}




export class ChatLogging implements iChatMsgCommand{
    commandTextHelp?: string | undefined;
    private _cmdConstructor: iChatMsgCommandConstructor;
    private _logger: Logger;
    private _ChatLog : Model<iChatLog>;
    
    constructor(cmdConstructor: iChatMsgCommandConstructor){      
            this._cmdConstructor=cmdConstructor;
            const m: Mongoose = this._cmdConstructor.getDiskServices().getMongoService().getMongoose();
            this._logger=this._cmdConstructor.getDiskServices().getLogger();
            const chatLogSchema = new m.Schema<iChatLog>({
                user: { type: String, required: true },
                channel: { type: String, required: true }, 
                message: { type: String, required: true }, 
                timestamp: { type: Date, required: true },
            });
            
             this._ChatLog = m.model<iChatLog>('ChatLog', chatLogSchema);
    }
    init(): void {
        this._cmdConstructor.getDiskServices().getLogger().debug("Logging Init");
        // setup Logging schema        
        

     }
    triggered(channel: string, user: string, message: string , msg: PrivateMessage, chatMsgCommandInterpreter: iChatMsgCommandInterpreter): boolean {
        return true
    }
    async process(channel: string, user: string, message: string, msg: PrivateMessage, chatMsgCommandInterpreter: iChatMsgCommandInterpreter) {
        

        const chatLog = new this._ChatLog({
            user: user,
            message: message,
            channel: channel,
            timestamp: new Date()
        });
        try{
            await chatLog.save();
        }catch(e){
            this._logger.error(`Logging into Mogodb error: ${e}`);
        }
        
    }   
    
   
}