// TypeScript declaration file for Katla 2.0.0

declare const html:(fixed:TemplateStringsArray,...args:any[])=> any;

declare namespace Katla {

  const html:(fixed:TemplateStringsArray,...args:any[])=> any;
  const mount: (el:string|HTMLElement,render:()=>any)=>()=>Promise<void>;
  const raw: (html:string)=> any;
  const directive: (name:string,init:(element:HTMLElement,value:any,mods:string[],redraw:()=>Promise<void>)=>(value:any)=>void)=>void;
  const memo: (deps:any[],render:()=>any)=>any;


  type ComponentType = {
    render:()=>any;
    load?:()=>void;
    unload?:()=>void;
    $get:(key:string)=>any;
    $set:(key:string,v:any)=>void;
    $parent?:ComponentType;
    $redraw:()=>Promise<void>;
    /** @deprecated Use .$redraw instead */
    $app?:{redraw:()=>Promise<void>};  // only for backwards compat
  }

  type ComponentWrapper=[new()=>ComponentType] |
    [new()=>ComponentType,Object] |
    [new()=>ComponentType,Object,(c:ComponentType)=>void];

  abstract class Component {
    static wrap(props?:Object,ref?:(c:ComponentType)=>void) :ComponentWrapper 

    abstract render():any;
    load():void 
    unload():void 

    $redraw:()=>Promise<void>;
    $parent:ComponentType;
    $set:(key:string,v:any)=>void;
    $get:(key:string)=>any;
  }

}
