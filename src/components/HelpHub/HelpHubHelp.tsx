import { useState } from 'react'
import CancelButton from "../../assets/images/CancelButton.svg";
import SearchIcons from "../../assets/images/SearchIcons.svg";
import OpenSectionButton from "../../assets/images/OpenSectionButton.svg";


const HelpHubTasks = () => {

    const [faqsArr, setFaqsArr] = useState([
        {
            faqQuestion: "How can I assist you today?",
            faqAns: " You can complete your user information details by sharing the details asked in the form"
        },
        {
            faqQuestion: "How can I assist you today?",
            faqAns: " You can complete your user information details by sharing the details asked in the form"
        },
        {
            faqQuestion: "How can I assist you today?",
            faqAns: " You can complete your user information details by sharing the details asked in the form"
        },
        {
            faqQuestion: "How can I assist you today?",
            faqAns: " You can complete your user information details by sharing the details asked in the form"
        },
        {
            faqQuestion: "How can I assist you today?",
            faqAns: " You can complete your user information details by sharing the details asked in the form"
        },
        {
            faqQuestion: "How can I assist you today?",
            faqAns: " You can complete your user information details by sharing the details asked in the form"
        },
        {
            faqQuestion: "How can I assist you today?",
            faqAns: " You can complete your user information details by sharing the details asked in the form"
        },
        {
            faqQuestion: "How can I assist you today?",
            faqAns: " You can complete your user information details by sharing the details asked in the form"
        },
        {
            faqQuestion: "How can I assist you today?",
            faqAns: " You can complete your user information details by sharing the details asked in the form"
        },
        {
            faqQuestion: "How can I assist you today?",
            faqAns: " You can complete your user information details by sharing the details asked in the form"
        },
        {
            faqQuestion: "How can I assist you today?",
            faqAns: " You can complete your user information details by sharing the details asked in the form"
        },
        {
            faqQuestion: "How can I assist you today?",
            faqAns: " You can complete your user information details by sharing the details asked in the form"
        },
        {
            faqQuestion: "How can I assist you today?",
            faqAns: " You can complete your user information details by sharing the details asked in the form"
        },
        {
            faqQuestion: "How can I assist you today?",
            faqAns: " You can complete your user information details by sharing the details asked in the form"
        },
    ]);
    const [faqIndex, setFaqIndex] = useState<number | undefined>(undefined);


    return (
        <div className={"helpHubHelpCont"}>
            <div className='q-helphub-help-upper-cont '>
                <div className='q-helphub-help-upper-cont-text'>
                    <div>
                        <div className='q-helphub-help-upper-cont-text-head'>Help Centre</div>
                        <div className='q-helphub-help-upper-cont-text-para'>
                            Welcome back, Please talk to us to understand
                        </div>
                    </div>
                    <div className='q-helphub-help-upper-cont-text-button'>
                        <img src={CancelButton} alt="" />
                    </div>
                </div>
            </div>

            <div className='q-helphub-help-lower-cont'>
                <div className='q-helphub-help-lower-cont-data'>
                    {/* search box  */}
                    <div className='q-helphub-help-search-cont'>
                        <input type="text" placeholder='Search for FAQs...' />
                        <img src={SearchIcons} alt="" />
                    </div>

                    {/* for faqs  */}
                    <div className='q-helphub-help-faqs-cont'>
                        <div className="q-helphub-help-total-faqs">
                            <div>17 FAQs</div>
                        </div>

                        <div className='q-helphub-help-total-faqs-cont'>

                            {
                                faqsArr.map((value, index) => {
                                    return <div
                                        className={`q-helphub-help-single-faq-${faqIndex === index ? "open" : "close"}`}
                                        key={index}>
                                        <div className='text'>
                                            <div className='head'>
                                                {value.faqQuestion}
                                            </div>
                                            <div className='but' onClick={() => {
                                                index === faqIndex ? setFaqIndex(undefined) : setFaqIndex(index);

                                            }}>
                                                <img src={OpenSectionButton} alt="" />
                                            </div>
                                        </div>

                                        <div className='ans'>
                                            {value.faqAns}
                                        </div>
                                    </div>
                                })
                            }
                        </div>

                    </div>
                </div>
            </div >

        </div >
    )
}

export default HelpHubTasks