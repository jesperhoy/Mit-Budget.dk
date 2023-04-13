/**
 * @param {string} name
 * @returns any
 */
export function Icon(name) {
  switch(name) {
    case 'add':
      return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288M400 256H112" /></svg>`;
    case 'check':
      return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M416 128L192 384l-96-96" /></svg>`;
    case 'edit':
      return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><path d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z" fill="currentColor" /></svg>`;
    case 'trash':
      return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" /><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>`;
    case 'download':
      return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56M192 400.1l64 63.9 64-63.9M256 224v224.03" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>`;
    case 'upload':
      return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 255.79l-64-64-64 64M256 448.21V207.79" /></svg>`;
    case 'save':
      return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M380.93 57.37A32 32 0 00358.3 48H94.22A46.21 46.21 0 0048 94.22v323.56A46.21 46.21 0 0094.22 464h323.56A46.36 46.36 0 00464 417.78V153.7a32 32 0 00-9.37-22.63zM256 416a64 64 0 1164-64 63.92 63.92 0 01-64 64zm48-224H112a16 16 0 01-16-16v-64a16 16 0 0116-16h192a16 16 0 0116 16v64a16 16 0 01-16 16z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>`;
    case 'open':
      return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 192v-72a40 40 0 0140-40h75.89a40 40 0 0122.19 6.72l27.84 18.56a40 40 0 0022.19 6.72H408a40 40 0 0140 40v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><path d="M479.9 226.55L463.68 392a40 40 0 01-39.93 40H88.25a40 40 0 01-39.93-40L32.1 226.55A32 32 0 0164 192h384.1a32 32 0 0131.8 34.55z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>`;
    case 'new':
      return html`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 221.25V416a48 48 0 01-48 48H144a48 48 0 01-48-48V96a48 48 0 0148-48h98.75a32 32 0 0122.62 9.37l141.26 141.26a32 32 0 019.37 22.62z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" /><path d="M256 56v120a32 32 0 0032 32h120" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>`;
    case 'share':
      return html`<svg class="icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><circle cx='128' cy='256' r='48' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' /><circle cx='384' cy='112' r='48' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' /><circle cx='384' cy='400' r='48' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' /><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M169.83 279.53l172.34 96.94M342.17 135.53l-172.34 96.94' /></svg>`;
    case 'copy':
      return html`<svg class="icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><rect x='128' y='128' width='336' height='336' rx='57' ry='57' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32' /><path d='M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' /></svg>`;
    case 'warning':
      return html`<svg class="icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' /><path d='M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' /><path d='M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z' /></svg>`;
    case 'info':
      return html`<svg class="icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32' /><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M220 220h32v116' /><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32' d='M208 340h88' /><path d='M248 130a26 26 0 1026 26 26 26 0 00-26-26z' /></svg>`;
    default:
      return html`<div class="icon">Icon name '${name}' not found</div>`;
  }
}
