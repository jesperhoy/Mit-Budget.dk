/**
 * @param {{label:string,inputid?:string,labeltop?:boolean,contenttop?:boolean}} props
 * @param {any} content */
export function FormField(props,content) {
  return html`<div>
  <div class=${props.labeltop?'top':null}>
    ${props.inputid?html`<label for=${props.inputid} class="form-label">${props.label}</label>`:
    html`${props.label}`}
  </div>
  <div class=${props.contenttop?'top':null}>${content}</div>
</div>`;
}
