import { useState } from 'react';
import './FeedbackOverview.css';

interface GeneralFeedbackContentProps {
  font?: string;
  textColor?: string;
  starColor?: string;
  btnColor?: string;
  btnTextColor?: string;
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
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M41.7129 17.209C41.5677 16.7479 41.2879 16.3409 40.9095 16.0401C40.5311 15.7394 40.0714 15.5588 39.5894 15.5215L29.1375 14.6179C29.0743 14.6117 29.0139 14.5885 28.9629 14.5507C28.9118 14.513 28.8719 14.4621 28.8475 14.4035L24.7641 4.67223C24.5749 4.22831 24.2595 3.84977 23.857 3.5837C23.4544 3.31764 22.9825 3.17578 22.5 3.17578C22.0175 3.17578 21.5456 3.31764 21.143 3.5837C20.7405 3.84977 20.425 4.22831 20.2359 4.67223L16.1525 14.4035C16.1281 14.4621 16.0882 14.513 16.0371 14.5507C15.986 14.5885 15.9257 14.6117 15.8625 14.6179L5.41054 15.5215C4.92863 15.5588 4.4689 15.7394 4.09048 16.0401C3.71207 16.3409 3.43228 16.7479 3.2871 17.209C3.13335 17.6706 3.11992 18.1675 3.24851 18.6369C3.3771 19.1062 3.64195 19.5268 4.00956 19.8457L11.9391 26.7627C11.9876 26.8058 12.0237 26.8612 12.0435 26.923C12.0633 26.9849 12.0661 27.0509 12.0516 27.1142L9.66796 37.3992C9.55685 37.8727 9.58855 38.3685 9.75906 38.8241C9.92957 39.2796 10.2312 39.6744 10.626 39.9586C11.0146 40.2453 11.4802 40.4089 11.9628 40.4284C12.4453 40.4478 12.9226 40.3221 13.333 40.0675L22.3172 34.6183C22.37 34.5856 22.4309 34.5683 22.493 34.5683C22.5551 34.5683 22.6159 34.5856 22.6687 34.6183L31.6529 40.0675C32.0676 40.3214 32.5482 40.4468 33.034 40.4278C33.5198 40.4088 33.9892 40.2463 34.3827 39.9609C34.7763 39.6754 35.0765 39.2798 35.2455 38.8238C35.4144 38.3679 35.4445 37.8722 35.332 37.3992L32.9555 27.1107C32.941 27.0474 32.9438 26.9814 32.9636 26.9195C32.9833 26.8577 33.0194 26.8023 33.068 26.7591L40.9975 19.8422C41.3632 19.5228 41.6262 19.1023 41.7535 18.6338C41.8808 18.1652 41.8667 17.6695 41.7129 17.209ZM39.6035 18.2496L31.674 25.1666C31.3361 25.4606 31.0849 25.8412 30.9474 26.2674C30.8098 26.6936 30.7912 27.1493 30.8935 27.5853L33.2701 37.8738C33.2877 37.9429 33.2838 38.0158 33.259 38.0826C33.2342 38.1495 33.1896 38.2073 33.1312 38.2482C33.0784 38.2905 33.0134 38.3149 32.9457 38.3177C32.8781 38.3206 32.8113 38.3018 32.7551 38.264L23.7709 32.8148C23.3879 32.582 22.9482 32.4589 22.5 32.4589C22.0518 32.4589 21.6121 32.582 21.2291 32.8148L12.2449 38.264C12.1887 38.3018 12.1219 38.3206 12.0542 38.3177C11.9866 38.3149 11.9216 38.2905 11.8687 38.2482C11.8103 38.2073 11.7658 38.1495 11.741 38.0826C11.7162 38.0158 11.7123 37.9429 11.7299 37.8738L14.1064 27.5853C14.2088 27.1493 14.1901 26.6936 14.0526 26.2674C13.9151 25.8412 13.6638 25.4606 13.326 25.1666L5.39648 18.2496C5.34225 18.2035 5.3033 18.142 5.28478 18.0732C5.26626 18.0045 5.26904 17.9317 5.29277 17.8646C5.31052 17.7978 5.34901 17.7383 5.4027 17.6947C5.4564 17.6511 5.52253 17.6257 5.59159 17.622L16.0453 16.7185C16.4928 16.6804 16.9214 16.5205 17.2845 16.2562C17.6477 15.9919 17.9316 15.6332 18.1055 15.2191L22.1889 5.48786C22.2173 5.42746 22.2622 5.37639 22.3186 5.34062C22.3749 5.30485 22.4403 5.28585 22.507 5.28585C22.5738 5.28585 22.6391 5.30485 22.6955 5.34062C22.7518 5.37639 22.7968 5.42746 22.8252 5.48786L26.8945 15.2191C27.0678 15.6323 27.3507 15.9902 27.7125 16.2545C28.0743 16.5187 28.5014 16.6792 28.9476 16.7185L39.4014 17.622C39.4704 17.6257 39.5366 17.6511 39.5903 17.6947C39.6439 17.7383 39.6824 17.7978 39.7002 17.8646C39.7247 17.9311 39.7286 18.0034 39.7114 18.072C39.6941 18.1407 39.6565 18.2026 39.6035 18.2496Z"
        fill={textColor || "white"}
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
