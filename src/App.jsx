import { useState, useEffect } from "react";
import QuizQuestion from "./components/QuizQuestions/QuizQuestion";
import Results from "./components/Results";
import Menu from "./components/Menu";

function App() {
  // States to Manage Rendering the Quiz Screens
  const [gameStart, setGameStart] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [questions, setQuestions] = useState(null);

  const API =
    "https://webapi.icydune-a1052ab7.southeastasia.azurecontainerapps.io/api/v1/Quiz";

  // Get session ID from API
  async function createSession() {
    try {
      const res = await fetch(`${API}/Session`, {
        method: "POST",
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Session creation failed:", errorText);
        return;
      }

      const session = await res.json();
      console.log("Session created:", session);

      // Save the session ID and fetch questions
      setSessionId(session.data.sessionId);
      // Get Questions after getting Session ID
      fetchQuestions(session.data.sessionId);
    } catch (err) {
      console.error("Error creating session:", err);
    }
  }

  // Function to fetch questions
  // This function is called after the session ID is created
  // and when the user clicks "Next" in the quiz
  async function fetchQuestions(sessionId) {
    try {
      const res = await fetch(`${API}/Questions/${sessionId}`);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed to fetch questions:", errorText);
        return;
      }

      const questionData = await res.json();
      console.log("Question loaded:", questionData);

      setQuestions(questionData.data);
      setGameStart(true);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  }

  // Function to restart the game
  // This function is called when the user clicks "Continue" in the results
  const gameRestart = () => {
    setGameStart(false);
    setQuestions(null);
    setSessionId(null);
  };

  return (
    <div className="bg-blue-800 h-screen flex flex-col font-mono">
      <header className="z-9999 flex justify-between items-center bg-gray-800 p-4 shadow-lg">
        <div className="text-white text-2xl font-bold">Quiz Island </div>
      </header>

      {/* Main Menu */}
      {!gameStart && <Menu createSession={createSession} />}

      {/* Quiz Questions */}
      {questions != null && gameStart && (
        <QuizQuestion
          choices={questions.choices}
          questionId={questions.questionId}
          title={questions.title}
          sessionId={sessionId}
          fetchQuestions={fetchQuestions}
        />
      )}

      {/* Results */}
      {questions == null && gameStart && (
        <Results continue={gameRestart} sessionId={sessionId} />
      )}
    </div>
  );
}

export default App;
