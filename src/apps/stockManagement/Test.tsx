import React, { useEffect, useRef, useState } from "react";

const Test = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Automatically focuses input when the component mounts
    }
  }, []);

  return <input ref={inputRef} type="text" placeholder="Auto-focused input" />;
}
export default Test;
