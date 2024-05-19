import { CSSProperties, useState } from 'react';
import { PrimaryButton } from '../Modules/PrimaryButton';
import './FeedbackOverview.css';
import Label from '../Modules/Label';
import { blackStar, whiteStar } from './SVG';

interface FeatureContentProps {
  formdata: Array<{ [key: string]: any }>;
  handleSubmit?: (e: any) => void;
  handleUpdate: (e: any, id: string, j: string, k?: number) => void;
  answer: any;
  handleRemove: (e: any) => void;
  normalInput: (question: string, criteriaId: string, placeholder?:string, required?:boolean) => JSX.Element,
  emailInput: (question: string, criteriaId: string, placeholder?:string, required?:boolean) => JSX.Element,
  normalInput2: (question: string, criteriaId: string, placeholder?:string, required?:boolean) => JSX.Element,
  buttonStyle?: CSSProperties;
  PrimaryButtonText?: string;
  ratingStyle?: "Star" | "Numbers" | "Smiles";
  labelStyle?: CSSProperties;
  StarStyle?: {
    Style?: React.CSSProperties;
    PrimaryColor?: string;
    SecondaryColor?: string;
    Size?: number;
  }
}

const FeatureContent: React.FC<FeatureContentProps> = ({
  formdata,
  handleSubmit,
  normalInput,
  emailInput,
  normalInput2,
  buttonStyle = {},
  PrimaryButtonText = "Submit",
  ratingStyle,
  labelStyle,
  handleUpdate,
  StarStyle
}) => {
  const [rating, setRating] = useState<number>(0);
  const handleRatingChange2 = (e: any, id: any, rating: number) => {
    setRating(rating);
    handleUpdate(e, id, '', rating);
  };



  return (
    <form className='q-fdov-ch-boxes' onSubmit={handleSubmit}>
      {formdata?.length > 0 ? (
        <>
          {formdata.map((data: any) => {
            if (data.type === 'USER_INPUT_TEXT') {
              return normalInput(
                data.question || '',
                data.criteriaId || '',
                data.placeholder || '',
                data.required || false
              );
            } else if (data.type === 'USER_INPUT_EMAIL') {
              return emailInput(data.question || '', data.criteriaId || '', data.placeholder || '', data.required || false);
            } else if (data.type === 'USER_INPUT_TEXTAREA') {
              return normalInput2(
                data.question || '',
                data.criteriaId || '',
                data.placeholder || '',
                data.required || false
              );
            }else if (data.type === 'RATING') {
              return (
                <div key={data.criteriaId}>
                  <Label htmlFor={'normalInput'}
                    children={data.question ? data.question : 'How would you rate your experience ?'}
                    style={labelStyle}
                  />
                  <div>
                    {ratingStyle == "Numbers" ?
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(5, 1fr)",
                          gap: "4px"
                        }}
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "400",
                              color: num <= rating ? "#FFF" : "#8E8E8E",
                              borderRadius: "10px",
                              border: num <= rating ? "2px solid var(--neutral-grey-100, #000)" : "2px solid var(--neutral-grey-100, #ECECEC)",
                              background: num <= rating ? "#000" : "#fff",
                              padding: "10px 12px",
                              textAlign: "center",
                              cursor: "pointer",
                              boxSizing: "content-box"
                            }}
                            key={num}
                            onClick={(e) =>
                              handleRatingChange2(e, data.criteriaId, num)
                            }
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                      :
                      <div style={{ display: "flex", gap: "8px", ...StarStyle?.Style }} >
                        {
                          [1, 2, 3, 4, 5].map((star) => (
                            <div
                              style={{
                                width: `${StarStyle?.Size}px` || '32px',
                                height: `${StarStyle?.Size}px` || '32px',
                                lineHeight: `${StarStyle?.Size}px` || '32px',
                                cursor: 'pointer',

                              }}
                              key={star}
                              onClick={(e) =>
                                handleRatingChange2(e, data.criteriaId, star)
                              }
                            >
                              {star <= rating ? blackStar(StarStyle?.Size, StarStyle?.PrimaryColor,) : whiteStar(StarStyle?.Size, StarStyle?.SecondaryColor)}
                            </div>
                          ))
                        }
                      </div>
                    }
                  </div>
                </div>
              );
            }
          })}
          <PrimaryButton className='q-fdov-btn-continue' children={PrimaryButtonText || 'Submit'} type='submit' style={buttonStyle} />
        </>
      ) : (
        <div className="q-center">
          No data Found
        </div>
      )}
    </form>
  );
};

export default FeatureContent;
