import React, { useState } from "react";
import Display from "./Display";
import Tastierino from "./Tastierino";
import "./Calculator.css";

const Calcolatrice = () => {
  const [expression, setExpression] = useState("");
  const [displayEXP, setDisplayEXP] = useState("");
  const [result, setResult] = useState("-");

  const operatori = ["+", "-", "*", "/"];

  function calcolaRisultato() {
      try {
        let risultato = eval(expression);
        risultato = parseFloat(risultato);
        setResult(risultato);
      } catch (error) {
        setResult("Errore");
      }   
  }

  function effettua(value) {
    switch (value) {
      case "AC":
        setExpression("");
        setDisplayEXP("");
        setResult("-");
        break;

      case "C":
        setDisplayEXP(displayEXP.slice(0, -1));
        setExpression(expression.slice(0, -1));
        break;

      case "=":
        calcolaRisultato();
        break;

      default:           
            if (operatori.includes(value)) {
              const op = expression.slice(-1);
              if (operatori.includes(op)) {
                setExpression(expression.slice(0, -1) + value);
                setDisplayEXP(displayEXP.slice(0, -1) + value);
                return;
              }
            }
      setDisplayEXP(displayEXP + value);
      setExpression(expression + value);
    }
  }

  return (
    <>
    <div className="calcolatrice">
      <Display expression={displayEXP} result={result} />
      <Tastierino effettua={effettua} />
    </div>
    </>
  );
};

export default Calcolatrice;
