import { PrivateMessage } from "@twurple/chat/lib";
import { Request, Response } from "express";
import { iChatMsgCommandConstructor } from "../../Classes/ChatMsgCommandConstructor";
import { iChatMsgCommandInterpreter } from "../../Classes/ChatMsgCommandInterpreter";
import { iChatMsgCommand } from "../../Interfaces/iChatMsgCommand";
export class Disk implements iChatMsgCommand{
    private _cmdConstructor: iChatMsgCommandConstructor;
    constructor(cmdConstructor: iChatMsgCommandConstructor){
            this._cmdConstructor=cmdConstructor;
            // using ExpressJs Routing example
            const expressApp=this._cmdConstructor.getDiskServices().getExpressJsService();
            expressApp.addRoute("/disk",(req:Request, res: Response)=>{
                res.send("Disk Bot Plugin Test");
            });
    }
    init(): void {
        this._cmdConstructor.getDiskServices().getLogger().debug("Disk Command Init");
    }
    triggered(channel: string, user: string, message: string , msg: PrivateMessage, chatMsgCommandInterpreter: iChatMsgCommandInterpreter): boolean {
        return (channel=="#disk1of5" &&
                chatMsgCommandInterpreter.command =="!disk");
    }
    async process(channel: string, user: string, message: string, msg: PrivateMessage, chatMsgCommandInterpreter: iChatMsgCommandInterpreter) {
           await this._cmdConstructor.getChatClient().say(channel,"Disk Test");

        
    }
    commandTextHelp?: string | undefined;
   
}