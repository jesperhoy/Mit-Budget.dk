// TypeScript declaration file for Katla 6.1+

declare global {
  const Katla: {
    readonly html:(fixed:TemplateStringsArray,...args:any[])=> any;
    readonly app: (el:string|HTMLElement,render:()=>any)=>Katla.AppType;
    readonly raw: (html:string)=> any;
    readonly directive: (name:string,init:(element:HTMLElement,value:any,mods:string[],app:Katla.AppType)=>(value:any)=>void)=>void;
    readonly memo: (deps:any[],render:()=>any)=>any;
  }  
  const html:(fixed:TemplateStringsArray,...args:any[])=> any;
}


export namespace Katla {

  type AppType={
    readonly redraw: ()=>void;
    autoRedraw: boolean;
    readonly clear:()=>void;
  }
  
  type ComponentType = {
    render: ()=>any;
    load?: ()=>void;
    unload?: ()=>void;
    $app?:AppType; // The current App object (see "Initialize app" above) - typically used to access the `app.redraw()` method.
    $parent?:ComponentType; // The parent component (if any).
    $set?:(key:string,value:any)=>void; // Use this to set a context value - visible to current and child components (through their `.$get` method).
    $get?:(key:string)=>any; // Use this to get a context value - from current or parent components.
    $redraw?:()=>void; // redraw just this component (and subtree).
  }
}
