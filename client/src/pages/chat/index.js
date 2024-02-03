import SideBar from "./SideBar";

const Chat = () => {
    return (
        <div className="p-7">

            <div className="flex w-full border ">
                <div className="flex-1" >
                    <SideBar />
                </div>
                <div className="[flex:3]" >
                    chat screen
                </div>
            </div>
        </div>
    )
}
export default Chat;