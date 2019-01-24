import { ctx } from "./plugin";

export type GeneralToken<T, Parameter> = {
    type: T
} & Parameter;

export type HeaderToken = GeneralToken<'#', {
    weight: number, 
    text: string
}>

export type BlockToken = GeneralToken<'>' | '*' | 0, { 
    inner: Token, 
    n: number // 序号
}>

export type ParaToken = GeneralToken<'p', {
    text: string
}>;;

export type CodeToken = GeneralToken<'</>', {
    lang: '' | string
}>;

export type BrToken = GeneralToken<'br', {}>;

export type Token = HeaderToken | BrToken | ParaToken | CodeToken | BlockToken; 

/**
 * 制造 Token
 * @param lineOne 
 * @param WhichLine 
 */
export function getTokenFrom(lineOne: string, WhichLine: number): Token {
    let ret: Token;

    if (lineOne.startsWith('#')) {
        // '## 123'.split('#')
        // => ['', '', ' 123']
        // => ['', ''].length, ' 123'
        // =>      weight       text
        const byHashTag = lineOne.split('#');
        let text = byHashTag.pop();
        const weight = byHashTag.length; 

        // 如果没有 Text 
        if (!text) text = '';

        ret = { type: '#', weight, text: text.trim() } as HeaderToken;
    } else if (/^[>-]|\* /.test(lineOne) || /^[0-9]. /.test(lineOne)) {
        // 如果是 > - * 或者有序列表  
        let [ one, ...rest ] = lineOne.split(''); 
        
        if (!Number.isNaN(+one)) {
            const inner = getTokenFrom(rest.slice(2).join(''), WhichLine);

            ret = { type: 0, n: +one, inner } as BlockToken;
        } else {
            if (one === '-') one = '*';
            const inner = getTokenFrom(rest.slice(1).join(''), WhichLine);

            ret = { type: one, inner, n: 0 } as BlockToken;
        }
    } else if (lineOne.startsWith('```')) {
        // 代码块 
        const [, ...langTexts] = lineOne.split(' '); 

        ret = { type: '</>', lang: langTexts.join('') };
    } else {
        ret = lineOne === '' ? 
            { type: 'br' } as BrToken : 
            { type: 'p', text: lineOne } as ParaToken;
    }

    return ctx.applyParses(ret, lineOne);
}

function map2lines(text: string) {
    // Pre Process 
    return text.split('\n')
        // Just Trim 
        .map(e => e.trim())
}

export function parse(text: string) {
    return map2lines(text).map((line, idx) => getTokenFrom(line, idx)); 
}
