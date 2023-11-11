import './FeedbackOverview.css';
import { backButton, userLogo, crossLogo, emailLogo, textAreaIcon } from "../../assets/assetsSVG"

interface BugContentProps {
  btnColor?: string;
  btnTextColor?: string;
  font?: string;
  textColor?: string;
  formdata: Array<{ [key: string]: any }>;
  handleSubmit?: (e: any) => void;
  handleUpdate: (e: any, id: string, j: string, k?: number) => void;
  answer: any;
  handleRemove: (e: any) => void;
}

const BugContent: React.FC<BugContentProps> = ({
  formdata,
  btnColor,
  btnTextColor,
  font,
  textColor,
  handleUpdate,
  handleSubmit,
  answer,
  handleRemove
}) => {
  function isValidEmail(email: string) {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
  }

  const normalInput = (
    question: string,
    criteriaId: string,
    placeholder?: string
  ) => {
    return (
      <div className=""
       key={criteriaId}>
        <label
          className="q-fdov-levels"
          htmlFor="normalInput"
          style={{
            fontFamily: font,
            color: textColor,
          }}
        >
          {question}
        </label>
        <div className="q-fdov-input">
            {userLogo()}
            <input
              type="text"
              id="normalInput"
              name="normalInput"
              onChange={(e) => handleUpdate(e, criteriaId, "")}
              value={answer[criteriaId]}
              placeholder={placeholder}
            />
            {crossLogo(criteriaId, handleRemove)}
        </div>
      </div>
    );
  };
  const emailInput = (question: string, criteriaId: string, placeholder?:string) => {
    return (
      <div className="" key={criteriaId}>
        <label
          className="q-fdov-levels"
          htmlFor="normalInput"
          style={{
            fontFamily: font,
            color: textColor,
          }}
        >
          {question}
        </label>
        <div className="q-fdov-input">
            {emailLogo()}
            <input
              type="email"
              id="normalInput"
              name="normalInput"
              onChange={(e) => handleUpdate(e, criteriaId, "")}
              value={answer[criteriaId]}
              placeholder={placeholder}
            />
            {crossLogo(criteriaId, handleRemove)}
        </div>
        {
          isValidEmail(answer[criteriaId]) &&
          <div className='q-input-email-checks'>This is not a valid email</div>
        }
      </div>
    );
  };
  const normalInput2 = (
    question: string,
    criteriaId: string,
    placeholder?: string
  ) => {
    return (
      <div className="" key={criteriaId}>
        <label
          className="q-fdov-levels"
          style={{
            fontFamily: font,
            color: textColor,
          }}
        >
          {question}
        </label>
        <div className="q-fdov-input" style={{alignItems: "flex-start"}}>
            {textAreaIcon()}
            <textarea
              id="normalInput2"
              name="normalInput"
              onChange={(e) => handleUpdate(e, criteriaId, "")}
              value={answer[criteriaId]}
              placeholder={placeholder}
              style={{height: "120px", padding: "0px", fontFamily: "'Figtree', sans-serif", boxSizing: "content-box"}}
            />
            {crossLogo(criteriaId, handleRemove)}
        </div>
      </div>
    );
  };
  return (
    <div className='q-fdov-ch-boxes'>
      {formdata?.length > 0 ? (
        <>
          {formdata.map((data: any) => {
            if (data.type === 'USER_INPUT_TEXT') {
              return normalInput(
                data.question || '',
                data.criteriaId || '',
                data.placeholder || ''
              );
            } else if (data.type === 'USER_INPUT_EMAIL') {
              return emailInput(data.question || '', data.criteriaId || '', data.placeholder || '');
            } else if (data.type === 'USER_INPUT_TEXTAREA') {
              return normalInput2(
                data.question || '',
                data.criteriaId || '',
                data.placeholder || ''
              );
            }
          })}
          <div style={{backgroundColor: btnColor, color:btnTextColor}} onClick={handleSubmit} className="q-fdov-btn-continue">
            Submit
          </div>
        </>
      ) : (
        <div
          style={{
            fontFamily: font,
            color: textColor,
          }}
          className="q-center"
        >
          No data Found
        </div>
      )}
    </div>
  );
};

export default BugContent;
