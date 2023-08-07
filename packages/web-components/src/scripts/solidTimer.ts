import { createSignal, createEffect } from "solid-js";

class Timer extends HTMLElement {
  countSpan: HTMLElement;
  timerId: number;

  constructor() {
    super();
    const [count, setCount] = createSignal(0);
    this.countSpan = document.createElement("span");
    
    createEffect(() => {
      this.countSpan.textContent = count().toString();
    });

    this.timerId = setInterval(() => {
      console.log("Solid timer called");

      setCount((prev) => prev + 1);
    }, 1000);
  }

  connectedCallback() {
    console.log("solid-timer connected");

    const countParagraph = document.createElement("p");
    countParagraph.textContent = "Count: ";

    countParagraph.appendChild(this.countSpan);
    this.appendChild(countParagraph);
  }

  disconnectedCallback() {
    console.log("solid-timer disconnected");

    clearInterval(this.timerId);
  } 
}

customElements.define("solid-timer", Timer);
