import React, { useRef, useState } from 'react';
import './Quiz.css';
import { data } from '../assets/data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[0]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const optionArray = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add("wrong");
        optionArray[question.ans - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      setIndex(prevIndex => prevIndex + 1);
      setQuestion(data[index + 1]);
      setLock(false);
      optionArray.forEach(option => {
        option.current.classList.remove("correct");
        option.current.classList.remove("wrong");
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setLock(false);
    setScore(0);
    setResult(false);
    optionArray.forEach(option => {
      option.current.classList.remove("correct");
      option.current.classList.remove("wrong");
    });
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {!result ? (
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
          </ul>
          <button onClick={next}>Next</button>
          <p>{index + 1} of {data.length} questions</p>
        </>
      ) : (
        <>
          <h2>You Scored {score} out of {data.length}</h2>
          <button onClick={reset}>Reset</button>
        </>
      )}
    </div>
  );
};

export default Quiz;


