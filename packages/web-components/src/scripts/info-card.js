class InfoCard extends HTMLElement {
  render() {
    const template = `
      <div>
        <img 
          src="https://www.tivix.com/wp-content/uploads/2019/07/_Shot_2015-01-26_at_5.24.15_PM.png" 
          alt="" 
          height="250px"
        />
        <div>
          <p>🌶️ Hot take</p>
          <h2>&ldquo;Web Components are cool!&rdquo;</h2>
          <div>
            <span>@hasanhaja</span>
            <div>
              <span>Up</span>
              <span>Comment</span>
              <span>Down</span>
            </div>
          </div>
        </div>
      </div>
    `;

    this.innerHTML = template;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("info-card", InfoCard);
