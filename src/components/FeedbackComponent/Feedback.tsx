import { CSSProperties, useContext, useEffect, useRef, useState } from 'react'
import styles from './style.module.css'
import Numbering from './Numbering';
import { FeedBackComponentProps, FeedbackProps, FeedbackType } from './types';
import Emoji from './Emoji';
import Star from './Star';
import Like from './Like';
import QuestWrapper from '../QuestWrapper';
import config from '../../config';
import axios from 'axios';
import Loader from '../Login/Loader';
import { toast } from 'react-toastify';
import Success from './Success';

const componentMapping: {[key in FeedbackType]: (props: FeedBackComponentProps) => JSX.Element} = {
    [FeedbackType.NUMBERING]: Numbering,
    [FeedbackType.LIKE]: Like,
    [FeedbackType.EMOJI]: Emoji,
    [FeedbackType.STAR]: Star,
}

export default function Feedback({
    userId,
    token,
    questId,
    heading = 'Found it helpful',
    description = 'Your feedback help us improve search results!',
    type = FeedbackType.NUMBERING,
    count = 5,
    styleConfig,
    onChange,
    redirectUrl,
    initialState
}: FeedbackProps) {
  const [questData, setQuestData] = useState<any | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)

  const { themeConfig, entityId, apiType, apiKey, apiSecret }  = useContext(QuestWrapper.Context)
  const data = useRef<object>()
  const Component: (props: FeedBackComponentProps) => JSX.Element = componentMapping[type]

  let BACKEND_URL =
  apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;

  const themeConfigStyle = {
    '--backgroundColor': themeConfig.backgroundColor,
    '--borderColor': themeConfig.borderColor,
    '--buttonColor': themeConfig.buttonColor,
    '--fontFamily': themeConfig.fontFamily,
    '--primaryColor': themeConfig.primaryColor,
    '--secondaryColor': themeConfig.secondaryColor
  } as CSSProperties


  useEffect(() => {
    const headers = {
      apiKey: apiKey,
      apisecret: apiSecret,
      userId: userId,
      token: token,
    }
    async function fetchData(){
      try {
        const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}?userId=${userId}`;
        const response = await axios.get(request, {headers})
        if(response.status != 200) throw new Error('Invalid quest request')
        setQuestData(response.data)
      } catch (error) {
        setQuestData(null)
      }finally{
        setLoading(false)
      }
    }
    fetchData()
  }, [])


  const handleRatingClick = async (data: any) => {
    try{
      setLoading(true)
      const headers = {
        apiKey: apiKey,
        apisecret: apiSecret,
        userId,
        token,
      };

      const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/verify?userId=${headers.userId}`;
      const criteriaId = questData?.data?.eligibilityCriterias?.[0]
      const answer = type == FeedbackType.LIKE ? (data?.like ? 'like':'dislike'):`${data.rate}/${data.total}`
      const jsonData = {criteriaId, answers: [answer]}
      const response = await axios.post(request, jsonData, {headers})
      if(response.data?.success){
        setShowSuccess(true)
      }
    }catch(error){
      toast.error('Something went wrong, try again')
    }finally{
      setLoading(false)
    }
  }
  const onDataChange = (updatedData: object) => {
    data.current = updatedData
    handleRatingClick(updatedData)
    onChange?.(updatedData)
  }

  return questData && (
    <div className={styles.feedbackContainer} style={{...styleConfig?.Form, ...themeConfigStyle}}>
        {
          showSuccess ? (
            <Success 
              redirectUrl={redirectUrl}
            />
          ):(
            <>
              <div className={styles.feedbackHeader}>
                  <h4 style={{...styleConfig?.Heading}}>{heading}</h4>
                  <p style={{...styleConfig?.Description}}>{description}</p>
              </div>
              <section className={styles.feedbackSection}>
                  <Component 
                      onChange={onDataChange}
                      count={count}
                      style={{...styleConfig?.ActionContainer}}
                      buttonStyle={{...styleConfig?.ActionButton}}
                      selectedButtonStyle={{...styleConfig?.ActionSelectedButton}}
                      iconStyle={styleConfig?.IconStyle}
                      selectedIconStyle={styleConfig?.SelectedIconStyle}
                      initialState={initialState}
                  />
              </section>
              <div className={styles.feedbackMessage}>
                  <span>Not satisfied</span>
                  <span>Very satisfied</span>
              </div>
            </>
          )
        }
        <div className={styles.feedbackWatermark} style={{...styleConfig?.Footer}}>
            <small>Powered by Quest Labs</small>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0V4L8 8V4H4V6.64083C4 7.39167 4.60833 8 5.35917 8H8L4 12C1.79083 12 0 10.2092 0 8V0H12Z" fill="#B9B9B9"/>
            <path d="M12 8L8 8L8 12H12V8Z" fill="#B9B9B9"/>
            </svg>
        </div>
        {isLoading ? <Loader />:null}
    </div>
  )
}
