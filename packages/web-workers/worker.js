onmessage = (e) => {
  const { operation, data } = e.data;

  if (operation === "add") {
    const { n1, n2 } = data;
    const output = {
      result: `${n1 + n2}`,
    };
    postMessage(output);
  } else if (operation === "subtract") {
    const { n1, n2 } = data;
    const output = {
      result: `${n1 - n2}`,
    };
    postMessage(output);
  } else if (operation === "multiply") {
    const { n1, n2 } = data;
    const output = {
      result: `${n1 * n2}`,
    };
    postMessage(output);
  } else if (operation === "divide") {
    const { n1, n2 } = data;
    const output = {
      result: `${n1 / n2}`,
    };
    postMessage(output);
  } else {
    const output = {
      result: "Not supported",
    };
    postMessage(output);
  }
};
