export * from "./compile";

export * from "./eval";

export * from "./token";

import { compile } from "./compile"; 
import { astEval } from "./eval"; 

export function render(text: string) {
    return astEval(compile(text));
}
