if (window.Worker) {
  const worker = new Worker("worker.js");
  
  const calculateButton = document.getElementById("calculate");
  const output = document.getElementById("output");

  calculateButton.addEventListener("click", () => {
    const n1 = parseInt(document.querySelector("[data-value='n1']").textContent ?? 0);
    const n2 = parseInt(document.querySelector("[data-value='n2']").textContent ?? 0);
    const operation = document.querySelector("[data-operation]").dataset.operation;

    const input = {
      operation,
      data: {
        n1,
        n2,
      },
    };

    worker.postMessage(input);
  });

  worker.onmessage = (e) => {
    const { result } = e.data;
    output.textContent = result;
  };
}

