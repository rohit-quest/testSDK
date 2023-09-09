import { FC } from "react"
import ReactDOM from 'react-dom';
import chat1 from "../../assets/images/chat1.png"
import chat2 from "../../assets/images/chat2.png"
import chat3 from "../../assets/images/chat3.png"
import chat4 from "../../assets/images/chat4.png"



interface ChatSupport {
    logoType?: number
}





const ChatSupport: FC<ChatSupport> = ({ logoType }) => {




    return ReactDOM.createPortal(
        <div className='questLabs'>
          <div className="popup-overlay">
            <div className="fixed right-10 bottom-10">
                {
                    logoType == 2 ?
                    <img src={chat2} alt="" className="w-16"/>
                    :
                    logoType == 3 ?
                    <img src={chat3} alt="" className="w-16"/>
                    :
                    logoType == 4 ?
                    <img src={chat4} alt="" className="w-16"/>
                    :
                    <img src={chat1} alt="" className="w-20"/>
                }
                <img src="" alt="" />
            </div>
          </div>
        </div>,
        document.getElementById('root')!
    );
}


export default ChatSupport;