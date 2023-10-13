import { useState } from 'react';
import './FeedbackOverview.css';

interface GeneralFeedbackContentProps {
  font?: string;
  textColor?: string;
  starColor?: string;
  btnColor?: string;
  btnTextColor?: string;
  starBorderColor?: string;
  formdata: Array<{ [key: string]: any }>;
  handleSubmit?: (e: any) => void;
  handleUpdate: (e: any, id: string, j: string, k?: number) => void;
}

const GeneralFeedbackContent: React.FC<GeneralFeedbackContentProps> = ({
  formdata,
  starColor,
  font,
  btnColor,
  btnTextColor,
  textColor,
  starBorderColor,
  handleUpdate,
  handleSubmit,
}) => {
  const [rating, setRating] = useState<number>(0);
  const handleRatingChange2 = (e: any, id: any, rating: number) => {
    setRating(rating);
    handleUpdate(e, id, '', rating);
  };

  const whiteStar = (
    <svg
      width="45"
      height="45"
      viewBox="0 0 42 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.9556 12.7626L1.99311 14.497L1.78124 14.5401C1.4605 14.6252 1.1681 14.794 0.933911 15.0291C0.699719 15.2642 0.53212 15.5573 0.44823 15.8783C0.36434 16.1994 0.367164 16.537 0.456415 16.8566C0.545666 17.1762 0.718144 17.4664 0.956238 17.6976L9.62249 26.1332L7.57874 38.0489L7.55436 38.2551C7.53473 38.5868 7.60361 38.9178 7.75396 39.2142C7.9043 39.5105 8.13071 39.7616 8.40999 39.9417C8.68928 40.1218 9.0114 40.2244 9.34339 40.2391C9.67538 40.2537 10.0053 40.1799 10.2994 40.0251L20.9981 34.4001L31.6725 40.0251L31.86 40.1114C32.1695 40.2333 32.5058 40.2706 32.8345 40.2196C33.1632 40.1687 33.4725 40.0312 33.7305 39.8212C33.9885 39.6113 34.186 39.3365 34.3028 39.025C34.4196 38.7136 34.4514 38.3767 34.395 38.0489L32.3494 26.1332L41.0194 17.6957L41.1656 17.5364C41.3745 17.279 41.5115 16.9709 41.5626 16.6435C41.6137 16.316 41.577 15.9808 41.4564 15.6721C41.3358 15.3634 41.1355 15.0922 40.8759 14.8861C40.6163 14.68 40.3068 14.5464 39.9787 14.4988L28.0162 12.7626L22.6687 1.9251C22.514 1.6111 22.2745 1.34669 21.9772 1.16179C21.68 0.9769 21.3369 0.878906 20.9869 0.878906C20.6368 0.878906 20.2937 0.9769 19.9965 1.16179C19.6993 1.34669 19.4597 1.6111 19.305 1.9251L13.9556 12.7626Z"
        fill="#E2E2E2"
      />
    </svg>
  );
  const blackStar = (
    <svg
      width="42"
      height="42"
      viewBox="0 0 41 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M39.2207 18.106L31.293 25.0247L33.6678 35.3255C33.7934 35.864 33.7576 36.4276 33.5647 36.9458C33.3718 37.4641 33.0304 37.9139 32.5832 38.2392C32.136 38.5644 31.6029 38.7507 31.0504 38.7746C30.498 38.7985 29.9508 38.659 29.4772 38.3736L20.493 32.9244L11.5281 38.3736C11.0545 38.659 10.5073 38.7985 9.95484 38.7746C9.4024 38.7507 8.86925 38.5644 8.42207 38.2392C7.97488 37.9139 7.6335 37.4641 7.4406 36.9458C7.2477 36.4276 7.21184 35.864 7.33751 35.3255L9.7088 25.0353L1.77931 18.106C1.35991 17.7443 1.05664 17.2668 0.907529 16.7334C0.75842 16.2 0.77011 15.6345 0.941131 15.1077C1.11215 14.5809 1.43489 14.1164 1.86888 13.7723C2.30287 13.4282 2.82878 13.22 3.38067 13.1736L13.8326 12.2683L17.9125 2.53705C18.1256 2.02644 18.4849 1.59027 18.9454 1.28348C19.4058 0.97669 19.9467 0.812988 20.5 0.812988C21.0533 0.812988 21.5942 0.97669 22.0546 1.28348C22.5151 1.59027 22.8745 2.02644 23.0875 2.53705L27.1797 12.2683L37.6281 13.1736C38.18 13.22 38.7059 13.4282 39.1399 13.7723C39.5739 14.1164 39.8967 14.5809 40.0677 15.1077C40.2387 15.6345 40.2504 16.2 40.1013 16.7334C39.9522 17.2668 39.6489 17.7443 39.2295 18.106H39.2207Z"
        fill={starColor || "black"}
      />
    </svg>
  );

  const normalInput = (question: string, criteriaId: string, placeholder?:string) => {
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
  const normalInput2 = (question: string, criteriaId: string, placeholder?:string) => {
    return (
      <div className="questLabs" style={{ paddingTop: '2%' }} key={criteriaId}>
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
    <div style={{ padding: '5%'}}>
      {formdata?.length > 0 ? (
        <>
          {formdata.map((data: any) => {
            if (data.type === 'USER_INPUT_TEXT') {
              return normalInput(data.question || '', data.criteriaId || '', data.placeholder || '');
            } else if (data.type === 'USER_INPUT_TEXTAREA') {
              return normalInput2(data.question || '', data.criteriaId || '', data.placeholder || '');
            } else if (data.type === 'RATING') {
              return (
                <div key={data.criteriaId}>
                  <div
                    className="q-h4 rating-heading"
                    style={{
                      fontFamily: font,
                      color: textColor,
                      fontSize: "20px"
                    }}
                  >
                    {data.question
                      ? data.question
                      : 'How would you rate your experience ?'}
                  </div>
                  <div
                    style={{
                      padding: '0% 0% 2%',
                      display: 'flex',
                      justifyContent:"center"
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          lineHeight: '40px',
                          marginRight: '10px',
                          cursor: 'pointer',
                        }}
                        key={star}
                        onClick={(e) =>
                          handleRatingChange2(e, data.criteriaId, star)
                        }
                      >
                        {star <= rating ? blackStar : whiteStar}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
          })}
          <div style={{backgroundColor: btnColor, color:btnTextColor}} onClick={handleSubmit} className="q-btn-continue">
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

export default GeneralFeedbackContent;
