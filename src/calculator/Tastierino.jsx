import React from "react";

const Tastierino = ({ effettua }) => {
  const basicKeys = [ "7", "8", "9", "/",  "4", "5", "6", "*", "1", "2", "3", "-", "0", "(", ")", "+",  ".", "C", "AC", "="  ];

  return (
    <>
    <div className="keysWindow">
      <div className="line"></div>
      <div className="keys_basic">
        {basicKeys.map((item) => (
          <button
            className={`${item >= "0" && item <= "9" ? "number" : ""} ${
              item === "=" && "equal"
            }`}
            onClick={() => effettua(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
    </>
  );
};

export default Tastierino;