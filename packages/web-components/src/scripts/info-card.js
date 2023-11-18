/*
 * TODO Comment button opens a dialog for submit. This might need a form handler attribute
 * TODO 
 */
class InfoCard extends HTMLElement {
  #upVoteBtn;
  #downVoteBtn;
  #commentBtn;
  #commentDialog;
  #dialogForm;
  #dialogCancel;
  #dialogSend; 

  constructor() {
    super();
  }

  render() {
    const template = `
      <div>
        <img 
          src="https://nhswd.com/static/4a2336cef7dfbf7f8e628fd9e0be3fa2/acb7c/web-components-official-logo%20copy.png" 
          alt="" 
          height="250px"
        />
        <div>
          <p>🌶️ Hot take</p>
          <h2>&ldquo;Web Components are cool!&rdquo;</h2>
          <div>
            <span>@hasanhaja</span>
            <div>
              <button id="up-vote">
                <span class="sr-only">Up</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                </svg>
              </button>
              <button id="comment">
                <span class="sr-only">Comment</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                </svg>
              </button>
              <button id="down-vote">
                <span class="sr-only">Down</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </button>
            </div>
          </div>
          <dialog>
            <form method="dialog">
              <label for="comment-msg">Comment</label>
              <div>
              <!-- TODO This could become a web component -->
              <!-- https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/ -->
              <textarea 
                rows=3 
                name="comment-msg"
                onInput="this.parentNode.dataset.replicatedValue = this.value"
              ></textarea>
              </div>
              <span>
                <button data-action="cancel">Cancel</button>
                <button type="submit" data-action="send">Send</button>
              </span>
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
    this.#dialogForm = this.querySelector("dialog > form");
    this.#dialogCancel = this.querySelector("[data-action='cancel']");
    this.#dialogSend = this.querySelector("[data-action='send']");

    const upVoteEvent = new CustomEvent("card-up-vote", {
      bubbles: true,
    });
    
    const downVoteEvent = new CustomEvent("card-down-vote", {
      bubbles: true,
    });

    const newComment = (comment) => new CustomEvent("card-submit-comment", {
      bubbles: true,
      detail: {
        comment,
      },
    });

    this.#dialogCancel.addEventListener("click", () => {
      this.#commentDialog.close();
    });

    this.#commentDialog.addEventListener("close", () => {
      this.#dialogForm.reset();
    });

    this.#dialogForm.addEventListener("submit", (e) => {
      const data = new FormData(e.target);
      const comment = data.get("comment-msg");
      this.dispatchEvent(newComment(comment));
      e.target.reset();
    });

    this.#upVoteBtn.addEventListener("click", (e) => {
      e.target.dispatchEvent(upVoteEvent);
      
    });

    this.#downVoteBtn.addEventListener("click", (e) => {
      e.target.dispatchEvent(downVoteEvent);
    });

    this.#commentBtn.addEventListener("click", () => {
      this.#commentDialog.showModal(); 
    });
  }
}

customElements.define("info-card", InfoCard);
