export type GeneralToken<T, Parameter> = {
    type: T
} & Parameter;

export type HeaderToken = GeneralToken<'#', {
    weight: number, 
    text: string
}>

export type BlockToken = GeneralToken<'>' | '*' | 0, { 
    inner: '' | BlockToken, 
    n: number // 序号
}>

export type ParaToken = string;

export type CodeToken = GeneralToken<'</>', {
    lang: '' | string
}>;

export type BrToken = '';

export type Token = HeaderToken | BrToken | ParaToken | CodeToken | BlockToken; 

/**
 * 制造 Token
 * @param lineOne 
 * @param WhichLine 
 */
export function getTokenFrom(lineOne: string, WhichLine: number): Token {
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

        return { type: '#', weight, text } as HeaderToken; 
    } else if (/^[>-]|\* /.test(lineOne) || /^[0-9]. /.test(lineOne)) {
        // 如果是 > - * 或者有序列表  
        let [ one, ...rest ] = lineOne.split(''); 
        
        if (!Number.isNaN(+one)) {
            const inner = getTokenFrom(rest.slice(2).join(''), WhichLine);
            return { type: 0, n: +one, inner } as BlockToken
        } else {
            if (one === '-') one = '*';
            const inner = getTokenFrom(rest.slice(1).join(''), WhichLine);
            return { type: one, inner, n: 0 } as BlockToken;
        }
    } else if (lineOne.startsWith('```')) {
        // 代码块 
        const [, ...langTexts] = lineOne.split(' '); 
        return { type: '</>', lang: langTexts.join('') }
    } else {
        // 文本
        return lineOne as ParaToken;
    }
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
