import React from "react";
import { useState, useRef, useEffect } from "react";
import "./styles.css";

function Message({ message, imgUrl, setImage }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "-300px" }
    );
    // console.log(isIntersecting);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isIntersecting]);

  useEffect(() => {
    if (isIntersecting) {
      ref.current.classList.add("fade-in");
      setImage(imgUrl);
    } else {
      ref.current.classList.remove("fade-in");
    }
  }, [isIntersecting]);

  return (
    <p className="message" ref={ref}>
      {message}
    </p>
  );
}

export default Message;
