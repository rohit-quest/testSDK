import { emailLogo, phoneLogo, userLogo } from "../../assets/assetsSVG";


const normalInput = (
    placeholder: string,
    inputType: string,
) => {
    return (
            <div className="q-onb-input" >
                <input
                    type={inputType}
                    id="normalInput"
                    name="normalInput"
                    placeholder={placeholder}
                    className="q_sdk_input"
                />
            </div>
    );
};
