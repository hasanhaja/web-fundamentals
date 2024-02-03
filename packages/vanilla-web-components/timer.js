class Timer extends HTMLElement {
  static attrs = {
    interval: "x-interval",
  };

  static observedAttributes = [Timer.attrs.interval];

  /**
    * @type { number }
    */
  #count;
  /**
    * @type { HTMLElement }
    */
  #countSpan;
  /**
    * @type { number }
    */
  #timerId;

  constructor() {
    super();
    this.#count = 0;
    this.#countSpan = document.createElement("span");
  }

  connectedCallback() {
    console.log("x-timer connected");
    const parsed = parseInt(this.getAttribute(Timer.attrs.interval));
    const interval = isNaN(parsed) ? 1 : parsed;
    
    this.#timerId = setInterval(() => {
      console.log("Timer called");

      this.#count++; 
      this.#countSpan.textContent = this.#count.toString();
    }, interval * 1000);

    const countParagraph = document.createElement("p");
    countParagraph.textContent = "Count: ";
    this.#countSpan.textContent = this.#count.toString();

    countParagraph.appendChild(this.#countSpan);
    this.appendChild(countParagraph);
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === Timer.attrs.interval) {
      // const parsed = parseInt(newValue);
      // const interval = isNaN(parsed) ? 1 : parsed;
      // console.log(this.#timerId);
      // this.#timerId = setInterval(() => {
      //   console.log("Re-registered timer called");

      //   this.#count++; 
      //   this.#countSpan.textContent = this.#count.toString();
      // }, interval * 1000);
    }
  }

  disconnectedCallback() {
    console.log("x-timer disconnected");

    clearInterval(this.#timerId);
  } 
}

customElements.define("x-timer", Timer);
