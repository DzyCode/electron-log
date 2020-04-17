<template>
  <div id="app" class="window">
    <header class="toolbar toolbar-header">
      <h1 class="title">EleLog</h1>
    </header>
    <div class="window-content">
        <div class="pane-group">
          <div class="pane pane-sm sidebar">
            <nav class="nav-group">
              <div class="nav-head-container">
                <h5 class="nav-group-title">logs</h5>
              </div>
              <!-- <span class="nav-group-item">
                <span class="icon icon-home"></span>
                connors
              </span>
              <span class="nav-group-item active">
                <span class="icon icon-light-up"></span>
                Photon
              </span> -->
            </nav>
          </div>
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
                <tr class="file_arq" v-for="(item, index) in allLogs" v-bind:key="item.uniqueId(index)">
                  <td>{{item.time}}</td>
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
import { getLogs } from './data';
import { LogContent } from './log';

@Component({
  components: {
  },
})
export default class App extends Vue {
  // data() {

  // }
  get allLogs(): LogContent[] {
    return getLogs('');
  }
}
</script>

<style>
#app {
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
  max-width: 100px;
  min-width: 50px;
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
  font-size: 14px;
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
}
th:last-child,
td:last-child {
  border-right: 0;
}
</style>
