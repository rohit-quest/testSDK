import { useContext, useEffect, useRef, useState } from 'react'
import { copyIcon, crossIcon, orIcon, rewardIcon, tickIcon, uploadIcon } from '../expansion/Svg'
import "../expansion/Refer.css";
import "./modal.css";
import QuestLabs from '../QuestLabs';
import { response, upload } from './response';
import QuestContext from '../QuestWrapper';
import config from '../../config';

interface propsType {
  isOpen?: boolean;
  // questId?: string;
  headingColor?: string;
  // userId?: string;
  // token?: string;
  color?: string;
  bgColor?: string;
  isArticle?: boolean
  heading?: string;
  rewardHeading?: string;
  description?: String;
  rewqrdDescription?: String;
  invitationLink?: string;
  shareButtonText?: string;
  iconColor?: string;
  secondaryIconColor?: string;
  reward?: boolean
}

export default function QuestMOdalOffline({
  // questId = "",
  // userId = "",
  // token = "",
  heading = 'Submit Feedback',
  description = 'Welcome back, Please complete your details',
  iconColor = "#939393",
  isOpen = true,
  reward = false,
  rewardHeading = 'Reward Unlocked',
  rewqrdDescription = 'You have unlocked a new reward for your last transaction. Avail the reward now and enjoy!'
}: propsType) {
  const [copy, setCopy] = useState([false, false]);
//   const { apiKey, entityId, apiType } = useContext(QuestContext.Context);
//   let BACKEND_URL = apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;
  const inpRef = useRef<HTMLInputElement>(null)
  const [uploading, setUpload] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen])

  const handleCopy = (index: number) => {
    navigator?.clipboard.writeText("");
    setCopy(prev => prev.map((e, i) => i == index ? true : e));
  }

  useEffect(() => {
    // response(questId, { apiKey, entityId, token, userid: userId }, BACKEND_URL)
  }, [])

  const handleUpload = (file: File) => {
    setUpload(true);
    // upload(file, { apiKey, entityId, token, userid: userId }, BACKEND_URL, setUploadProgress)
  }
  if (!open) return;
  if (reward)
    return (<div className='q_feed_back_modal'>
      <img src={rewardIcon()} alt="" className='q_modal_reward_img' />
      <div className="q_modal_reward_content">
        <div>
          <div className="q_modal_heading">{rewardHeading}</div>
          <div className="q_modal_desc">{rewqrdDescription}</div>
        </div>
        <div className='q_modal_buttons'>
          <div className="q_modal_cancel">Go to home</div>
          <div className="q_modal_upload_button">Avail now</div>
        </div>
      </div>
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

        <div className="q_refer_code_content">
          <div className="q_refer_text">Invitation Link</div>
          <div className="q_refer_code_box">
            <div className="q_refer_code">https://dribbble.com/shots/22712701</div>
            <img className="q_refer_copy_icon" src={copy[1] ? tickIcon() : copyIcon(iconColor)} onClick={() => handleCopy(1)} alt="" />
          </div>
        </div>
        <div className='q_modal_buttons'>
          <div className="q_modal_cancel">Cancel</div>
          <div className="q_modal_upload_button">Upload</div>
        </div>
      </div>
      <QuestLabs style={{color: iconColor}} />
    </div>
  )
}
