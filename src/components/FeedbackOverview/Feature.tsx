import { CSSProperties } from 'react';
import { PrimaryButton } from '../Modules/PrimaryButton';
import './FeedbackOverview.css';

interface FeatureContentProps {
  formdata: Array<{ [key: string]: any }>;
  handleSubmit?: (e: any) => void;
  handleUpdate: (e: any, id: string, j: string, k?: number) => void;
  answer: any;
  handleRemove: (e: any) => void;
  normalInput: (question: string, criteriaId: string, placeholder?:string) => JSX.Element,
  emailInput: (question: string, criteriaId: string, placeholder?:string) => JSX.Element,
  normalInput2: (question: string, criteriaId: string, placeholder?:string) => JSX.Element,
  buttonStyle?: CSSProperties;
  PrimaryButtonText?: string;
}

const FeatureContent: React.FC<FeatureContentProps> = ({
  formdata,
  handleSubmit,
  normalInput,
  emailInput,
  normalInput2,
  buttonStyle = {},
  PrimaryButtonText = "Submit"
}) => {

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
          <PrimaryButton className='q-fdov-btn-continue' children={PrimaryButtonText || 'Submit'} onClick={handleSubmit} style={buttonStyle} />
        </>
      ) : (
        <div className="q-center">
          No data Found
        </div>
      )}
    </div>
  );
};

export default FeatureContent;
