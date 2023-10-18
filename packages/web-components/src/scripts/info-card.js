/*
 * TODO Comment button opens a dialog for submit. This might need a form handler attribute
 * TODO 
 */
class InfoCard extends HTMLElement {
  #upVoteBtn;
  #downVoteBtn;
  #commentBtn;
  #commentDialog;

  constructor() {
    super();
  }

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
              <button id="up-vote">Up</button>
              <button id="comment">Comment</button>
              <button id="down-vote">Down</button>
            </div>
          </div>
          <dialog>
            <form method="dialog">
              <label for="comment-msg">Comment</label>
              <input name="comment-msg">
              <button>Send</button>
            </form>
          </dialog>
        </div>
      </div>
    `;

    this.innerHTML = template;
  }

  connectedCallback() {
    this.render();

    this.#upVoteBtn = this.querySelector("#up-vote");
    this.#downVoteBtn = this.querySelector("#down-vote");
    this.#commentBtn = this.querySelector("#comment");
    this.#commentDialog = this.querySelector("dialog");

    const upVoteEvent = new CustomEvent("card-up-vote", {
      bubbles: true,
    });
    
    const downVoteEvent = new CustomEvent("card-down-vote", {
      bubbles: true,
    });

    this.#upVoteBtn.addEventListener("click", (e) => {
      e.target.dispatchEvent(upVoteEvent);
      
    });

    this.#downVoteBtn.addEventListener("click", (e) => {
      e.target.dispatchEvent(downVoteEvent);
    });


    this.#commentBtn.addEventListener("click", (e) => {
      this.#commentDialog.showModal(); 
    });
  }
}

customElements.define("info-card", InfoCard);
