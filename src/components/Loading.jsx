/* eslint-disable no-else-return */
import React from "react";

function Loading({ error, retry, timedOut, pastDelay }) {
  if (error) {
    return (
      <div>
        Error!{" "}
        <button type="button" onClick={retry}>
          Retry
        </button>
      </div>
    );
  } else if (timedOut) {
    return (
      <div>
        Taking a long time...{" "}
        <button type="button" onClick={retry}>
          Retry
        </button>
      </div>
    );
  } else if (pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
}

export default Loading;
