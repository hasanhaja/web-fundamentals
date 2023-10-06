class Timer extends HTMLElement {
  count: number;
  countSpan: HTMLElement;
  timerId: number;

  constructor() {
    super();
    this.count = 0;
    this.countSpan = document.createElement("span");
    
    this.timerId = setInterval(() => {
      console.log("Timer called");

      this.count++; 
      this.countSpan.textContent = this.count.toString();
    }, 1000);
  }

  connectedCallback() {
    console.log("x-timer connected");

    const countParagraph = document.createElement("p");
    countParagraph.textContent = "Count: ";
    this.countSpan.textContent = this.count.toString();

    countParagraph.appendChild(this.countSpan);
    this.appendChild(countParagraph);
  }

  disconnectedCallback() {
    console.log("x-timer disconnected");

    clearInterval(this.timerId);
  } 
}

customElements.define("x-timer", Timer);
