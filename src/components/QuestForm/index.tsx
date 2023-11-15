import React, { useContext, useEffect, useRef, useState } from "react";
import QuestContext from '../../components/QuestWrapper';
import { ApiResponse, Submit, fetchQuestions, metadata, questFormPropType } from "./response.ts";
import enterPng from '../../assets/images/enter.png';
import "./form.css";


export const QuestForm = (props: questFormPropType) => {

    const {
        userId = "", questId = "", shadowColor = "rgba(0, 0, 0, 0.25)", token = "", setAnswer = (() => {
        }), onSubmit = (() => {
        })
    } = props;
    const headers = useContext(QuestContext.Context) || null;
    const { apiKey, apiSecret, entityId, featureFlags } = useContext(QuestContext.Context);
    const [criteria, setCriteria] = useState<metadata[]>([]);
    const [subject, setSubject] = useState<ApiResponse>();
    const [page, setPage] = useState(-1);
    const [values, setValues] = useState<Array<(string | Array<string>)>>([])

    let current = Date.now();

    const {
        color = "", bgColor = "", progressBar,
        alignment = "start", inputBorderColor = "transparent",
        headingSize = "24px", descSize = "24px", inputBgColor = "#F6F6F6"
    } = props;
    const setData = async () => {
        const res = await fetchQuestions({ ...headers, userId, questId, token });
        if (!res?.success) return;
        setSubject(res);
        let crts = res?.eligibilityData.map(e => ({
            ...e.data.metadata, ...e.data
        }))
        setCriteria(crts);
        setAnswer(crts.map(({ title, options, criteriaId }) => ({ question: title, answer: options ? [] : "", criteriaId })))
    }
    const [anime, setAnime] = useState<"scroll-animation" | "scroll-animation-rev" | "">("")

    // @ts-ignore
    const TextArea = ({ setFill, title = "" }: {
        setFill: React.Dispatch<React.SetStateAction<string>>,
        title: string
    }) => {
        return (<textarea cols={60} placeholder={"enter the " + title} className='q-form-text-area'
            onChange={(e) => {
                setFill(e.target.value)
                setAnswer(prev => {
                    prev[page].answer = e.target.value;
                    return prev;
                })
            }}
            style={{ color: color, border: `1px solid ${inputBorderColor}`, backgroundColor: bgColor }}
            rows={5}></textarea>)
    }

    // @ts-ignore
    const Radio = ({ setFill, options = ["option1", "option2", "option3"] }: {
        setFill: React.Dispatch<React.SetStateAction<string>>,
        options: Array<string>
    }) => {

        return (<div className="q-form-radio">
            {options.map((option: string, id: number) => (
                <div className="q-form-radio-flex" key={id}>
                    <input id={`sct${id}`} type="radio" value={option}
                        defaultChecked={(!!values[page]?.length) && values[page] == option}
                        onChange={(e) => {
                            setFill(e.target.value)
                            setValues(prev => {
                                prev[page] = e.target.value;
                                return prev;
                            })
                            setAnswer(prev => {
                                prev[page].answer = e.target.value;
                                return prev;
                            })
                        }}
                        name="default-radio"
                        className="q-form-radio-input"
                    />
                    <label
                        htmlFor={`sct${id}`}
                        className="q-form-radio-label"
                    >
                        {option}
                    </label>
                </div>
            ))}
        </div>)
    }

    const Multi = ({ setFill, options = ["option1", "option2", "option3"] }: {
        setFill: React.Dispatch<React.SetStateAction<string>>,
        options: Array<string>
    }) => {
        let selected: Array<string> = [];
        useEffect(() => {
            if (Array.isArray(values[page])) {
                selected = values[page] as Array<string>;
                setFill(selected[0]);
            }
        }, []);

        return (<div className="q-form-multi">
            <ul className="q-form-multi-ul">
                {options.map((option: string, id: number) => (
                    <li key={id}>
                        <input
                            type="checkbox"
                            id={`mct${id}`}
                            value={option}
                            defaultChecked={(!!values[page]?.length) && values[page].includes(option)}
                            className="q-form-multi-li"
                            onChange={(e) => {
                                setFill(e.target.value)
                                setValues(prev => {
                                    if (Array.isArray(prev[page])) {
                                        if (!e.target.checked)
                                            for (let i = prev[page].length - 1; i >= 0; i--) {
                                                if (prev[page][i] === e.target.value) {
                                                    // @ts-ignore
                                                    prev[page].splice(i, 1);
                                                }
                                            }
                                        else {
                                            // @ts-ignore
                                            prev[page].push(e.target.value);
                                        }
                                    } else {
                                        prev[page] = [e.target.value];
                                    }
                                    return prev;
                                })
                                setAnswer(prev => {
                                    if (Array.isArray(prev[page].answer)) {
                                        if (!e.target.checked)
                                            for (let i = prev[page].answer.length - 1; i >= 0; i--) {
                                                if (prev[page]?.answer[i] === e.target.value) {
                                                    // @ts-ignore
                                                    prev[page].answer.splice(i, 1);
                                                }
                                            }
                                        else {
                                            // @ts-ignore
                                            prev[page].answer.push(e.target.value);
                                        }
                                    } else {
                                        prev[page].answer = [e.target.value];
                                    }
                                    return prev;
                                })
                            }}
                        />
                        <label
                            htmlFor={`mct${id}`}
                            className="q-form-multi-for"
                        >
                            <div className="q-form-multi-block">
                                <div className="q-form-text-sm">{option}</div>
                            </div>
                        </label>
                    </li>
                ))}
            </ul>
        </div>)
    }

    const NormalInput = ({ title = "", setFill }: {
        title: string,
        setFill: React.Dispatch<React.SetStateAction<string>>
    }) => {
        const input = useRef<HTMLInputElement>(null);
        useEffect(() => {
            if (!!input.current) {
                if (typeof values[page] === "string") {
                    input.current.value = values[page] as string;
                    setFill(values[page] as string)
                }
                input.current.focus();
            }
        }, []);
        return (<input placeholder={title}
            style={{ color: color, border: `1px solid ${inputBorderColor}`, backgroundColor: inputBgColor }}
            ref={input}
            onChange={(e) => {
                setFill(e.target.value)
                setValues(prev => {
                    prev[page] = e.target.value;
                    return prev
                })
                setAnswer(prev => {
                    prev[page].answer = e.target.value;
                    return prev;
                })
            }}
            className='q-form-normal-input' />)
    }

    const DateInput = ({ setFill }: { setFill: React.Dispatch<React.SetStateAction<string>> }) => {
        const input = useRef<HTMLInputElement>(null);
        useEffect(() => {
            if (!!input.current) {
                if (typeof values[page] === "string") {
                    input.current.value = values[page] as string;
                    setFill(values[page] as string)
                }
            }
        }, []);
        return (
            <div className="py-3">
                <label className="q-form-date-label" htmlFor="dateInput" style={{ color: color }}>
                </label>
                <input type="date" id="dateInput" name="dateInput" ref={input}
                    style={{ color: color, border: `1px solid ${inputBorderColor}`, backgroundColor: inputBgColor }}
                    className="q-form-date-input"
                    onChange={(e) => {
                        setFill(e.target.value)
                        setValues(prev => {
                            prev[page] = e.target.value;
                            return prev
                        })
                        setAnswer(prev => {
                            prev[page].answer = e.target.value;
                            return prev;
                        })
                    }}
                />
            </div>
        );
    }

    const submit = () => {
        const answers = criteria.map((e, i) => ({ criteriaId: e.criteriaId, answer: values[i] }))
        Submit({ entityId, criterias: answers, headers: { apikey: apiKey, apisecret: apiSecret, token, userId }, questId, questUserId: userId })
    }

    const Survey: React.FC = () => {
        if (page > criteria.length - 1) setPage(() => criteria.length - 1);
        const subj = criteria[page]
        const [allowNext, setNext] = useState(true);
        const [fillVal, setFill] = useState("");

        window.onkeydown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                if (subj.isOptional || fillVal) {
                    setAnime("scroll-animation")
                    if (page == criteria.length - 1) {
                        onSubmit();
                        submit();
                    }
                    else {
                        setPage(c => c + 1)
                        setFill("");
                    }

                } else {
                    setNext(false)
                }
            }
        };

        window.onwheel = (e) => {
            if (Date.now() - current < 1000) return;
            current = Date.now();
            if (e.deltaY > 0 && page < criteria.length - 1) {
                if (subj.isOptional || fillVal) {
                    setAnime("scroll-animation")
                    setPage(c => c + 1)
                    setFill("");
                } else {
                    setNext(false)
                }
            } else if (e.deltaY < 0 && page > -1) {
                setAnime("scroll-animation-rev")
                setPage(c => c - 1)
            }
        }
        return (<>
            {!!criteria.length && (
                <div style={{ boxShadow: `0 0 5px ${shadowColor}` }} className={`${anime} q-form-survey`}>
                    <div className={`q-form-survey-h4`} style={{ fontSize: descSize }}>{subj?.title}</div>
                    <div className='q-form-survey-input-div'>
                        {(() => {
                            switch (subj.criteriaType) {
                                case "":
                                    return <NormalInput setFill={setFill} title={subj?.title} />
                                case "USER_INPUT_TEXT":
                                    return <NormalInput setFill={setFill} title={subj?.title} />
                                case "USER_INPUT_MULTI_CHOICE":
                                    return <Multi options={subj.options} setFill={setFill} />
                                case "USER_INPUT_SINGLE_CHOICE":
                                    return <Radio options={subj.options} setFill={setFill} />
                                case "USER_INPUT_DATE":
                                    return <DateInput setFill={setFill} />
                                case "USER_INPUT_TEXT_AREA":
                                    return <TextArea setFill={setFill} title={subj.title} />
                                default:
                                    return <NormalInput setFill={setFill} title={subj?.title} />
                            }
                        })()}
                        {!allowNext && <div className="q-input-alert">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
                                    fill="#C53434" />
                            </svg>
                            <div style={{ color: "red" }}>please fill the above field</div>
                        </div>}
                    </div>
                    <div className='q-form-survey-div'>
                        {page > 0 && page < criteria.length - 1 && <div
                            onClick={() => {
                                setAnime("scroll-animation-rev")
                                setPage(c => c - 1)
                            }}
                            className={`q-form-survey-prev`}>Previous
                        </div>}
                        {page < criteria.length && <div
                            onClick={() => {
                                if (subj.isOptional || fillVal) {
                                    setAnime("scroll-animation")
                                    if (page == criteria.length - 1) {
                                        onSubmit();
                                        submit()
                                    }
                                    else {
                                        setPage(c => c + 1)
                                        setFill("");
                                    }
                                } else {
                                    setNext(false)
                                }
                            }}
                            className={`q-form-first-next`}>
                            {criteria.length - 1 == page ? "Submit" : "Next"}
                        </div>}
                        {(page < 1) && (<div className='q-form-survey-enter'>
                            Press Enter
                            <img className='w-8' src={enterPng} alt='' /></div>)}
                    </div>
                </div>)}
        </>)
    }

    const FirstPage: React.FC = () => {
        window.onkeydown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                setAnime("scroll-animation")
                setPage(c => c + 1)
            }
        };

        window.onwheel = (e) => {
            if (Date.now() - current < 1000) return;
            current = Date.now();
            if (e.deltaY > 0 && page < criteria.length - 1) {
                setAnime("scroll-animation")
                setPage(c => c + 1)
            }
        }
        return (<>
            {!!subject && (<div style={{ boxShadow: `0 0 5px ${shadowColor}` }} className={'q-form-first ' + anime}>
                <div className={`q-form-first-h2`} style={{ color }}>{subject?.data.title}</div>
                <div style={{ color, fontSize: headingSize }}
                    className={`q-form-font-normal`}>{subject.data.description}</div>
                <div className='q-form-first-div'>
                    <div
                        onClick={() => setPage(c => c + 1)}
                        className={`q-form-first-next`}>Next
                    </div>
                    <div className='q-form-first-enter'>Press Enter
                        <img width={"35px"} src={enterPng} alt='' /></div>
                </div>
            </div>)}
        </>)
    }


    useEffect(() => {
        setData()
    }, [])

    return (
        <div className='q-form' style={{ width: props.width || "99vw" }}>
            {progressBar &&
                <div style={{ width: `${String((page + 1) / (criteria.length - 1) * 100)}vw` }}
                    className={`q-form-progress`}></div>}
            <div style={{
                backgroundColor: bgColor,
                color: color,
                justifyContent: alignment
            }} className={`q-form-div`}>
                {(page < 0) ? <FirstPage /> : <Survey />}
            </div>
        </div>
    );
};