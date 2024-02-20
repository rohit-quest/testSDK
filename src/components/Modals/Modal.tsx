import { useContext, useEffect, useRef, useState } from 'react'
import { copyIcon, crossIcon, orIcon, rewardIcon, tickIcon, uploadIcon } from '../expansion/Svg'
import "../expansion/Refer.css";
import "./modal.css";
import QuestLabs from '../QuestLabs';
import {  upload } from './response';
import QuestContext from '../QuestWrapper';
import config from '../../config';
import { SecondaryButton } from '../Modules/PreviousButton';
import { PrimaryButton } from '../Modules/NextButton';
import { CSSProperties } from '@emotion/serialize';

interface propsType {
  isOpen?: boolean;
  questId?: string;
  headingColor?: string;
  color?: string;
  bgColor?: string;
  isArticle?: boolean
  heading?: string;
  rewardHeading?: string;
  description?: String;
  rewardDescription?: String;
  invitationLink?: string;
  shareButtonText?: string;
  iconColor?: string;
  secondaryIconColor?: string;
  reward?: boolean;
  url? : string
  onUpload?: (file: File | null) => void;
  onProgressUpdate?: (progress: number) => void;
  headers?: Record<string,any>;
  onRewardClaim?: Function,
  styleConfig?: {
    Heading?: CSSProperties,
    Description?: CSSProperties,
    PrimaryButton?: CSSProperties,
    SecondaryButton?: CSSProperties,
}
}

export default function QuestMOdal({
  heading = 'Submit Feedback',
  description = 'Welcome back, Please complete your details',
  iconColor = "#939393",
  isOpen = true,
  reward = false,
  rewardHeading = 'Reward Unlocked',
  onUpload = file => { },
  invitationLink = '',
  onProgressUpdate=()=>{},
  headers={},
  onRewardClaim=()=>{},
  url, 
  rewardDescription = 'You have unlocked a new reward for your last transaction. Avail the reward now and enjoy!'
}: propsType) {
  const [copy, setCopy] = useState([false, false]);
  const { apiKey, entityId, apiType } = useContext(QuestContext.Context);
  let BACKEND_URL = apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;
  const inpRef = useRef<HTMLInputElement>(null)
  const [uploading, setUpload] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [open, setOpen] = useState(isOpen);
  const [apiResponse, setApiResponse] = useState<any>(null);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen])

  const handleCopy = (index: number) => {
    navigator?.clipboard.writeText(invitationLink);
    setCopy(prev => prev.map((e, i) => i == index ? true : e));
  }


  useEffect(()=>onProgressUpdate(uploadProgress),[uploadProgress])

  const handleUpload = async(file: File) => {
    setUpload(true);
  const response = await upload(file,BACKEND_URL,setUploadProgress, headers, url )
    setApiResponse(response)
  }
  
  const getUploadData = () => {
    if (apiResponse && url && headers) {
      onUpload(apiResponse);
    } else if (inpRef.current?.files && inpRef.current?.files[0]) {
      onUpload(inpRef.current.files[0]);
    }
  };


  if (!open) return;
  if (reward)
    return (<div className='q_feed_back_modal'>
      <img src={rewardIcon()} alt="" className='q_modal_reward_img' />
      <div className="q_modal_reward_content">
        <div>
          <div className="q_modal_heading">{rewardHeading}</div>
          <div className="q_modal_desc">{rewardDescription}</div>
        </div>
        <div className='q_modal_buttons'>
        <SecondaryButton previousBtnText='Go to home' onClick={()=>{setOpen(false)}}  />
        <PrimaryButton nextBtnText='Avail now' onClick={()=>{onRewardClaim()}} style={{ background: 'linear-gradient(84deg, #9035FF 0.36%, #0065FF 100.36%)'}} />
        </div>
      </div>
      <QuestLabs color={iconColor} />
    </div>)
  return (
    <div className='q_feed_back_modal'>
      <div className="q_feed_back_modal_head">
        <div>
          <div className="q_modal_heading">{heading}</div>
          <div className="q_modal_desc">{description}</div>
        </div>
        <img src={crossIcon(iconColor)} alt="" className='q_modal_cross_img' onClick={() => setOpen(false)} />
      </div>

      <div className="q_modal_content">
        <div className="q_modal_upload_box" onClick={() => inpRef.current?.click()} onDragOver={e => e.preventDefault()} onDrop={e => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) handleUpload(file)
        }}>
          {uploading ? (<div className="q_modal_progress-wrapper">{uploadProgress}%</div>
          ) : <img src={uploadIcon()} alt="" className="q_modal_upload_img" />}
          <div className='q_modal_upload_text_box' >
            <div className="q_modal_upload_text">Drag and drop your file here</div>
            <div className="q_modal_upload_mini_text">or, click to Browse (1MB max)</div>
            <input ref={inpRef} onChange={e => e.target.files && handleUpload(e.target.files[0])} type="file" style={{ display: "none" }} />
          </div>
        </div>
        <div className="q_modal_desc">Some data formats, such as dates, numbers, and colours, may not be recognised.</div>
        <img src={orIcon()} alt="" />


          {invitationLink && <>
            <div className="q_refer_code_content">
            <div className="q_refer_text">Invitation Link</div>
            <div className="q_refer_code_box">
              <div className="q_refer_code">{invitationLink}</div>
              <img className="q_refer_copy_icon" src={copy[1] ? tickIcon() : copyIcon(iconColor)} onClick={() => handleCopy(1)} alt="" />
            </div>
            </div>
          </>}

        <div className='q_modal_buttons'>
          {/* <div className="q_modal_cancel">Cancel</div> */}
          <SecondaryButton previousBtnText='Cancel' />
          <PrimaryButton  nextBtnText='Upload' onClick={() => inpRef.current?.files && inpRef.current?.files[0] &&   getUploadData()} style={{ background:(inpRef.current?.files && inpRef.current?.files[0]) ?  'linear-gradient(84deg, #9035FF 0.36%, #0065FF 100.36%)':'grey'}} />
          {/* <div className="q_modal_upload_button" onClick={() => inpRef.current?.files && inpRef.current?.files[0] && onUpload(inpRef.current?.files[0])}>Upload</div> */}
        </div>
      </div>
      <QuestLabs color={iconColor} />
    </div>
  )
}
