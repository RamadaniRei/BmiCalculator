import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Import the CSS for rc-slider
import "./App.css";

function App() {
  let [height, setHeight] = useState("");
  let [weight, setWeight] = useState("");
  let [heightErr, setHeightErr] = useState("");
  let [weightErr, setWeightErr] = useState("");
  let [bmiValue, setBmiValue] = useState("");
  let [bmiText, setBmiText] = useState("");

  const minHeight = 95;
  const minWeight = 10;
  const maxHeight = 220;
  const maxWeight = 300;
  const slimThre = 18.5;
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
  const handleChangeWeightSlider = (value) => {
    setWeight(value);
  };

  const HandleKeyPress = (source, event) => {
    let allowedChars = ".0123456789";
    let currentChar = event.key;
    if (!allowedChars.includes(currentChar)) {
      event.preventDefault();
      return;
    }
    let currentValue = "";
    if (source === "height") {
      currentValue = parseInt(height + currentChar);
      if (currentValue > maxHeight) {
        event.preventDefault();
      }
    } else {
      currentValue = parseInt(weight + currentChar);
      if (currentValue > maxWeight || currentValue === 0) {
        event.preventDefault();
      }
    }
  };

  const classifyResult = (result) => {
    if (result < slimThre) {
      return "slim";
    }
    if (result <= normalThre) {
      return "normal";
    }
    if (result < fatThre) {
      return "fat";
    }
    return "tooFat";
  };

  const validate = () => {
    setHeightErr("");
    setWeightErr("");

    let heightErrStr = "";
    let weightErrStr = "";

    if (!height) {
      heightErrStr = "Please Enter Some Height";
    } else if (height <= minHeight) {
      heightErrStr = "Greater than 95 cm, Please";
    } else if (height >= maxHeight) {
      heightErrStr = "Less than 220 cm, Please";
    }

    if (!weight) {
      weightErrStr = "Please Enter Some weight";
    } else if (weight <= minWeight) {
      weightErrStr = "Greater than 10 kg, Please";
    } else if (weight >= maxWeight) {
      weightErrStr = "Less than 300 kg, Please";
    }

    if (heightErrStr || weightErrStr) {
      setHeightErr(heightErrStr);
      setWeightErr(weightErrStr);
      return false;
    }
    return true;
  };

  const calcBmi = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    let bmi = (weight / (((height / 100) * height) / 100)).toFixed(1);
    let resultString = "";

    switch (classifyResult(bmi)) {
      case "slim":
        resultString = "You are pretty slim, have a KitKat";
        break;
      case "normal":
        resultString = "You are OK for now.";
        break;
      case "fat":
        resultString = " You are getting kind of Fat";
        break;
      case "tooFat":
        resultString = "You are too fat";
        break;
      default:
    }
    setBmiText(resultString);
    setBmiValue(bmi);
  };

  const clearButton = (e) => {
    e.preventDefault();
    setHeight("");
    setWeight("");
    setBmiValue("");
    setHeightErr("");
    setWeightErr("");
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
          min={minHeight}
          max={maxHeight}
          value={height}
          onChange={handleChangeHeight}
          onKeyDown={HandleKeyPress.bind(this, "height")}
        />
        <div className="error">{heightErr}</div>
        <div className="slider">
          <Slider
            min={minHeight}
            max={maxHeight}
            value={height || minHeight}
            onChange={handleChangeHeightSlider}
          />
        </div>
        <br />
        <div className="unit">
          <p>Weight (10kg - 300kg)</p>
        </div>
        <input
          type="number"
          name="weight"
          step="0.5"
          placeholder="kg"
          min={minWeight}
          max={maxWeight}
          value={weight}
          onChange={handleChangeWeight}
          onKeyDown={HandleKeyPress.bind(this, "weight")}
        />
        <div className="error">{weightErr}</div>
        <div className="slider">
          <Slider
            min={minWeight}
            max={maxWeight}
            value={weight || minWeight}
            onChange={handleChangeWeightSlider}
          />
        </div>
        <br />
        <div id="buttons-container">
          <button className="button" onClick={calcBmi}>
            Calculate
          </button>
          <br />
          <button className="button" onClick={clearButton}>
            Clear
          </button>
        </div>
      </form>
      <div>
        <div id="result-toptext">
          <p>Your current BMI : {bmiValue}</p>
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
          height in meters squared. The National Institutes of Health (NIH) now
          defines normal weight, overweight, and obesity according to BMI rather
          than the traditional height/weight charts.
          <ul>
            <li>Overweight is a BMI of 25-29.9</li>
            <li>Obesity is a BMI of 30 or more</li>
          </ul>
          A very muscular person might have a high BMI without health risks.
        </div>
      </div>
    </div>
  );
}

export default App;
