import "./App.css";
import React, { useState } from "react";
import ReactSlider from "react-slider";
function App() {
  let [height, setHeight] = useState("");
  let [weight, setWeight] = useState("");
  let [heightErr, setHeightErr] = useState("");
  let [weightErr, setWeightErr] = useState("");
  let [bmiValue, setBmiValue] = useState("");
  let [bmiText, setBmiText] = useState("");
  let [text, setText] = useState("");

  const minHeight = 95;
  const minWeight = 10;
  const maxHeight = 220;
  const maxWeight = 300;
  const slimThe = 18.5;
  const normalThre = 24.9;
  const fatThre = 29.9;

  const handleChangeHeight = (e) => {
    setHeight(e.target.value);
  };

  const handleChangeWeight = (e) => {
    setWeight(e.target.value);
  };

  const handleChangeHeightSlider = (value) => {
    setHeight(value);
  };
  const handleChangeWeighttSlider = (value) => {
    setWeight(value);
  };

  const HandleKeyPress = (source, event) => {
    let allowedChars = ".0123456789";
    let currentChar = event.key;
    let found = false;
    for (let i = 0; i < allowedChars.length; i++) {
      if (currentChar === allowedChars[i]) {
        found = true;
      }
    }
  };

  return (
    <div id="container">
      <div id="title">
        <h1>Calculate your body mass index</h1>
      </div>
      <form>
        <div className="unit">
          <p>Height (95cm - 220cm) </p>
        </div>
        <input
          type="number"
          name="height"
          step="1"
          placeholder="cm"
          min=""
          max=""
          value=""
          //onChange={}
          //onKeyPress={}
        />
        <div className="error"></div>
        <div className="slider">
          <ReactSlider />
        </div>
        <br />
        <div className="unit">
          <p>Weight(10kg - 300kg)</p>
        </div>
        <input
          type="number"
          name="weight"
          step="0.5"
          placeholder="kg"
          min=""
          max=""
          value=""
          //onChange={}
          //onKeyPress={}
        />
        <div className="error"></div>
        <div className="slider">
          <ReactSlider />
        </div>
        <br />
        <div id="buttons-container">
          <button className="button"> Calculate</button>
          <br />
          <button className="button"> Clear</button>
        </div>
      </form>
      <div>
        <div id="result-toptext">
          <p> Your current BMI : {bmiValue}</p>
        </div>
        <div className="bmi-text">{bmiText}</div>
      </div>
      <div className="text">
        <div id="text">
          Body mass index, abbreviated BMI, is a key index for relating weight
          to height.
          <br />
          <br />
          BMI is a person's weight in kilograms (kg) divided by his or her
          height in meters squared. The National Institues of Health (NIH) now
          defines normal weight ,overweight and obesity according to BMI rather
          than the traditional height/weight charts
          <ul>
            <li>Overweight is a BMI of 25-29.9</li>
            <li>Obesity is a BMI of 30 or more</li>
          </ul>
          A very muscular person might have a high BMI without health risks
        </div>
      </div>
    </div>
  );
}

export default App;
