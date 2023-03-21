declare var bootstrap:any;

export type ModalRender= [Function,ModalProps,(m:CmpModal)=>void];

export type ModalProps={
  title:string,
  size?:string, //sm,md,lg,xl
  contentBody:any;
  contentFooter?:any;
  onSubmit?:VoidFunction;
}

export class CmpModal {
  title:string='';
  size:string='md'; //sm,md,lg,xl
  contentBody:any;
  contentFooter:any;
  onSubmit:VoidFunction;
  #MyModal:any=null;
  #IsOpen:boolean=false;
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
  get value():boolean {
    return this.#IsOpen;
  }
  set value(v:boolean) {
    if(v) this.Show(); else this.Hide();
  }
  #mount(el:HTMLElement) {
    setTimeout(()=>{
      this.#MyModal = new bootstrap.Modal(el);
      if(this.#IsOpen) this.#MyModal.show();
    },5);
  }

  render() {
    return html`<div class="modal fade" tabindex="-1" #ref=${(el:HTMLElement)=>this.#mount(el)}>
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