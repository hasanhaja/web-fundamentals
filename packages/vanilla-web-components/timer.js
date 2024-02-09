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
    console.log("Constructor called");
  }

  connectedCallback() {
    console.log("x-timer connected");

    this.#count = 0;
    this.#countSpan = document.createElement("span");

    const parsed = parseInt(this.getAttribute(Timer.attrs.interval));
    const interval = isNaN(parsed) ? 1 : parsed;
    
    this.#timerId = setInterval(() => {
      this.#count++; 
      this.#countSpan.textContent = this.#count.toString();
    }, interval * 1000);

    const countParagraph = document.createElement("p");
    countParagraph.textContent = "Count: ";
    this.#countSpan.textContent = this.#count.toString();

    countParagraph.appendChild(this.#countSpan);
    this.appendChild(countParagraph);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === Timer.attrs.interval) {
        if (!this.isConnected) {
          return;
        }

        const parsed = parseInt(newValue);
        const interval = isNaN(parsed) ? 1 : parsed;

        clearInterval(this.#timerId);

        this.#timerId = setInterval(() => {
          console.log("New timer called", interval);

          this.#count++; 
          this.#countSpan.textContent = this.#count.toString();
        }, interval * 1000);
      }
    }
  }

  disconnectedCallback() {
    console.log("x-timer disconnected");

    clearInterval(this.#timerId);
  } 
}

customElements.define("x-timer", Timer);
