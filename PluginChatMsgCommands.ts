import { iPluginChatMsgCommands } from "../Interfaces/PluginChatMsgCommands";
import {ChatMessageCommands, iChatMsgCommands} from "../Classes/ChatMsgCommands"
import { Disk } from "./ChatMsgCommands/Disk";
import { iChatMsgCommandConstructor } from "../Classes/ChatMsgCommandConstructor";
import { Logger } from "tslog";
export class PluginChatMsgCommands implements iPluginChatMsgCommands{
    private logger: Logger;
    public commands: ChatMessageCommands;
    constructor(config : iChatMsgCommandConstructor, logger: Logger){
        this.logger=logger;
        this.commands=new ChatMessageCommands(this.logger);
        this.commands.addChatMsgCommands(new Disk(config));
    }
}