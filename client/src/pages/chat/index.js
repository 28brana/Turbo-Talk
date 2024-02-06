import ChatScreen from "./ChatScreen";
import SideBar from "./SideBar";
import { useParams } from 'react-router-dom';

const Chat = () => {
    const { conversationId } = useParams();

    return (
        <div className="p-7 bg-backgroundSecondary">
            <div className="flex w-full rounded-lg bg-white [height:92vh] overflow-hidden ">
                <div className="flex-1" >
                    <SideBar />
                </div>
                <div className="[flex:3]" >
                    <ChatScreen/>
                </div>
            </div>
        </div>
    )
}
export default Chat;