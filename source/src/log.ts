export class LogContent {
    readonly time: number;
    readonly tag: string;
    readonly content: string;
    constructor(time: number, tag: string, content: string) {
        this.time = time;
        this.tag = tag;
        this.content = content;
    }
    uniqueId(index: number): string {
        return `${this.time}-${index}`;
    }
}