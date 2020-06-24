import morgan from "morgan";

function logger(...args) {
  if (process.env.NODE_ENV === "production") {
    morgan("tiny")(...args);
  } else {
    morgan("dev")(...args);
  }
}

export default logger;
