<template>
  <div id="app" class="window">
    <header class="toolbar toolbar-header">
      <div class="filter">
        <form>
          filter time from
          <input type="number" step="1" min="-1" max="12" placeholder="-1" v-model="filterSync.timeBH">
          :
          <input type="number" step="1" min="-1" max="60" placeholder="-1" v-model="filterSync.timeBM">
          :
          <input type="number" step="1" min="-1" max="60" placeholder="m" v-model="filterSync.timeBS">
          to
          <input type="number" step="1" min="-1" max="12" placeholder="hh" v-model="filterSync.timeEH">
          :
          <input type="number" step="1" min="-1" max="60" placeholder="m" v-model="filterSync.timeEM">
          :
          <input type="number" step="1" min="-1" max="60" placeholder="m" v-model="filterSync.timeES">
          tag
          <input type="text" placeholder="tag" v-model="filterSync.tag">
          <input type="button" value="Filter" v-on:click="filterMsg"> 
          <input type="button" value="Reset" v-on:click="resetLogs"> 
          <input type="button" value="Clear" v-on:click="clearLogs"> 
        </form>
      </div>
    </header>
    <div class="window-content">
        <div class="pane-group">
          <!-- <div class="pane pane-sm sidebar">
            <nav class="nav-group">
              <div class="nav-head-container">
                <h5 class="nav-group-title">filter</h5>
              </div>
              <form>
                begin time
                <input type="time" step="1" id="text" placeholder="time begin" v-model="timeBegin">
              </form>
              <form>
                end time
                <input type="text" id="text" placeholder="time begin" v-model="timeEnd">
              </form>
              <form>
                Tag
                <input type="text" id="text" placeholder="time begin" v-model="tagKey">
              </form>
              <input type="button" value="Filter" v-on:click="filterMsg"> 
            </nav>
          </div> -->
          <div class="pane">
            <table class="table-striped">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Tag</th>
                  <th>Content</th>
                </tr>
              </thead>
              <tbody>
                <tr class="file_arq" v-for="(item, index) in logs" v-bind:key="item.uniqueId(index)">
                  <td>{{item.timeDesc}}</td>
                  <td>{{item.tag}}</td>
                  <td>{{item.content}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { LogContent } from './log';
import { ipcRenderer } from 'electron';

@Component({
  components: {
  },
})
export default class App extends Vue {
  data() {
    return {
      origionSource: [
        // new LogContent(1587363036000, 'fdc', 'jfkd'),
        // new LogContent(1587363037000, 'fdd', 'jfkd'),
        // new LogContent(1587363038000, 'fdd', 'jfkd'),
        // new LogContent(1587363039000, 'fdg', 'jfkd'),
        // new LogContent(1587363040000, 'fdhg', 'jfkd'),
        // new LogContent(1587363041000, 'fdr', 'jfkd'),
      ],
      logs:[

      ],
      maxNum: 1000,
      filterSync: {
        timeBH: -1,
        timeBM: -1,
        timeBS: -1,
        timeEH: -1,
        timeEM: -1,
        timeES: -1,
        tag: ''
      },
      filterSave: {
        timeBH: -1,
        timeBM: -1,
        timeBS: -1,
        timeEH: -1,
        timeEM: -1,
        timeES: -1,
        tag: ''
      }
    }
  }

mounted() {
  ipcRenderer.on('electron-log-data', (event, args) => {
      console.log('receive log: ' + JSON.stringify(args));
        const len = args.length;
        if(len && len > 0) {
            for(let i = 0; i < len; i++) {
                const tag = args[i].tag;
                const content = args[i].content;
                let time = args[i].time || new Date().getTime();
                if(tag && content && time) {
                  const lg = new LogContent(time, tag, content);
                    this.$data.origionSource.push(lg);
                    if(this.$data.origionSource.length > this.$data.maxNum) {
                        this.$data.origionSource.shift();
                    }
                  if(this.wrapLog(lg)) {
                    this.$data.logs.push(lg);
                    if(this.$data.logs.length > this.$data.maxNum) {
                        this.$data.logs.shift();
                    }
                  }
                }
            }
        }
    })
}
  filterMsg() {
    this.$data.filterSave.timeBH = Number(this.$data.filterSync.timeBH);
    this.$data.filterSave.timeEH = Number(this.$data.filterSync.timeEH);
    this.$data.filterSave.timeBM = Number(this.$data.filterSync.timeBM);
    this.$data.filterSave.timeEM = Number(this.$data.filterSync.timeEM);
    this.$data.filterSave.timeES = Number(this.$data.filterSync.timeES);
    this.$data.filterSave.timeBS = Number(this.$data.filterSync.timeBS);
    this.$data.filterSave.tag = this.$data.filterSync.tag;
    this.filterLogs();
  }

  filterLogs() {
    const lgs = [];
    const len = this.$data.origionSource.length;
    for(let i = 0; i < len; i++) {
      if(this.wrapLog(this.$data.origionSource[i])) {
        lgs.push(this.$data.origionSource[i]);
      }
    }
    this.$data.logs = lgs;
  }
  wrapLog(log: LogContent): boolean {
    const f = this.$data.filterSave;
    return (f.timeBH < 0 || f.timeBM < 0 || f.timeBS < 0 || log.timeAvailable(f.timeBH, f.timeBM, f.timeBS, true))
          && (f.timeEH < 0 || f.timeEM < 0 || f.timeES < 0 || log.timeAvailable(f.timeEH, f.timeEM, f.timeES, false))
          && (f.tag === '' || log.tag.indexOf(f.tag) >= 0)
  }
  resetLogs() {
     this.$data.filterSync.timeBH = -1;
    this.$data.filterSync.timeEH = -1;
    this.$data.filterSync.timeBM = -1;
    this.$data.filterSync.timeEM = -1;
    this.$data.filterSync.timeES = -1;
    this.$data.filterSync.timeBS = -1;
    this.$data.filterSync.tag = '';
    this.filterMsg();
  }
  clearLogs() {
    this.$data.origionSource = [];
    this.$data.logs = [];
  }
}

</script>

<style>
#app {
}
#input{
  min-width: 20px;
}
.filter {
  display: flex;
  flex-flow: row;
}
.window {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}
.window-content {
  position: relative;
  overflow-y: auto;
  display: flex;
  flex: 1;
}
.toolbar {
  min-height: 22px;
  box-shadow: inset 0 1px 0 #f5f4f5;
  background-color: #e8e6e8;
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #e8e6e8), color-stop(100%, #d1cfd1));
  background-image: -webkit-linear-gradient(top, #e8e6e8 0%, #d1cfd1 100%);
  background-image: linear-gradient(to bottom, #e8e6e8 0%, #d1cfd1 100%);
}
.toolbar:before, .toolbar:after {
  display: table;
  content: " ";
}
.toolbar:after {
  clear: both;
}

.toolbar-header {
  border-bottom: 1px solid #c2c0c2;
}
.toolbar-header .title {
  margin-top: 1px;
}
.title {
  margin: 0;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: #555;
  cursor: default;
}
.pane-group {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
}
.pane {
  position: relative;
  overflow-y: auto;
  flex: 1;
  border-left: 1px solid #ddd;
}
.pane:first-child {
  border-left: 0;
}

.pane-sm {
  max-width: 120px;
  min-width: 80px;
}
.sidebar {
  background-color: #f5f5f4;
}
.nav-head-container {
  display: flex;
  flex-direction:row;
  align-items: center;
}
.nav-group {
  font-size: 12px;
}
.nav-group-title {
  margin: 0;
  padding: 10px 10px 2px;
  font-size: 12px;
  font-weight: 500;
  color: #666666;
}
.nav-group-item {
  padding: 2px 10px 2px 25px;
  display: block;
  color: #333;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nav-group-item:active, .nav-group-item.active {
  background-color: #dcdfe1;
}
thead {
  background-color: #f5f5f4;
}
.table-striped {
      table-layout: fixed;
}
.table-striped tr:nth-child(even) {
  background-color: #f5f5f4;
}

tr:active,
.table-striped tr:active:nth-child(even) {
  color: #fff;
  background-color: #116cd6;

}
thead tr:active {
  color: #333;
  background-color: #f5f5f4;
}
tbody {
  background-color: #fff;

}
th {
  font-weight: normal;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
th,
td {
  padding: 2px 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 10px;
  word-wrap: break-word;
  word-break: break-all;
}
th:last-child,
td:last-child {
  border-right: 0;
}
</style>
