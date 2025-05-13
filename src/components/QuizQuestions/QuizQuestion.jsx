import React, { useState, useEffect } from "react";
import Answers from "./Answers";
import Modal from "./Modal";

const QuizQuestion = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [startTime, setStartTime] = useState(Date.now()); // record start time
  const [questionCount, setQuestionCount] = useState(-1);

  const API =
    "https://webapi.icydune-a1052ab7.southeastasia.azurecontainerapps.io/api/v1/Quiz";

  useEffect(() => {
    setQuestionCount((prev) => prev + 1); // update question count
    setStartTime(Date.now()); // reset start time when question changes
  }, [props.questionId]);

  const submitAnswer = async (choiceId) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    try {
      const response = await fetch(`${API}/Answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: props.sessionId,
          questionId: props.questionId,
          choiceId: choiceId,
          timeSpent: timeSpent, // send time spent
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Error submitting answer:", error);
        return;
      }

      const data = await response.json();
      console.log("Answer submitted successfully:", data);
      setResults(data.data);
    } catch (err) {
      console.error("Network or parsing error:", err);
    }

    setSubmitted(true);
  };

  const handleNext = () => {
    setSubmitted(false);
    props.fetchQuestions(props.sessionId);
  };

  return (
    <div className="w-full bg-blue-800 h-screen px-3">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-white text-center text-2xl font-bold mb-4">
          {"Question " + questionCount + " of 10"}
        </h1>
        <h1 className="text-white text-center text-2xl font-bold mb-4">
          {props.title}
        </h1>
        {props.choices.map((choice, index) => (
          <Answers
            key={index}
            title={choice.title}
            choiceId={choice.choiceId}
            sessionId={props.sessionId}
            questionId={props.questionId}
            onClick={() => submitAnswer(choice.choiceId)}
          />
        ))}
        {submitted && <Modal results={results} onNext={handleNext} />}
      </div>
    </div>
  );
};

export default QuizQuestion;
