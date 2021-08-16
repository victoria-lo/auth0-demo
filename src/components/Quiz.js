import React, { useState } from "react";
import '../App.css';
import questions from "../assets/Questions";
import { summary } from "../assets/Summary";
import { useForm, Controller } from "react-hook-form";
import { ShareSocial } from 'react-share-social';

export default function Quiz() {
    const [showResult, setShowResult] = useState(false);
    const { control, handleSubmit } = useForm();
    const [result, setResult] = useState("");

    const onSubmit = data => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
        calculateScore(data);
    }

    const calculateScore = (data) => {
        let score = {
            "creative": 0,
            "curious": 0,
            "adventurous": 0,
            "passionate": 0,
        }
        for (let value of Object.values(data)) {
            score[value]++;
        }

        console.log(score);
        let max = Math.max.apply(null, Object.keys(score).map((x) => { return score[x] }));
        setResult(Object.keys(score).filter((x) => { return score[x] === max; })[0]);
        setShowResult(true);
    }

    return (
        <div>
            <h1 className="header">What type of coder are you?</h1>
            {!showResult ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    {questions.map((question, index) => {
                        return (
                            <div className="glass-div" style={{ padding: "1rem", maxWidth: "25rem" }} key={index}>
                                <div className="question">
                                    {question.question}
                                </div>
                                <Controller control={control} rules={{ required: true }} name={question.question}
                                    render={({ field: { onChange, value } }) => (
                                        <div className="answers" value={value} onChange={(e) => {
                                            onChange(e);
                                        }}>
                                            {question.options.map((option, index) => {
                                                return (
                                                    <div className="answer" key={index}>
                                                        <input name={question.question} type="radio" value={option.attribute} />
                                                        {option.answer}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                />
                            </div>
                        );
                    })}
                    <div className="glass-div" style={{ maxWidth: "12rem", marginTop: "2rem" }}>
                        <button type="submit">Submit</button>
                    </div>

                </form>) :
                <div>
                    <h2>You are a {result.toUpperCase()} coder!</h2>
                    <div className="glass-div" style={{ maxWidth: "35rem", marginTop: "2rem", padding: "1.2rem" }}>
                        <p className="summary">{summary[result]}</p>
                    </div>
                    <div className="glass-div" style={{ maxWidth: "18rem", marginTop: "2rem" }}>
                        <ShareSocial
                            url="https://victoria-lo.github.io/auth0-demo"
                            title={`Hey @lo_victoria2666! I completed your 'What Type of Coder Are You' Quiz and I am a ${result} coder! 🤩 Check out the quiz 👉 `}
                            socialTypes={['twitter']}
                        />
                    </div>
                    <div className="glass-div" style={{ maxWidth: "12rem", marginTop: "2rem" }}>
                        <button onClick={() => setShowResult(false)}>Retry Quiz</button>

                    </div>

                </div>}
        </div>
    )
}