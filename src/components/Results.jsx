import { useState, useEffect } from "react";

const Results = (props) => {
  const [results, setResults] = useState(null);
  const API =
    "https://webapi.icydune-a1052ab7.southeastasia.azurecontainerapps.io/api/v1/Quiz";

  // Function to fetch results
  // This function is called when the Result Screen appears
  async function getResults() {
    try {
      const res = await fetch(`${API}/Summary/${props.sessionId}`);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed to fetch Results:", errorText);
        return;
      }

      const resultData = await res.json();
      setResults(resultData.data);
      console.log("Results Received:", resultData);
    } catch (err) {
      console.error("Error fetching Results:", err);
    }
  }
  // Fetch results when the Result Screen Appears
  useEffect(() => {
    getResults();
  }, []);

  return (
    <div className="w-full bg-blue-800 h-screen px-4">
      <div className="flex flex-col items-center justify-center h-full">
        {!results ? (
          <p className="text-white text-4xl">Waiting for Results...</p>
        ) : (
          <>
            <p className="text-white text-center text-2xl font- mb-4">
              Score is
            </p>
            <p className="text-white text-center text-5xl font-bold mb-4">
              {results.score + "/10"}
            </p>
            <p className="text-white text-center text-2xl mb-4">
              {"Result: "}
              <span
                className={`font-bold text-center text-2xl mb-4 ${
                  results.score >= 8
                    ? "text-green-500"
                    : results.score >= 5
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {results.score >= 8
                  ? "Excellent"
                  : results.score >= 5
                  ? "Pass"
                  : "Fail"}
              </span>
            </p>
            <button
              onClick={props.continue}
              className="p-4 text-3xl w-[70%] bg-white-600 rounded-xl font-bold  mb-4 bg-white text-black shadow-lg transition duration-300 hover:bg-gray-300 hover:scale-105"
            >
              Continue
            </button>
            <p className="text-white text-center text-xl mb-4">
              {"It took you "}
              <span className="font-black text-2xl text-red-500">
                {results.timeSpent}{" "}
                {results.timeSpent > 1 ? "seconds" : "second"}
              </span>{" "}
              to finish the quiz!
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Results;
