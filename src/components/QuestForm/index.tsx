import React, { useContext, useEffect, useRef, useState } from "react";
import QuestContext from '../../components/QuestWrapper';
import { ApiResponse, fetchQuestions, metadata, questFormPropType } from "./response.ts";
import enterPng from '../../assets/images/enter.png';


export const QuestForm = (props: questFormPropType) => {

    const { userId = "", questId = "", token = "", setAnswer = (() => { }), onSubmit = (() => { }) } = props;
    const headers = useContext(QuestContext.Context) || null;

    const [criteria, setCriteria] = useState<metadata[]>([]);
    const [subject, setSubject] = useState<ApiResponse>();
    const [page, setPage] = useState(-1);
    const [values, setValues] = useState<Array<(string | Array<string>)>>([])

    let current = Date.now();

    const { color = "", bgColor = "", progressBar,
        alignment = "start", inputBorderColor = "transparent",
        headingSize = "24px", descSize = "24px"
    } = props;
    const setData = async () => {
        const res = await fetchQuestions({ ...headers, userId, questId, token });
        if (!res?.success) return;
        setSubject(res);
        let crts = res?.eligibilityData.map(e => ({
            ...e.data.metadata, ...e.data
        }))
        setCriteria(crts);
        setAnswer(crts.map(({ title, options }) => ({ question: title, answer: options || "" })))
    }
    const [anime, setAnime] = useState<"scroll-animation" | "scroll-animation-rev" | "">("")

    // @ts-ignore
    const TextArea = ({ setFill, title = "" }: { setFill: React.Dispatch<React.SetStateAction<string>>, title: string }) => {
        return (<textarea cols={60} placeholder={"enter the " + title} className='!p-[10px]'
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
    const Radio = ({ setFill, options = ["option1", "option2", "option3"] }: { setFill: React.Dispatch<React.SetStateAction<string>>, options: Array<string> }) => {

        return (<div className="flex gap-x-12 gap-y-2 flex-wrap">
            {options.map((option: string, id: number) => (
                <div className="flex items-center mb-3" key={id}>
                    <input id={`sct${id}`} type="radio" value={option}
                        onChange={(e) => {
                            setFill(e.target.value)
                            setAnswer(prev => {
                                prev[page].answer = e.target.value;
                                return prev;
                            })
                        }}
                        name="default-radio"
                        className="h-4 w-4 accent-black  bg-grey-700 text-red-500 rounded cursor-pointer"
                    />
                    <label
                        htmlFor={`sct${id}`}
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                    >
                        {option}
                    </label>
                </div>
            ))}
        </div>)
    }

    const Multi = ({ setFill, options = ["option1", "option2", "option3"] }: { setFill: React.Dispatch<React.SetStateAction<string>>, options: Array<string> }) => {
        return (<div className="py-3">
            <p
                className="block mb-1 font-medium"
                style={{ color: color }}
            >
            </p>
            <ul className="flex flex-wrap w-full gap-3">
                {options.map((option: string, id: number) => (
                    <li key={id}>
                        <input
                            type="checkbox"
                            id={`mct${id}`}
                            value={option}
                            className="hidden peer"
                            onChange={(e) => {
                                setFill(e.target.value)
                                setAnswer(prev => {
                                    if (Array.isArray(prev[page].answer)) {
                                        // @ts-ignore
                                        prev[page].answer.push(e.target.value);
                                    } else {
                                        prev[page].answer = [e.target.value];
                                    }
                                    return prev;
                                })
                            }}
                        />
                        <label
                            htmlFor={`mct${id}`}
                            className="inline-flex items-center justify-between px-5 py-1 text-gray-800 bg-white border-2 border-gray-800 rounded-2xl cursor-pointer peer-checked:border-gray-800 peer-checked:bg-gray-800 peer-checked:font-bold peer-checked:text-white hover:text-gray-600 hover:bg-gray-50"
                        >
                            <div className="block">
                                <div className="text-sm">{option}</div>
                            </div>
                        </label>
                    </li>
                ))}
            </ul>
        </div>)
    }

    const NormalInput = ({ title = "", setFill }: { title: string, setFill: React.Dispatch<React.SetStateAction<string>> }) => {
        const input = useRef<HTMLInputElement>(null);
        useEffect(() => {
            if (!!input.current) input.current.focus();
        }, []);
        return (<input placeholder={"Enter Your " + title}
            style={{ color: color, border: `1px solid ${inputBorderColor}`, backgroundColor: bgColor }}
            ref={input}
            // value={values[page]}
            onChange={(e) => {
                setFill(e.target.value)
                // setValues(prev => {
                //     prev[page] = e.target.value;
                //     return [...prev]
                // })
                setAnswer(prev => {
                    prev[page].answer = e.target.value;
                    return prev;
                })
            }}
            className='h-[35px] text-black py-5 focus:border-none focus:outline-none' />)
    }

    const DateInput = ({ setFill }: { setFill: React.Dispatch<React.SetStateAction<string>> }) => {
        return (
            <div className="py-3" >
                <label className="block mb-1 font-medium" htmlFor="dateInput" style={{ color: color }}>
                </label>
                <input type="date" id="dateInput" name="dateInput"
                    style={{ color: color, border: `1px solid ${inputBorderColor}`, backgroundColor: bgColor }}
                    className="bg-gray-100 border-none outline-none text-sm rounded focus:ring-blue-500 focus:ring-1 w-full p-3"
                    onChange={(e) => {
                        setFill(e.target.value)
                        setAnswer(prev => {
                            prev[page].answer = e.target.value;
                            return prev;
                        })
                    }}
                />
            </div>
        );
    }

    const Survey: React.FC = () => {
        if (page > criteria.length - 1) setPage(() => criteria.length - 1);
        const subj = criteria[page]
        const [allowNext, setNext] = useState(true);
        const [fillVal, setFill] = useState("");

        window.onkeydown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                if (page == criteria.length - 1)
                    onSubmit();
                if (subj.isOptional || fillVal) {
                    setAnime("scroll-animation")
                    setPage(c => c + 1)
                    setFill("");
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
            }
            else if (e.deltaY < 0 && page > -1) {
                setAnime("scroll-animation-rev")
                setPage(c => c - 1)
            }
        }

        return (<>
            {!!criteria.length && (
                <div className={`${anime} flex absolute justify-center items-start gap-12 flex-col p-10`}>
                    <h4 className={`font-normal text-[${descSize}]`}>{subj?.title}</h4>
                    <div>
                        {(() => {
                            if (page == 1)
                                return <NormalInput setFill={setFill} title={subj?.title} />
                            if (page == 2)
                                return <Multi options={subj.options} setFill={setFill} />
                            if (page == 3)
                                return <Radio options={subj.options} setFill={setFill} />
                            if (page == 4)
                                return <DateInput setFill={setFill} />
                            else
                                return <NormalInput title={subj?.title || ""} setFill={setFill} />
                        })()}
                        <div className='text-red-600'>{!allowNext && `please fill the ${subj.title}`}</div>
                    </div>
                    <div className='flex items-center gap-10'>
                        {page > 0 && page < criteria.length - 1 && <button
                            onClick={() => {
                                setAnime("scroll-animation-rev")
                                setPage(c => c - 1)
                            }}
                            className={`w-[165px]  text-[24px] h-14 px-11 py-6 rounded-lg border justify-center items-center gap-2 inline-flex`}>Previos
                        </button>}
                        {page < criteria.length && <button
                            onClick={() => {
                                if (subj.isOptional || fillVal) {
                                    setAnime("scroll-animation")
                                    setPage(c => c + 1)
                                    setFill("");
                                } else {
                                    setNext(false)
                                }
                            }}
                            className={`w-[165px] h-14 px-11 py-6 rounded-lg border justify-center items-center gap-2 inline-flex !text-white !bg-black`}>
                            {criteria.length - 1 == page ? "Back To Home" : "Next"}
                        </button>}
                        <div className='flex whitespace-nowrap gap-5 font-[300] items-center'>
                            Press Enter
                            <img className='w-8' src={enterPng} alt='' /></div>
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
            {!!subject && (<div className={'absolute flex justify-center items-start gap-12 flex-col p-10 ' + anime}>
                <h2 className={`font-bold text-xl text-[${color}]`}>{subject?.data.title}</h2>
                <h4 className={`font-normal text-[${headingSize}]`}>{subject.data.description}</h4>
                <div className='flex items-center gap-10'>
                    <button
                        onClick={() => setPage(c => c + 1)}
                        className={`w-[165px] text-[24px] h-14 px-11 py-6 !text-white !bg-black rounded-lg border justify-center items-center gap-2 inline-flex`}>Next
                    </button>
                    <div className='flex whitespace-nowrap gap-5 font-[300] items-center'>Press Enter
                        <img className='w-8' src={enterPng} alt='' /></div>
                </div>
            </div>)}
        </>)
    }


    useEffect(() => {
        setData()
    }, [])
    return (
        <div className='questLabs flex flex-col h-[100vh]'>
            {progressBar &&
                <div style={{ width: `${String((page + 1) / (criteria.length - 1) * 100)}vw` }}
                    className={`h-2 bg-blue-700 fixed`}></div>}
            <div style={{
                backgroundColor: bgColor,
                color: color,
            }} className={`relative !w-[100%] h-[95vh] flex justify-${alignment} items-center`}>
                {(page < 0) ? <FirstPage /> : <Survey />}
            </div>
        </div>
    );
};