export class LogContent {
    readonly time: number;
    readonly tag: string;
    readonly content: string;
    readonly timeDesc: string;
    readonly date: Date;
    constructor(time: number, tag: string, content: string) {
        this.time = time;
        this.tag = tag;
        this.content = content;
        this.timeDesc = this.currentTime();
        this.date = new Date(this.time);
    }
    currentTime(): string {
        const d = new Date(this.time);
        return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        // return new Date(this.time).toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }
    uniqueId(index: number): string {
        return `${this.time}-${index}`;
    }
    timeAvailable(h: number, m: number, s: number, above: boolean): boolean {
        const lh = this.date.getHours();
        const lm = this.date.getMinutes();
        const ls = this.date.getSeconds();
        if(!above) {
            return h > lh || h === lh && (m > lm || m === lm && s >= ls); 
        } else {
            return h < lh || h === lh && (m < lm || m === lm && s < ls); 
        }
    }
}