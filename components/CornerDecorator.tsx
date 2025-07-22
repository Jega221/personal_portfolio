import React from "react";

interface CornerDecoratorProps {
  size?: number; // default to 32px
  color?: string; // default to white
}

const CornerDecorator: React.FC<CornerDecoratorProps> = ({ size = 32, color = "#ffffff" }) => {
  const style = {
    width: size,
    height: size,
    borderColor: color,
  };

  return (
    <>
      <div className="corner top-left" style={style} />
      <div className="corner top-right" style={style} />
      <div className="corner bottom-left" style={style} />
      <div className="corner bottom-right" style={style} />
    </>
  );
};

export default CornerDecorator;
