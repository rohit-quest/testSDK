import { useContext, useEffect, useRef, useState } from "react";
import OpenSectionButton from "../../assets/images/OpenSectionButton.svg";
import InfoButton from "../../assets/images/InfoButton.svg";
import NoConversation from "../../assets/images/NoConversation.png";
import SendMessageAttachIcon from "../../assets/images/SendMessageAttachIcon.svg";
import SendMessageAero from "../../assets/images/SendMessageAero.svg";
import CancelButton from "../../assets/images/CancelButton.svg";
import SearchIcons from "../../assets/images/SearchIcons.svg";
import DeleteIcon from "../../assets/images/DeleteIcon.svg";
import ImageUploadIcon from "../../assets/images/ImageUploadIcon.svg";
import QuestWhiteLogo from "../../assets/images/QuestWhiteLogo.svg";
import HelphubSvg from "./HelphubSvg";
import { Conversation, HelpHubChatTypes, MessageTypes } from "./HelpHub.type";
import QuestContext from "../QuestWrapper";
import { closeChat, getMessages, getUserData, satisfyOrNot, sendMessage, submitEmail } from "./Helphub.service";
import config from "../../config";
import { uploadImageToBackend } from "../../general";
import likeImg from "../../assets/images/like_color.svg";
import dislikeImg from "../../assets/images/dislike_color.svg";
import aiTag from "../../assets/images/aiTag.svg";
import adminTag from "../../assets/images/adminTag.svg";
import userIcon from "../../assets/images/userIcon.svg";
let SenderImg =
  "https://s3-alpha-sig.figma.com/img/c73b/ede1/44dae2a681a58d566da9f69147cc690d?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XJcQc8XNhFza8CJhDAyWRNg9DCoXlrD4E2wn1JDTXS4GFD3XmwsrPggispX-rCLfIw~LJAZGJVvog4bAZ7y5T2UHfn7SkPWSqTZrCftSeZzVjMTej3u5y3ZL28S3tIekwU9BZ3fzSe1HgprPHdZNCxMgOlqyhA6pb9tCSQ6Vu0Z7W8z9Hh6OmCJje68iaAro9DsHtu~wvstZjyfEENlhWWG4wMK5tZTw3hRBYKAmSExdiFb25DjhBUG~cHoXYV6A5286pwskNTO0QrPHULje839o8TdBKsvI4CC2v7yCiYC1V7Qlcd-h6GH-P0DL2qfttlIlZD3frTKsnW1EA-0PHQ__";


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
    entityImage,
    entityName,
    setHelpHub,
    uniqueUserId,
    uniqueEmailId,
    position,
    sendAutoMessage,
    setSendAutoMessage,
    chat,
    setChat,
    filterChat,
    setFilterChat,
    fetchData,
    setFetchData,
  } = props;

  const { themeConfig } = useContext(QuestContext.Context);
  const [showPersonalChat, setShowPersonalChat] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState<Conversation[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [senderMessageLoading, setSenderMessageLoading] = useState(false);
  const [messageFailed, setMessageFailed] = useState(false);

  let BACKEND_URL =
    apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;

  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [scrollWidthSet, setScrollWidthSet] = useState<boolean>(true);
  const [selectedConversationId, setSelectedConversationId] =
    useState<string>("");
  const [askSatisfaction, setAskSatisfaction] = useState<boolean>(false);
  const [notSatisfiedQuestion, setNotSatisfiedQuestion] = useState<boolean>(false);
  const [onlyAdminReply, setOnlyAdminReply] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [adminMsg, setAdminMsg] = useState<boolean>(false);
  const [ifSatisfied, setIfSatisfied] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<string | number>("");
  const [disableSendMessageBtn,setDisableSendMessageBtn]=useState<boolean>(false);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const [chatEmail, setChatEmail] = useState<string>("");
  const [openEmailCollection, setOpenEmailCollection] = useState<boolean>(false);
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);


  const sendAutoMessageFromUser = async () => {
    if (sendAutoMessage != "") {
      setUpdateOutAnimation(true);
      setScrollWidthSet((prev) => !prev);
      setTimeout(() => {
        setData([]);
        setSelectedConversationId("");
        setShowPersonalChat((prev) => !prev);
        setShowBottomNavigation((prev) => !prev);
        setUpdateOneOutAnimation(false);
        setScrollWidthSet((prev) => !prev);
        sendMessageFunc(sendAutoMessage || "");
      }, 100);
      setAutoPopupMessage("");
    }
  }

  useEffect(() => {
    sendAutoMessageFromUser()
  }, [sendAutoMessage]);


  const emailCollectingFunction = async () => {
    if (emailSubmitted == false && data.length != 0 && (data.length == 2 || data.length % 9 == 0)) {
      let userData = await getUserData(
        BACKEND_URL,
        entityId,
        userId,
        token,
        apiKey,
        uniqueUserId,
        uniqueEmailId,
        apiType
      )
      if (userData?.success) {
        if (!!userData?.data?.emails?.length) {
          setEmailSubmitted(true);
          setOpenEmailCollection(false);
        } else {
          setOpenEmailCollection(true);
        }
      }
    }
  }

  const submitCollectionEmail = async () => {
    setOpenEmailCollection(false);
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailRegex.test(chatEmail)) {
      let submitEmailResponse = await submitEmail(
        BACKEND_URL,
        entityId,
        userId,
        token,
        apiKey,
        uniqueUserId,
        uniqueEmailId,
        apiType,
        chatEmail
      );

      if (submitEmailResponse?.success) {
        setEmailSubmitted(true);
      }
    }
  }


  useEffect(() => {
    emailCollectingFunction();
  }, [data])

  useEffect(() => {
    messageInputRef.current?.focus();
  }, [chat, disableSendMessageBtn])

  const storeLastChat = (chatHistory: MessageTypes[]) => {
    let lastSeenRecord: { [key: string]: string } = JSON.parse(
      localStorage.getItem("lastSeenRecord") || "{}"
    );
    (chatHistory || chat)?.forEach((ele) => {
      lastSeenRecord[ele.conversationId] = ele?.conversations?.content;
    });
    localStorage.setItem("lastSeenRecord", JSON.stringify(lastSeenRecord));
  };

  const satisfiedDecision = (isSatisfied: boolean) => {
    if (isSatisfied) {
      handleSatisfied(true);
      setIfSatisfied(true);
      // setTimeout(() => {
      //   setIfSatisfied(false);
      // }, 5000);
    } else {
      setNotSatisfiedQuestion(true);
      setAskSatisfaction(false);
    }
  }

  const ifNotSatisfied = (option: string) => {
    if (option == "option1") {
      sendMessageFunc("I need more details")
      setNotSatisfiedQuestion(false);
    } else {
      handleSatisfied(false);
      setNotSatisfiedQuestion(false);
      setAdminMsg(true);
      setTimeout(() => {
        setAdminMsg(false);
      }, 2500);
    }
  }

  const filterByLastMessage = (chatData: MessageTypes[]) => {
    let data = chatData.sort((a, b) => {
      return new Date(b?.conversations?.timestamp).getTime() - new Date(a?.conversations?.timestamp).getTime();
    });

    return data;
  }

  const closeChatFunction = async() => {
    let closeChatResponse = await closeChat(
      BACKEND_URL,
      entityId,
      userId,
      token,
      apiKey,
      selectedConversationId,
      uniqueUserId,
      uniqueEmailId,
      apiType
    );
    if (closeChatResponse?.success && selectedConversationId != "") {
      let updateChat =
        chat?.map((ele) => {
          if (ele.conversationId == selectedConversationId) {
            return {
              ...ele,
              isClosed: true,
            };
          } else {
            return ele;
          }
        }) || [];
      setChat(filterByLastMessage(updateChat));
      setFilterChat(filterByLastMessage(updateChat));
      setOnlyAdminReply(false);
      setData([]);
      setAskSatisfaction(false);
      setNotSatisfiedQuestion(false);
      setTitle("");
      setAdminMsg(false);
      setIfSatisfied(false);
      setOpenEmailCollection(false);
      setScrollWidthSet((prev) => !prev);
      setUpdateOneOutAnimation((prev) => !prev);
      setUpdateOutTempAnimation(true);
      setTimeout(() => {
        setShowBottomNavigation(true);
        setUpdateOutAnimation(false);
        setShowPersonalChat(false);
      }, 250);
    }
  }

  const handleSatisfied = async (isSatisfied: boolean) => {
    let satisfiedResponse = await satisfyOrNot(
      BACKEND_URL,
      entityId,
      userId,
      token,
      apiKey,
      isSatisfied,
      selectedConversationId,
      uniqueUserId,
      uniqueEmailId,
      apiType
    );

    if (satisfiedResponse?.success) {
      setAskSatisfaction(false);
      if (isSatisfied == false) {
        let updateChat =
          chat?.map((ele) => {
            if (ele.conversationId == selectedConversationId) {
              return {
                ...ele,
                onlyAdminReply: true,
                isResolved: false,
              };
            } else {
              return ele;
            }
          }) || [];
        setChat(filterByLastMessage(updateChat));
        setFilterChat(filterByLastMessage(updateChat));
        setOnlyAdminReply(true);
      }
    }
  };

  useEffect(() => {
    let updateChat = chat?.filter((ele) => ele.conversationId == selectedConversationId) || [];
    if (updateChat?.length > 0) {
      setOnlyAdminReply(updateChat[0]?.onlyAdminReply);
    }
  }, [data]);

  async function sendMessageFunc (message: string) {
    setSenderMessageLoading(true);
    setDisableSendMessageBtn(true);
    setAskSatisfaction(false);
    setOpenEmailCollection(false);
    setNotSatisfiedQuestion(false);
    setAdminMsg(false);
    setIfSatisfied(false);
    let userChat: Conversation = {
      senderRole: "USER",
      _id: new Date().toISOString(),
      senderId: userId || "",
      content: message,
      timestamp: new Date().toISOString(),
    };
    setData((data: Conversation[]) => [...data, userChat]);
    let updateLastChat: MessageTypes[] | [] = chat || [];
    if (selectedConversationId) {
      updateLastChat = chat?.map((ele) => {
        if (ele.conversationId == selectedConversationId) {
          return {
            ...ele,
            conversations: userChat,
          };
        } else {
          return ele;
        }
      }) || [];
      setChat(filterByLastMessage(updateLastChat));
      setFilterChat(filterByLastMessage(updateLastChat));
      storeLastChat(updateLastChat || []);
    }

    let sendMessageResponse = await sendMessage(
      BACKEND_URL,
      entityId,
      userId,
      token,
      apiKey,
      message,
      selectedConversationId,
      uniqueUserId,
      uniqueEmailId,
      apiType
    );

    if (sendMessageResponse?.data?.replied) {
      if (!selectedConversationId) {
        setSelectedConversationId(sendMessageResponse?.data?.conversationData?.conversationId);
      }
      let conId = selectedConversationId || sendMessageResponse?.data?.conversationData?.conversationId;
      setData((data) => [...data, sendMessageResponse?.data?.message]);
      let findData = false;
      updateLastChat =
        chat?.map((ele) => {
          if (ele.conversationId == conId) {
            findData = true;
            return {
              ...ele,
              conversations: sendMessageResponse?.data?.message,
              ...(!!sendMessageResponse?.data?.conversationData?.title && !title && {
                title: sendMessageResponse?.data?.conversationData?.title,
              })
            };
          } else {
            return ele;
          }
        }) || [];

      
      if (!findData) {
        let newChat = sendMessageResponse?.data?.conversationData;
        newChat.conversations = sendMessageResponse?.data?.message;
        updateLastChat = [...updateLastChat, newChat];
      }
    }

    setChat(filterByLastMessage(updateLastChat));
    setFilterChat(filterByLastMessage(updateLastChat));
    storeLastChat(updateLastChat || []);
    setSenderMessageLoading((prev) => !prev);
    setDisableSendMessageBtn((prev) => !prev);

    let askSatisfaction: { [key: string]: number } = JSON.parse(
      localStorage.getItem("askSatisfaction") || "{}"
    );
    
    if (selectedConversationId != "") {
      if (!askSatisfaction[selectedConversationId]) {
        askSatisfaction[selectedConversationId] = 1;
      } else {
        askSatisfaction[selectedConversationId] += 1;
      }

      if (askSatisfaction[selectedConversationId] >= 3) {
        setAskSatisfaction(true);
        askSatisfaction[selectedConversationId] = 0;
      }
      localStorage.setItem("askSatisfaction", JSON.stringify(askSatisfaction));
    }
  };

  const handleSave = () => {

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
      };
      uploadFile();
    }

    if (message.length > 0) {
      sendMessageFunc(message);
    }
    setMessage("");
  };

  const inputFileChangeHandler = (event: any) => {
    if (event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setSelectedFileName(event.target.files[0].name);
    }
  };

  const resizeHandler = () => {
    const headerElement = document.getElementById("helpHub");
    if (headerElement && scrollRef.current) {
      const headerHeight = position == "POPUP" ? headerElement.clientHeight : window.innerHeight;
      scrollRef.current.style.height = headerHeight - 191 + "px";
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    resizeHandler();
  }, [data, scrollWidthSet, position]);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  const getMessagesHistory = async (conversationId: string | undefined) => {
    if (conversationId) {
      setLoading(true);
      setSelectedConversationId(conversationId);
      let getResult: { data: { conversations: Conversation[], title?: string } } =
        await getMessages(
          BACKEND_URL,
          entityId,
          userId,
          token,
          apiKey,
          conversationId || "",
          uniqueUserId,
          uniqueEmailId,
          apiType
        );
      setData(getResult?.data?.conversations);
      setLoading(false);
      if (!!getResult?.data?.title && !title) {
        setTitle(getResult?.data?.title);
      }
    }
  };
  // useEffect(() => {
  //   getMessagesHistory("");
  // }, []);

  const [updateOutAnimation, setUpdateOutAnimation] = useState<boolean | null>(null);
  const [updateOneoutAnimation, setUpdateOneOutAnimation] = useState<boolean | null>(null);
  const [updateOutTempAnimation, setUpdateOutTempAnimation] = useState<boolean | null>(null);

  const formatMessage = (message: string) => {
    const messageParagraphs = message.split('\n').map((line, index) => <p key={index}>{line}</p>);
    return messageParagraphs;
  }

  useEffect(() => {
    let data = chat.filter((value: any) => {
      return value?.title
        ?.toLowerCase()
        .includes(searchData?.toString().toLowerCase());
    });
    setFilterChat(filterByLastMessage(data));
  }, [searchData]);

  function formatDate(dateString: string) {
    const options: { [key: string]: string } = { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', options);
    // const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return formattedDate;
  }

  return (
    <>
      {!showPersonalChat && (
        <div
          className={`helpHubChat animatedDissolve ${
            updateOutAnimation
              ? "updateOutAnimation"
              : updateOutTempAnimation
              ? "updateInAnimation"
              : ""
          }`}
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
                <img src={CancelButton} alt="" onClick={() => setHelpHub(false)}/>
              </div>
            </div>
          </div>
          {/* heading ends here  */}

          <div className="q-helphub-chatpage-lower-container">
            {/* search and chats container */}
            {!fetchData &&
              (
                <div className="q-helphub-search-chats-container">
                  <div className="search-outer-div">
                    <div
                      className="q-helphub-search-container-search"
                      style={{ ...styleConfig?.Chat?.Searchbox }}
                    >
                      <input
                        className="q-helphub-search-input"
                        type="text"
                        placeholder="Search for help..."
                        onChange={(e)=>{setSearchData(e.target.value)}}
                      />
                      <div className="q-helphub-search-btn">
                        <img src={SearchIcons} alt="" />
                      </div>
                    </div>
                  </div>

                  {/* chats  */}
                  <div className="q-helphub-chats-section">
                    {/* only one chat */}
                    {!!chat?.length ? (
                    filterChat?.map((value: MessageTypes, index: number) => {
                      return (
                        <div
                          className="q-helphub-chat-detail"
                          key={index}
                          onClick={() => {
                            if (value?.isClosed == true) {
                              return;
                            } else {
                              setUpdateOutAnimation(true);
                              setScrollWidthSet((prev) => !prev);
                              getMessagesHistory(value?.conversationId);
                              setTimeout(() => {
                                setShowPersonalChat((prev) => !prev);
                                setShowBottomNavigation((prev) => !prev);
                                setUpdateOneOutAnimation(false);
                                setScrollWidthSet((prev) => !prev);
                              }, 100);
                            }
                          }}
                          style={{cursor: value?.isClosed == true ? "not-allowed" : "pointer"}}
                        >
                          <img
                            src={entityImage || SenderImg}
                            alt=""
                            className="q-helphub-chat-sender-profile"
                            style={{opacity: value?.isClosed == true ? 0.5 : 1}}
                          />

                          <div className="q-helphub-chat-message" style={{opacity: value?.isClosed == true ? 0.5 : 1}}>
                            <div
                              className="q-helphub-chat-sender-name"
                              style={{
                                color: themeConfig?.primaryColor,
                                ...styleConfig?.Chat?.Card?.Heading,
                              }}
                            >
                              {value?.title || entityName || "Chat with AI"}
                            </div>
                            <div
                              className="q-helphub-chat-sender-message"
                              style={{
                                color: themeConfig?.primaryColor,
                                ...styleConfig?.Chat?.Card?.SubHeading,
                              }}
                            >
                              {value?.conversations?.content}
                            </div>
                          </div>
                          { value?.isClosed == true &&
                            <p className="q-helphub-closed-chat">CLOSED</p>
                          }
                          <button
                            className="q-helphub-chat-btn"
                            style={{display: value?.isClosed == true ? "none" : ""}}
                          >
                            <img src={OpenSectionButton} alt="" />
                          </button>
                        </div>
                      );
                    })
                  ) : (
                  <div
                    className="q-helphub-chat-detail"
                    onClick={() => {
                        setUpdateOutAnimation(true);
                        setScrollWidthSet((prev) => !prev);
                        setTimeout(() => {
                          setShowPersonalChat((prev) => !prev);
                          setShowBottomNavigation((prev) => !prev);
                          setUpdateOneOutAnimation(false);
                          setScrollWidthSet((prev) => !prev);
                        }, 100);
                    }}
                    style={{cursor: "pointer"}}
                  >
                    <img
                      src={entityImage || SenderImg}
                      alt=""
                      className="q-helphub-chat-sender-profile"
                      style={{opacity: 1}}
                    />

                    <div className="q-helphub-chat-message" style={{opacity: 1}}>
                      <div
                        className="q-helphub-chat-sender-name"
                        style={{
                          color: themeConfig?.primaryColor,
                          ...styleConfig?.Chat?.Card?.Heading,
                        }}
                      >
                        Assistance Request
                      </div>
                      <div
                        className="q-helphub-chat-sender-message"
                        style={{
                          color: themeConfig?.primaryColor,
                          ...styleConfig?.Chat?.Card?.SubHeading,
                        }}
                      >
                        Hello there👋, I am Quest's new AI bot, I am here to help you?
                      </div>
                    </div>
                    <button
                      className="q-helphub-chat-btn"
                      style={{opacity: 1}}
                    >
                      <img src={OpenSectionButton} alt="" />
                    </button>
                  </div>
                  )}
                  </div>
                </div>
              )}

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
                  setTimeout(() => {
                    setData([]);
                    setSelectedConversationId("");
                    setShowPersonalChat((prev) => !prev);
                    setShowBottomNavigation((prev) => !prev);
                    setUpdateOneOutAnimation(false);
                    setScrollWidthSet((prev) => !prev);
                  }, 100);
                }}
                style={{
                  background: themeConfig?.buttonColor,
                }}
              >
                <p
                  style={{
                    fontFamily: themeConfig?.fontFamily,
                  }}
                >
                  Send New Message
                </p>
                <img src={SendMessageAero} alt="" />
              </div>
            </div>
          </div>
        </div>
      )}

      {showPersonalChat && (
        <div
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
                onClick={() => {
                  setOnlyAdminReply(false);
                  setData([]);
                  setAskSatisfaction(false);
                  setNotSatisfiedQuestion(false);
                  setTitle("");
                  setAdminMsg(false);
                  setScrollWidthSet((prev) => !prev);
                  setUpdateOneOutAnimation((prev) => !prev);
                  setUpdateOutTempAnimation(true);
                  setTimeout(() => {
                    setShowBottomNavigation(true);
                    setUpdateOutAnimation(false);
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
                }}
              >
                {title || entityName}
              </div>
            </div>
            <img src={InfoButton} />
          </div>

          <div className="quest-chat-personal-conversion-cont" ref={scrollRef}>
            {!loading && (
              <div className="q-chat-personal-container-body">
                <div className="text">
                  <div
                    className="q-chat-personal-container-body-title"
                    style={{
                      fontFamily: themeConfig?.fontFamily,
                      color: themeConfig?.primaryColor,
                    }}
                  >
                    How can we help?
                  </div>
                  <div
                    className="q-chat-personal-container-body-description"
                    style={{
                      fontFamily: themeConfig?.fontFamily,
                      color: themeConfig?.secondaryColor,
                    }}
                  >
                    Let us help with all your questions
                  </div>
                </div>

                <div className="q-chat-personal-container-body-icons">
                  <div
                    className="q-chat-personal-container-body-icons-img1"
                    style={{
                      zIndex: 3,
                    }}
                  >
                    <img src={entityImage || QuestWhiteLogo} />
                  </div>
                  {/* <div
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
                  </div> */}
                  <p>AI</p>
                </div>
              </div>
            )}

            <div className="hepuhub-chat-container" id="chatContainer">
              {data &&
                data.map((message, index) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        marginBottom: "12px",
                      }}
                      key={index}
                    >
                      {message?.senderRole === "ASSISTANT" && (
                        <div className="chat-profile-img-receiver">
                          <img src={entityImage || QuestWhiteLogo} />
                          <img src={aiTag} id="chat-profile-img-receiver-tag" />
                        </div>
                      )}

                      {message?.senderRole === "ADMIN" && (
                        <div className="chat-profile-img-receiver">
                          <img src={entityImage || QuestWhiteLogo} />
                          <img
                            src={adminTag}
                            id="chat-profile-img-receiver-tag"
                          />
                        </div>
                      )}

                      <div
                        key={index}
                        style={{width: "100%"}}
                      >
                        <div
                          className={`message ${
                            message?.senderRole === "USER" ? "sender-role" : "receiver-role"
                          }`}
                        >
                          {message.content.includes(
                            "https://quest-media-storage-bucket"
                          ) ||
                          message.content.includes(
                            "https://pin.questprotocol.xyz/ipfs"
                          ) ? (
                            <div className="chat-coversion-img">
                              <img src={message.content} alt="" />
                            </div>
                          ) : (
                            <>{formatMessage(message.content)}</>
                          )}
                        </div>
                        <div
                          className={`message ${
                            message?.senderRole === "USER" ? "sender-role sender-time" : "receiver-role sender-time"
                          }`}
                        >
                          {formatDate(message.timestamp)}
                        </div>
                      </div>

                      {message?.senderRole === "USER" && (
                        <div className="chat-profile-img-sender">
                          <img src={userIcon} />
                        </div>
                      )}
                    </div>
                  );
                })}
              {askSatisfaction && (
                <div className="q-helphub-satisfied">
                  <p>Was your problem resolved by the customer support team?</p>
                  <div className="q-helphub-satisfied-icons">
                    <img
                      src={likeImg}
                      alt=""
                      onClick={() => satisfiedDecision(true)}
                    />
                    <img
                      src={dislikeImg}
                      alt=""
                      onClick={() => satisfiedDecision(false)}
                    />
                  </div>
                </div>
              )}
              {
                notSatisfiedQuestion &&
                <div className="q-helphub-satisfied2">
                  <p onClick={() => ifNotSatisfied("option1")}>Require more details?</p>
                  <p onClick={() => ifNotSatisfied("option2")}>Prefer assistance from an admin?</p>
                </div>
              }
              {
                ifSatisfied &&
                <div className="q-helphub-satisfied" id="q-helphub-satisfied-user-reply">
                  <p>
                    Thank you for your feedback. Do you want to close this chat? <span className="q-helphub-satisfied-link" onClick={closeChatFunction}>click here</span>
                  </p>
                </div>
              }
              {
                adminMsg &&
                <div className="q-helphub-satisfied" id="q-helphub-satisfied-admin-reply">
                  <p>
                    Please wait, Admin will get back to you soon.
                  </p>
                </div>
              }
              {senderMessageLoading && !onlyAdminReply && (
                <div className="q-chat-bubble-sdk">
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
              { openEmailCollection ?
                <div className="q-helphub-satisfied q-helphub-satisfied-email">
                  <p>Provide your email ID to receive notifications from the admin.</p>
                  <div>
                    <input 
                      type="text"
                      name="chatEmail"
                      value={chatEmail}
                      id=""
                      placeholder="Enter Email ID"
                      onChange={(e) => setChatEmail(e.target.value)}
                    />
                    <button onClick={submitCollectionEmail}>Submit</button>
                  </div>
                </div>
                :
                <></>
              }
            </div>
          </div>

          <div className="q-chat-personal-container-footer">
            <div className={`${disableSendMessageBtn?"send-message-chat-btn-disable":""}`}>
              {selectedFileName ? (
                <div className="selected-file-div">
                  <img src={ImageUploadIcon} alt="" />
                  <p>{selectedFileName}</p>
                </div>
              ) : (
                <input
                  className={`${disableSendMessageBtn?"send-message-chat-btn-disable":""} q-chat-personal-container-footer-input`}
                  disabled={disableSendMessageBtn}
                  ref={messageInputRef}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
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
                  // <div
                  //   style={{
                  //     display: "flex",
                  //     gap: "16px",
                  //     alignItems: "center",
                  //   }}
                  // >
                  //   <p
                  //     style={{
                  //       color: "var(--Neutral-Black-200, #6E6E6E)",
                  //       fontFamily: themeConfig?.fontFamily || "Figtree",
                  //       fontSize: "14px",
                  //       fontStyle: "normal",
                  //       fontWeight: 500,
                  //       lineHeight: "20px",
                  //       textDecorationLine: "underline",
                  //     }}
                  //   >
                  //     View
                  //   </p>

                  //   <div
                  //     style={{
                  //       width: "1px",
                  //       height: "18px",
                  //       background: "var(--Neutral-White-400, #E0E0E0)",
                  //     }}
                  //   ></div>
                  // </div>
                  <></>
                ) : (
                  <></>
                  // <div
                  //   style={{
                  //     display: "flex",
                  //     gap: "16px",
                  //   }}
                  // >
                  //   <img src={SendMessageEmojiIcon} />
                  //   <img src={Mic} />
                  // </div>
                )}
                <div className="attach-file">
                  {!selectedFileName ? (
                    <label htmlFor="profile-img">
                      <img src={SendMessageAttachIcon} className={`${disableSendMessageBtn?"send-message-aero-dsable":""}` }/>
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
                    // className=""
                    disabled={disableSendMessageBtn}
                    className={`${disableSendMessageBtn?"send-message-aero-dsable":""} hidden` }
                  />
                </div>

                <div className={`${disableSendMessageBtn?"send-message-aero-dsable":""} sent-btn`} onClick={handleSave} aria-disabled={disableSendMessageBtn} style={{
                  cursor:disableSendMessageBtn?"no-drop":"pointer"
                }}>
                  <img src={SendMessageAero}  className={`${disableSendMessageBtn?"send-message-aero-dsable":""}` }/>
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
