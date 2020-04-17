import { LogContent } from './log';

const logs: LogContent[] = [
    new LogContent(1000, 'tag', 'content')
];

let maxNum = 1000;

export function setMaxLogs(max: number) {
    maxNum = max;
}

export function addLog(log: LogContent) {
    logs.push(log);
    if(logs.length > maxNum) {
        logs.shift();
    }

}

export function addTag(tag: string) {

}
export function removeTag(tag: string) {

}

export function getLogs(tag: string) {
    return logs;
}