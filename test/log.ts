export class LogContent {
    readonly time: number;
    readonly tag: string;
    readonly content: string;
    readonly timeDesc: string;
    constructor(time: number, tag: string, content: string) {
        this.time = time;
        this.tag = tag;
        this.content = content;
        this.timeDesc = this.currentTime();
    }
    currentTime(): string {
        return new Date(this.timeDesc).toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }
    uniqueId(index: number): string {
        return `${this.time}-${index}`;
    }
}