export * from "./compile";

export * from "./eval";

export * from "./token";

export * from "./plugin";

import { compile } from "./compile"; 

import { astEval } from "./eval"; 
import { ctx } from "./plugin";

export const use = ctx.use;

export function render(text: string) {
    return astEval(compile(text));
}
