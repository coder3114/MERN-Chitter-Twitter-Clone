import { Routes, Route } from "react-router-dom";

import PostPeep from "./Components/PostPeep";
import { submitPeep } from "./api/peepAPI.js";
import PeepModel from "./Components/utils/Peep.model";

function App() {
  const submitPeepHandler = async (peep) => {
    console.log("calling this");
    const response = await submitPeep(peep);
    if (response?.error) {
      console.error("Error submitting peep:", response.error.message);
    } else {
      console.log("Peep submitted successfully:", response.peep);
    }
  };

  return (
    <>
      <div className="app">
        <Routes>
          <Route
            path="/post"
            element={<PostPeep submitAction={submitPeepHandler} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
