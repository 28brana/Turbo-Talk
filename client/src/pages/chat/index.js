import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSocket } from "../../context/SocketContext";
import ChatMain from "./ChatMain";
import SideBar from "./SideBar";

const Chat = () => {
    const socket = useSocket();
    const { conversationId } = useParams();
    // console.log(socket.connected);
    useEffect(() => {
        if (conversationId) {
            socket.emit('room:join', conversationId);
        }
        return () => {
            if (conversationId) {
                socket.emit('room:leave', conversationId);
            }
        }
    }, [conversationId, socket]);

    return (
        <div className="p-7 bg-backgroundSecondary">
            <div className="flex w-full rounded-lg bg-white [height:92vh] overflow-hidden ">
                <div className="flex-1" >
                    <SideBar />
                </div>
                {
                    conversationId ? (
                        <div className="[flex:3]" >
                            <ChatMain conversationId={conversationId} />
                        </div>
                    ) : (
                        <div className="[flex:3] flex items-center justify-center">
                            <p>No Chat Found</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default Chat;