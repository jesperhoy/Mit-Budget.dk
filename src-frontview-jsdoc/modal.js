/** @typedef {"sm"|"md"|"lg"|"xl"} ModalSize */

export class CmpModal {
  title='';
  /**@type ModalSize */
  size='md';
  /**@type any */
  contentBody;
  /**@type any */
  contentFooter;
  /**@type VoidFunction */
  onSubmit;
  /**@type any */
  #MyModal=null;
  #IsOpen=false;
  Show() {
    if(this.#IsOpen) return;
    this.#IsOpen=true;
    if(this.#MyModal) this.#MyModal.show();
  }
  Hide() {
    if(!this.#IsOpen) return;
    this.#IsOpen=false;
    if(this.#MyModal) this.#MyModal.hide();
  }
  get value() {
    return this.#IsOpen;
  }
  set value(v) {
    if(v) this.Show(); else this.Hide();
  }
  #mount(/**@type HTMLElement*/el) {
    setTimeout(()=>{
      this.#MyModal = new bootstrap.Modal(el);
      if(this.#IsOpen) this.#MyModal.show();
    },5);
  }

  render() {
    return html`<div class="modal fade" tabindex="-1" #ref=${(/**@type HTMLElement*/el)=>this.#mount(el)}>
  <div class="modal-dialog modal-dialog-centered${this.size==='md'?'':' modal-'+this.size}">
    <div class="modal-content">
      <form @submit|prevent=${()=>{if(this.onSubmit) this.onSubmit()}}>
        <div class="modal-header">
          <h5 class="modal-title">${this.title}</h5>
          <button type="button" class="btn-close" @click=${()=>this.Hide()} aria-label="Close"></button>
        </div>
        <div class="modal-body">${this.contentBody}</div>
        <div class="modal-footer">${this.contentFooter}</div>
      </form>
    </div>
  </div>
</div>`;
  }

}