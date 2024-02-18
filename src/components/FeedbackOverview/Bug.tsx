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
  crossLogoForInput: boolean;
  normalInput: (question: string, criteriaId: string, placeholder?:string) => JSX.Element,
  emailInput: (question: string, criteriaId: string, placeholder?:string) => JSX.Element,
  normalInput2: (question: string, criteriaId: string, placeholder?:string) => JSX.Element,
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
  handleRemove,
  crossLogoForInput,
  normalInput,
  emailInput,
  normalInput2
}) => {
  function isValidEmail(email: string) {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
  }

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
          <div style={{ backgroundColor: btnColor, color: btnTextColor }} onClick={handleSubmit} className="q-fdov-btn-continue">
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
