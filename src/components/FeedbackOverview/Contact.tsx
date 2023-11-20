interface ContactProps {
  font?: string;
  btnColor?: string;
  btnTextColor?: string;
  textColor?: string;
  formdata: Array<{ [key: string]: any }>;
  handleSubmit?: (e: any) => void;
  handleUpdate: (e: any, id: string, j: string, k?: number) => void;
}

const ContactContent: React.FC<ContactProps> = ({
  formdata,
  btnColor,
  btnTextColor,
  font,
  textColor,
  handleUpdate,
  handleSubmit,
}) => {
  const normalInput = (
    question: string,
    criteriaId: string,
    placeholder?: string
  ) => {
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
          className="q_sdk_input q-input-box"
          id="normalInput"
          style={{ height: '50px' }}
          name="normalInput"
          onChange={(e) => handleUpdate(e, criteriaId, '')}
          placeholder={placeholder}
        />
      </div>
    );
  };
  const normalInput2 = (
    question: string,
    criteriaId: string,
    placeholder?: string
  ) => {
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
          className="q_sdk_textarea q-input-box"
          id="normalInput2"
          placeholder={placeholder}
          style={{ height: '150px' }}
          onChange={(e) => handleUpdate(e, criteriaId, '')}
        />
      </div>
    );
  };
  return (
    <div style={{ padding: '5%',boxSizing: "content-box" }}>
      {formdata?.length > 0 ? (
        <>
          {formdata.map((data: any) => {
            if (data.type === 'USER_INPUT_TEXT') {
              return normalInput(
                data.question || '',
                data.criteriaId || '',
                data.placeholder || ''
              );
            } else if (data.type === 'USER_INPUT_TEXTAREA') {
              return normalInput2(
                data.question || '',
                data.criteriaId || '',
                data.placeholder || ''
              );
            }
          })}
          <div
            style={{ backgroundColor: btnColor, color: btnTextColor }}
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

export default ContactContent;
