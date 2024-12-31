import { useEffect, useState } from "react";
import React from "react";
import { getAutoCompleteFruits } from "./fruits";
export function Q1() {
  const controller = new AbortController();
  const [sugguestions, setSugguestions] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 300);
  function useDebounce(value: string, delay: number) {
    const [debounce, setDebouce] = useState("");
    useEffect(() => {
      const timeout = setTimeout(() => {
        setDebouce(value);
      }, delay);
      return () => {
        clearTimeout(timeout);
      };
    }, [value, delay]);

    return debounce;
  }

  useEffect(() => {
    const { signal } = controller;
    async function getData() {
      setSugguestions([]);
      if (debouncedValue.length > 0) {
        const data = await getAutoCompleteFruits(debouncedValue, signal);
        setSugguestions(data);
      }
    }
    getData();
    return () => {
      controller.abort("cancel request");
    };
  }, [debouncedValue]);

  return (
    <div className="App">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2px",
        }}
      >
        {sugguestions.map((suggestion) => (
          <p key={suggestion} style={{ border: "1px solid black" }}>
            {suggestion}
          </p>
        ))}
      </div>
    </div>
  );
}
