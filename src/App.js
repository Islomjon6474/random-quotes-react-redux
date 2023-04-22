import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import React, { useEffect, useState } from "react";
import { decrement, increment, incrementByAmount } from "./redux/counter";

function App() {
  const { value } = useSelector((state) => state.counter);
  const [index, setIndex] = useState(0);
  // console.log(value[0].content);
  const dispatch = useDispatch();
  const dataFetch = async () => {
    try {
      const response = await fetch(
        "https://api.quotable.io/quotes/random?limit=10"
      );
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        console.log(value);
        dispatch(incrementByAmount(json));

        return json;
      } else {
        console.log(response.error.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    dataFetch();
  }, []);

  function changeContent() {
    if (index == value.length - 1) {
      dataFetch();
      setIndex(index + 1);
    } else {
      setIndex(index + 1);
    }
  }
  return (
    <div className="App">
      <button onClick={() => changeContent()} className="next">
        <i class="fa-solid fa-rotate"></i>
      </button>
      <div className="card">
        <i class="fa-solid fa-quote-left"></i>
        <p>{value[index]?.content}</p>

        <strong>-{value[index]?.author}</strong>
      </div>
    </div>
  );
}

export default App;
