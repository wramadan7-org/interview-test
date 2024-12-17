import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";

interface Question {
  id: number;
  question: string;
  answer: string;
}

interface CodeEditorProps {
  language: string;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  output: string;
  setOutput: React.Dispatch<React.SetStateAction<string>>;
}

const QuestionPage: React.FC<CodeEditorProps> = ({
  language,
  code,
  setCode,
  output,
  setOutput,
}) => {
  // Define the list of questions
  const questions: Question[] = [
    {
      id: 1,
      question:
        "What is your approach to solving debugging issues in complex codebases?",
      answer: "",
    },
    {
      id: 2,
      question:
        "Explain a time when you had to optimize performance in an application.",
      answer: "",
    },
    {
      id: 3,
      question:
        "How do you ensure code readability and maintainability in large projects?",
      answer: "",
    },
    // You can add more questions as needed
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answer, setAnswer] = useState<string>(questions[0].answer);
  //   const [code, setCode] = useState<string>("");
  //   const [output, setOutput] = useState<string>("");

  // const handleAnswerChange = (
  //   event: React.ChangeEvent<HTMLTextAreaElement>
  // ): void => {
  //   setAnswer(event.target.value);
  // };

  const handleRunCode = () => {
    if (language === "javascript") {
      try {
        const originalLog = console.log;
        let logOutput = "";

        console.log = (...args) => {
          logOutput += args.map((arg) => JSON.stringify(arg)).join(" ") + "\n";
        };

        new Function(code)();
        console.log = originalLog;

        setOutput(logOutput || "No output from console.log");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setOutput(`Error: ${err.message}`);
      }
    } else {
      setOutput(`Language "${language}" execution is not supported yet.`);
    }
  };

  const handleNextQuestion = (): void => {
    // Save the answer for the current question
    questions[currentQuestionIndex].answer = answer;

    // Move to the next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswer(questions[currentQuestionIndex + 1].answer); // Reset the answer field
    } else {
      alert("You have completed all the questions!");
    }
  };

  const handleBackQuestion = (): void => {
    // Save the answer for the current question
    questions[currentQuestionIndex].answer = answer;

    // Move to the previous question
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswer(questions[currentQuestionIndex - 1].answer); // Reset the answer field
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-full items-center justify-center mx-auto p-6 bg-white rounded-lg shadow-md mt-5">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Programmer's Question ({language})
      </h1>

      <div className="grid-flow-row md:grid-cols-2 gap-3">
        {/* Left side: Question */}
        <div className="flex flex-col justify-center items-start">
          <p className="text-lg text-gray-600">{currentQuestion.question}</p>
        </div>

        {/* Right side: Answer */}
        <div className="flex flex-row justify-between items-start space-x-4">
          {/* Bagian Kiri */}
          <div className="w-1/2 flex flex-col justify-center items-start">
            <MonacoEditor
              height="400px"
              defaultLanguage={language}
              theme="vs-dark"
              value={code}
              onChange={(newCode) => setCode(newCode || "")}
              options={{
                selectOnLineNumbers: true,
                wordWrap: "on",
                automaticLayout: true,
              }}
            />
            <button
              onClick={handleRunCode}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 mt-4"
            >
              Evaluate Code
            </button>
          </div>

          {/* Bagian Kanan */}
          <div className="w-1/2 flex flex-col justify-center items-start">
            <div className="flex flex-col justify-center mb-5 w-full">
              {/* <label className="text-xl font-semibold text-gray-700 mb-4">
                Output
              </label> */}
              <div
                className="min-w-full p-4 border-2 border-gray-300 rounded-lg min-h-[150px] bg-gray-100 text-black"
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  height: "400px",
                  width: "100%",
                }}
              >
                {output}
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleBackQuestion}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                disabled={currentQuestionIndex === 0} // Disable back button on the first question
              >
                Back
              </button>
              <button
                onClick={handleNextQuestion}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Next Question
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Show progress */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
      </div>
    </div>
  );
};

export default QuestionPage;
