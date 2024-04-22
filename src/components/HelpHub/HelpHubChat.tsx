import { useContext, useEffect, useRef, useState } from "react";
import OpenSectionButton from "../../assets/images/OpenSectionButton.svg";
import InfoButton from "../../assets/images/InfoButton.svg";
import SendMessageEmojiIcon from "../../assets/images/SendMessageEmojiIcon.svg";
import SendMessageAttachIcon from "../../assets/images/SendMessageAttachIcon.svg";
import SendMessageSendIcon from "../../assets/images/SendMessageSendIcon.svg";
import SendMessageAero from "../../assets/images/SendMessageAero.svg";
import ChatWoman from "../../assets/images/ChatWoman.svg";
import CancelButton from "../../assets/images/CancelButton.svg";
import SearchIcons from "../../assets/images/SearchIcons.svg";
import DeleteIcon from "../../assets/images/DeleteIcon.svg";
import ImageUploadIcon from "../../assets/images/ImageUploadIcon.svg";
import Modal1 from "../../assets/images/HelpHubModal1.jpeg";
import QuestWhiteLogo from "../../assets/images/QuestWhiteLogo.svg";
import Mic from "../../assets/images/Mic.svg";
import Modal3 from "../../assets/images/HelpHubModal3.jpeg";
import HelphubSvg from "./HelphubSvg";
import { HelpHubChatTypes } from "./HelpHub.type";
import QuestContext from "../QuestWrapper";
import { getMessages, sendMessage } from "./Helphub.service";
import config from "../../config";
import { uploadImageToBackend } from "../../general";
let SenderImg =
  "https://s3-alpha-sig.figma.com/img/c73b/ede1/44dae2a681a58d566da9f69147cc690d?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XJcQc8XNhFza8CJhDAyWRNg9DCoXlrD4E2wn1JDTXS4GFD3XmwsrPggispX-rCLfIw~LJAZGJVvog4bAZ7y5T2UHfn7SkPWSqTZrCftSeZzVjMTej3u5y3ZL28S3tIekwU9BZ3fzSe1HgprPHdZNCxMgOlqyhA6pb9tCSQ6Vu0Z7W8z9Hh6OmCJje68iaAro9DsHtu~wvstZjyfEENlhWWG4wMK5tZTw3hRBYKAmSExdiFb25DjhBUG~cHoXYV6A5286pwskNTO0QrPHULje839o8TdBKsvI4CC2v7yCiYC1V7Qlcd-h6GH-P0DL2qfttlIlZD3frTKsnW1EA-0PHQ__";

type ChatMessage = {
  sender?: string;
  receiver?: string;
};

const HelpHubChat = (props: HelpHubChatTypes) => {
  const {
    contentConfig,
    styleConfig,
    apiType,
    apiKey,
    entityId,
    token,
    userId,
    showBottomNavigation,
    setShowBottomNavigation,
    entityImage
  } = props;

  const { themeConfig } = useContext(QuestContext.Context);
  const [showPersonalChat, setShowPersonalChat] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [senderMessageLoading, setSenderMessageLoading] = useState(false);
  const [messageFailed, setMessageFailed] = useState(false);

  let BACKEND_URL =
    apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;

  const [chat, setChats] = useState([
    {
      profile: "hi",
      senderName: "Alexander Rodriguez...",
      senderMessage:
        "I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
    },
    // {
    //   profile: "hi",
    //   senderName: "Alexander Rodriguez...",
    //   senderMessage:
    //     " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
    // },
    // {
    //   profile: "hi",
    //   senderName: "Alexander Rodriguez...",
    //   senderMessage:
    //     " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
    // },
    // {
    //   profile: "hi",
    //   senderName: "Alexander Rodriguez...",
    //   senderMessage:
    //     " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
    // },
    // {
    //   profile: "hi",
    //   senderName: "Alexander Rodriguez...",
    //   senderMessage:
    //     " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
    // },
    // {
    //     profile: "hi",
    //     senderName: "Alexander Rodriguez...",
    //     senderMessage:
    //         " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
    // },
    // {
    //     profile: "hi",
    //     senderName: "Alexander Rodriguez...",
    //     senderMessage:
    //         " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
    // },
    // {
    //     profile: "hi",
    //     senderName: "Alexander Rodriguez...",
    //     senderMessage:
    //         " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
    // },
    // {
    //     profile: "hi",
    //     senderName: "Alexander Rodriguez...",
    //     senderMessage:
    //         " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
    // },
    // {
    //     profile: "hi",
    //     senderName: "Alexander Rodriguez...",
    //     senderMessage:
    //         " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
    // },
    // {
    //     profile: "hi",
    //     senderName: "Alexander Rodriguez...",
    //     senderMessage:
    //         " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
    // },
    // {
    //     profile: "hi",
    //     senderName: "Alexander Rodriguez...",
    //     senderMessage:
    //         " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
    // },
  ]);

  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [scrollWidthSet, setScrollWidthSet] = useState(true);

  const handleSave = () => {
    const sendMessageFunc = async (message: string) => {
      setSenderMessageLoading(true);
      setData((data) => [...data, { sender: message }]);
      //   let qId = questId || "q-default-helphub";
      let sendMessageResponse = await sendMessage(
        BACKEND_URL,
        entityId,
        userId,
        token,
        apiKey,
        message
      );

      setData((data) => [
        ...data,
        {
          receiver: sendMessageResponse.data,
        },
      ]);
      setSenderMessageLoading((prev) => !prev);
    };

    if (selectedFile) {
      const uploadFile = async () => {
        // generalFunction.showLoader();
        let data = await uploadImageToBackend(
          selectedFile,
          BACKEND_URL,
          apiKey,
          userId,
          token
        );
        setUploadedImageUrl(data?.imageUrl);
        setSelectedFile(null);
        setSelectedFileName("");
        sendMessageFunc(data?.imageUrl);
        setScrollWidthSet((prev) => !prev);
        // generalFunction.hideLoader();
      };
      uploadFile();
    }

    if (message.length > 0) {
      // setSenderMessageLoading(true);
      // const sendMessageFunc = async () => {
      //   console.log(uploadedImageUrl);
      //   setData((data) => [...data, { sender: message }]);
      //   //   let qId = questId || "q-default-helphub";
      //   let sendMessageResponse = await sendMessage(
      //     BACKEND_URL,
      //     entityId,
      //     userId,
      //     token,
      //     apiKey,
      //     message
      //   );
      //   // console.log(sendMessageResponse);
      //   // console.log();
      //   // console.log("user", message);

      //   // console.log("response", sendMessageResponse.data);
      //   // setTimeout(() => {
      //   //   setData((data) => [
      //   //     ...data,
      //   //     {
      //   //       receiver: sendMessageResponse.data,
      //   //     },
      //   //   ]);
      //   // }, 1000);
      //   setData((data) => [
      //     ...data,
      //     {
      //       receiver: sendMessageResponse.data,
      //     },
      //   ]);
      //   setSenderMessageLoading((prev) => !prev);
      //   // setMessageFailed(true);
      //   setTimeout(() => {
      //     // setMessageFailed(!sendMessageResponse.data.success);
      //   }, 2000);
      //   //   console.log(data);
      // };
      sendMessageFunc(message);
    }
    setMessage("");
  };

  useEffect(() => {}, [selectedFile]);

  const inputFileChangeHandler = (event: any) => {
    if (event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setSelectedFileName(event.target.files[0].name);
      // setImageUrl(URL.createObjectURL(event.target.files[0]));
      // const uploadFile = async () => {
      //   // generalFunction.showLoader();
      //   let data = await uploadImageToBackend(
      //     event.target.files[0],
      //     BACKEND_URL,
      //     apiKey,
      //     userId,
      //     token
      //   );
      //   setImageUrl(data?.imageUrl);
      //   // generalFunction.hideLoader();
      // };
    }
  };

  const resizeHandler = () => {
    const headerElement = document.getElementById("helpHub");
    if (headerElement && scrollRef.current) {
      const headerHeight = headerElement.clientHeight;
      // scrollRef.current.style.height = headerHeight - 228 + "px";
      scrollRef.current.style.height = headerHeight - 191 + "px";
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    resizeHandler();
  }, [data, scrollWidthSet]);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  useEffect(() => {
    const getMessagesHistory = async () => {
      //   let qId = questId || "q-default-helphub";
      let getResult = await getMessages(
        BACKEND_URL,
        entityId,
        userId,
        token,
        apiKey
      );

      let conversion = getResult.data.conversations.map(
        (chat: any, index: number) => {
          let chatObj = {
            sender: chat.senderRole === "USER" ? chat.content : null,
            receiver: chat.senderRole == "ASSISTANT" ? chat.content : null,
          };
          return chatObj;
        }
      );
      setData(conversion);
      // setChats([
      //   {
      //     profile: "hi",
      //     senderName: "Alexander Rodriguez...",
      //     senderMessage:
      //       conversion[conversion.length - 1].receiver ||
      //       conversion[conversion.length - 1].sender,
      //   },
      // ]);
    };
    getMessagesHistory();

    // const testApi = async () => {
    //   let request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/verify?userId=${userId}`;

    //   let headers = {
    //     userId,
    //     token,
    //     entityId,
    //     apikey,
    //   };

    //   let response = await axios.post(
    //     request,
    //     { criteriaId, ...(answer && { answer }) },
    //     { headers }
    //   );
    // };
  }, []);
  const [updateOutAnimation, setUpdateOutAnimation] = useState<boolean | null>(
    null
  );
  const [updateOneoutAnimation, setUpdateOneOutAnimation] = useState<
    boolean | null
  >(null);

  const [updateOutTempAnimation, setUpdateOutTempAnimation] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    console.log("updateOutAnimation", updateOutAnimation);
    console.log("updateOneoutAnimation", updateOneoutAnimation);
  }, [updateOneoutAnimation, updateOutAnimation]);
  return (
    <>
      {!showPersonalChat && (
        <div
          // className={`helpHubChat`}
          // // className={selectedSection === "Home" ? "animatedComponent" : ""}
          // style={{
          //   background: themeConfig?.backgroundColor || "#fff",
          //   ...styleConfig?.Chat?.Form,
          // }}
          className={`helpHubChat animatedDissolve ${
            updateOutAnimation
              ? "updateOutAnimation"
              : updateOutTempAnimation
              ? "updateInAnimation"
              : ""
          }`}
          // className={selectedSection === "Home" ? "animatedComponent" : ""}
          style={{
            background: themeConfig?.backgroundColor,
            ...styleConfig?.Chat?.Form,
          }}
        >
          {/* upper container  :chats*/}
          <div className="q-helphub-chatpage-upper-container">
            <div className="q-helphub-chatpage-text-container">
              <div className="q-helphub-chatpage-head-para">
                {/* for heading  */}
                <div
                  className="q-helphub-chatpage-heading"
                  style={{
                    color:
                      styleConfig?.Chat?.Topbar?.Heading?.color ||
                      themeConfig?.primaryColor,
                    ...styleConfig?.Chat?.Topbar?.Heading,
                  }}
                >
                  {contentConfig?.heading || "Chats"}
                </div>
                {/* for para */}
                <div
                  className="q-helphub-chatpage-para"
                  style={{
                    color: themeConfig?.secondaryColor,
                    ...styleConfig?.Chat?.Topbar?.SubHeading,
                  }}
                >
                  {contentConfig?.subHeading ||
                    "Welcome back, Please talk to us to understand"}
                </div>
              </div>

              <div className="q-helphub-chatpage-btn-container">
                <img src={CancelButton} alt="" />
              </div>
            </div>
          </div>
          {/* heading ends here  */}

          {/*  */}
          <div className="q-helphub-chatpage-lower-container">
            {/* search and chats container */}
            {(data.length >0)?<div className="q-helphub-search-chats-container">
              {/* search  */}
              <div className="search-outer-div">
                <div
                  className="q-helphub-search-container"
                  style={{ ...styleConfig?.Chat?.Searchbox }}
                >
                  <input
                    className="q-helphub-search-input"
                    type="text"
                    placeholder="Search for help..."
                  />
                  <div className="q-helphub-search-btn">
                    <img src={SearchIcons} alt="" />
                  </div>
                </div>
              </div>

              {/* chats  */}
              <div className="q-helphub-chats-section">
                {/* only one chat */}

                {chat.map((value, index) => {
                  return (
                    <div
                      className="q-helphub-chat-detail"
                      // onClick={() => {
                      //   setShowBottomNavigation(false);
                      //   setShowPersonalChat((prev) => !prev);
                      //   setScrollWidthSet((prev) => !prev);

                      // }}
                      onClick={() => {
                        // setShowBottomNavigation(false);
                        // setShowPersonalChat((prev) => !prev);
                        setUpdateOutAnimation(true);
                        setScrollWidthSet((prev) => !prev);

                        // setUpdateOneData(value);

                        setTimeout(() => {
                          setShowPersonalChat((prev) => !prev);
                          // setshowOneUpdate((prev) => !prev);
                          setShowBottomNavigation((prev) => !prev);
                          setUpdateOneOutAnimation(false);
                          setScrollWidthSet((prev) => !prev);
                        }, 100);
                      }}
                    >
                      {/* <div className="q-helphub-chat-sender-profile">
                        {value.profile}
                      </div> */}
                      <img
                        src={entityImage|| SenderImg}
                        alt=""
                        className="q-helphub-chat-sender-profile"
                      />

                      <div className="q-helphub-chat-message">
                        <div
                          className="q-helphub-chat-sender-name"
                          style={{
                            color: themeConfig?.primaryColor,
                            ...styleConfig?.Chat?.Card?.Heading,
                          }}
                        >
                          {value.senderName}
                        </div>
                        <div
                          className="q-helphub-chat-sender-message"
                          style={{
                            color: themeConfig?.primaryColor,
                            ...styleConfig?.Chat?.Card?.SubHeading,
                          }}
                        >
                          {value.senderMessage}
                        </div>
                      </div>

                      <button
                        className="q-helphub-chat-btn"
                        // onClick={() => {
                        //   setShowBottomNavigation(false);
                        //   setShowPersonalChat((prev) => !prev);
                        // }}
                      >
                        <img src={OpenSectionButton} alt="" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>:(<div className="no-conversation">
            No Conversation Available
          </div>)}

            {/*send button container */}
            <div
              className="q-helphub-send-message"
              style={{
                background: themeConfig?.backgroundColor,
                ...styleConfig?.Home?.Card,
              }}
            >
              <div
                onClick={() => {
                  setUpdateOutAnimation(true);
                  setScrollWidthSet((prev) => !prev);

                  // setUpdateOneData(value);

                  setTimeout(() => {
                    setShowPersonalChat((prev) => !prev);
                    // setshowOneUpdate((prev) => !prev);
                    setShowBottomNavigation((prev) => !prev);
                    setUpdateOneOutAnimation(false);
                    setScrollWidthSet((prev) => !prev);
                  }, 100);

                  // setShowBottomNavigation(false);
                  // setShowPersonalChat(true);
                  // setScrollWidthSet((prev) => !prev);
                }}
                style={{
                  background: themeConfig?.buttonColor,
                }}
              >
                <p
                  style={{
                    fontFamily: themeConfig?.fontFamily,
                    // ...styleConfig?.Home?.Button,
                  }}
                >
                  Send New Message
                </p>
                <img src={SendMessageAero} alt="" />
              </div>
              {/* <div >
                
              </div> */}
            </div>

            {/* personal chat one to one  */}
          </div>
          
        </div>
      )}

      {showPersonalChat && (
        <div
          // className={`quest-personal-chat-cont ${
          //   showPersonalChat ? "animatedComponentIn" : "animatedComponentOut"
          // }`}
          className={`quest-personal-chat-cont ${
            !updateOneoutAnimation ? "updateOneIn" : "updateOneOut"
          }`}
        >
          {/* back and chats */}
          <div className="quest-personal-chat-head-cont">
            <div className="quest-head-back-cont">
              <div
                className="quest-back-btn"
                style={{ cursor: "pointer" }}
                // onClick={() => {
                //   setShowBottomNavigation(true);
                //   setShowPersonalChat(false);
                //   setScrollWidthSet((prev) => !prev);
                // }}
                onClick={() => {
                  // setShowBottomNavigation(true);
                  // setShowPersonalChat(false);
                  setScrollWidthSet((prev) => !prev);

                  setUpdateOneOutAnimation((prev) => !prev);
                  setUpdateOutTempAnimation(true);
                  setTimeout(() => {
                    setShowBottomNavigation(true);
                    setUpdateOutAnimation(false);
                    // setScrollWidthSet((prev) => !prev);
                    setShowPersonalChat(false);
                  }, 250);
                }}
              >
                <HelphubSvg type={"BackButton"} />
              </div>
              <div
                className="quest-labs-chat"
                style={{
                  fontFamily: themeConfig?.fontFamily,
                  color: themeConfig?.primaryColor,
                  // ...styleConfig?.Tasks?.Card?.SubHeading,
                }}
              >
                Questlabs chats
              </div>
            </div>
            <img src={InfoButton} />
          </div>

          <div className="quest-chat-personal-conversion-cont" ref={scrollRef}>
            <div className="q-chat-personal-container-body">
              <div className="text">
                <div
                  className="q-chat-personal-container-body-title"
                  style={{
                    fontFamily: themeConfig?.fontFamily,
                    color: themeConfig?.primaryColor,
                    // ...styleConfig?.Tasks?.Card?.SubHeading,
                  }}
                >
                  How can we help?
                </div>
                <div
                  className="q-chat-personal-container-body-description"
                  style={{
                    fontFamily: themeConfig?.fontFamily,
                    color: themeConfig?.secondaryColor,
                    // ...styleConfig?.Tasks?.Card?.SubHeading,
                  }}
                >
                  Currently replying in under a minute
                </div>
              </div>

              <div className="q-chat-personal-container-body-icons">
                <div
                  className="q-chat-personal-container-body-icons-img1"
                  style={{
                    zIndex: 3,
                  }}
                >
                  <img src={entityImage||QuestWhiteLogo} />
                </div>
                <div
                  className="q-chat-personal-container-body-icons-img1"
                  style={{ marginLeft: "-15px", zIndex: 2 }}
                >
                  <img src={Modal1} />
                </div>

                <div
                  className="q-chat-personal-container-body-icons-img1"
                  style={{ marginLeft: "-15px", zIndex: 1 }}
                >
                  <img src={ChatWoman} />
                </div>
              </div>
            </div>

            <div className="chat-container" id="chatContainer">
              {data &&
                data.map((message, index) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        marginBottom: "12px",
                      }}
                    >
                      {message.receiver && (
                        <div className="chat-profile-img-receiver">
                          <img src={entityImage || QuestWhiteLogo} />
                        </div>
                      )}

                      <div
                        key={index}
                        className={`message ${
                          message.sender ? "sender" : "receiver"
                        }`}
                      >
                        {/* {message.sender ? message.sender : message.receiver} */}
                        {message.sender ? (
                          message.sender.includes(
                            "https://quest-media-storage-bucket"
                          ) ? (
                            <div className="chat-coversion-img">
                              <img src={message.sender} alt="" />
                            </div>
                          ) : (
                            message.sender
                          )
                        ) : (
                          message.receiver
                        )}
                      </div>

                      {message.sender && (
                        <div className="chat-profile-img-sender">
                          <img src={Modal1} />
                        </div>
                      )}
                    </div>
                  );
                })}
              {senderMessageLoading && (
                <div className="chat-bubble">
                  <div className="typing">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
              )}
              {messageFailed && (
                <div
                  className="message-failed"
                  style={{
                    position: "absolute",
                  }}
                >
                  Something went wrong. PLease try again...
                </div>
              )}
            </div>
          </div>

          <div className="q-chat-personal-container-footer">
            <div>
              {selectedFileName ? (
                <div className="selected-file-div">
                  <img src={ImageUploadIcon} alt="" />
                  <p>{selectedFileName}</p>
                </div>
              ) : (
                <input
                  className="q-chat-personal-container-footer-input"
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      //   if (message.length > 0) {
                      //     setData((data) => [...data, { sender: message }]);
                      //     setTimeout(() => {
                      //       setData((data) => [
                      //         ...data,
                      //         {
                      //           receiver:
                      //             "I am not in the mood to answer, you come back later",
                      //         },
                      //       ]);
                      //     }, 1000);
                      //   }
                      //   setMessage("");
                      handleSave();
                    }
                  }}
                  placeholder="Ask a question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              )}
              <div className="q-chat-personal-container-footer-icons">
                {selectedFileName ? (
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "var(--Neutral-Black-200, #6E6E6E)",
                        fontFamily: themeConfig?.fontFamily || "Figtree",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "20px" /* 142.857% */,
                        textDecorationLine: "underline",
                      }}
                    >
                      View
                    </p>

                    <div
                      style={{
                        width: "1px",
                        height: "18px",
                        background: "var(--Neutral-White-400, #E0E0E0)",
                      }}
                    ></div>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                    }}
                  >
                    <img src={SendMessageEmojiIcon} />
                    <img src={Mic} />
                  </div>
                )}
                {/* {selectedFileName ? "View" : <img src={SendMessageEmojiIcon} />}
                {selectedFileName ? "|" : <img src={Mic} />} */}

                <div className="attach-file">
                  {!selectedFileName ? (
                    <label htmlFor="profile-img">
                      <img src={SendMessageAttachIcon} />
                    </label>
                  ) : (
                    <img
                      src={DeleteIcon}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedFile(null);
                        setSelectedFileName("");
                      }}
                    />
                  )}
                  <input
                    onChange={inputFileChangeHandler}
                    id="profile-img"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    // ref={fileInputRef}
                  />
                </div>

                <div className="sent-btn" onClick={handleSave}>
                  <img src={SendMessageAero} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpHubChat;
