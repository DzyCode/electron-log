import { LogContent } from './log';
import { ipcRenderer } from 'electron';

const logs: LogContent[] = [
    new LogContent(1000, 'tag', 'content')
];

let maxNum = 1000;

ipcRenderer.on('electron-log-data', (event, args) => {
    const len = args.length;
    if(len && len > 0) {
        for(let i = 0; i < len; i++) {
            const tag = args[i].tag;
            const content = args[i].content;
            let time = args[i].time || new Date().getTime();
            if(tag && content && time) {
                logs.push(new LogContent(time, tag, content));
            }
        }
    }
})

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