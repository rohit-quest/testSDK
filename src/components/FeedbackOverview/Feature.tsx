import { useState } from 'react';

interface FeatureContentProps {
  btnColor?: string;
  btnTextColor?: string;
  font?: string;
  textColor?: string;
  formdata: Array<{ [key: string]: any }>;
  handleSubmit?: (e: any) => void;
  handleUpdate: (e: any, id: string, j: string, k?: number) => void;
  answer: any;
}

const FeatureContent: React.FC<FeatureContentProps> = ({
  formdata,
  font,
  textColor,
  btnColor,
  btnTextColor,
  handleUpdate,
  handleSubmit,
  answer
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
      <div className="questLabs" style={{ paddingTop: '3%' }} key={criteriaId}>
        <label
          className="q-h4"
          htmlFor="normalInput"
          style={{
            fontFamily: font,
            color: textColor,
          }}
        >
          {question}
        </label>
        <input
          type="text"
          id="normalInput"
          style={{ height: '50px' }}
          name="normalInput"
          className="q-input-box"
          onChange={(e) => handleUpdate(e, criteriaId, '')}
          placeholder={placeholder}
        />
      </div>
    );
  };
  const emailInput = (question: string, criteriaId: string, placeholder?:string) => {
    return (
      <div className="questLabs" style={{ paddingTop: '2%' }} key={criteriaId}>
        <label
          className="q-h4"
          htmlFor="normalInput"
          style={{
            fontFamily: font,
            color: textColor,
          }}
        >
          {question}
        </label>
        <input
          type="email"
          id="normalInput"
          style={{ height: '50px' }}
          name="normalInput"
          className="q-input-box"
          onChange={(e) => handleUpdate(e, criteriaId, '')}
          placeholder={placeholder}
          value={answer[criteriaId]}
        />
        {
          isValidEmail(answer[criteriaId]) &&
          <p className='q-input-email-checks'>This is not a valid email</p>
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
      <div className="questLabs" style={{ paddingTop: '3%' }} key={criteriaId}>
        <label
          className="q-h4"
          style={{
            fontFamily: font,
            color: textColor,
          }}
        >
          {question}
        </label>
        <textarea
          id="normalInput2"
          placeholder={placeholder}
          style={{ height: '150px' }}
          className="q-input-box"
          onChange={(e) => handleUpdate(e, criteriaId, '')}
        />
      </div>
    );
  };
  return (
    <div style={{ padding: '5% 2%' }}>
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
          <div
          style={{backgroundColor: btnColor, color:btnTextColor, marginTop: '10%'}}
            onClick={handleSubmit}
            className="q-btn-continue"
          >
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

export default FeatureContent;
