<template>
  <el-container class="index-con">
    <el-aside :class="showclass">
		<el-scrollbar style="height: 100vh;width: 100%;">
			<leftnav ref="leftnav"></leftnav>
		</el-scrollbar>
    </el-aside>
    <el-container class="main-con">
      <el-header class="index-header">
        <navcon></navcon>
      </el-header>
      <el-main clss="index-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// 导入组件
import navcon from '../components/navcon.vue';
import leftnav from '../components/leftnav.vue';
import "../../static/js/sockjs.min.js";
import "../../static/js/stomp.js";
let _this;
export default {
  name: 'index',
  data() {
    return {
      showclass: 'asideshow',
      showtype: false
    }
  },
  // 注册组件
  components: {navcon,leftnav},
  methods: {
	sendRabbitmq() {
		var ws;
		if (typeof WebSocket === "function") {
			ws = new WebSocket("wss://yysyh.cxvk.com.cn/ws/");
			console.log("WebSocket!!!!!!!!!!!");
		} else {
			//wss://yysyh.cxvk.com.cn:15674/ws
			ws = new SockJS("http://101.200.147.211:15674/stomp");
			console.log("SockJS!!!!!!!!!!!!!");
		}
		// Init Client
		var client = Stomp.over(ws);
		// SockJS does not support heart-beat: disable heart-beats
		// client will send heartbeats every xxxms
		client.heartbeat.outgoing = 0;
		// client does not want to receive heartbeats
		client.heartbeat.incoming = 0;
		// Declare on_connect
		var on_connect = () => {
			client.subscribe(
				"/queue/hinthost",
				function(d) {
					var message = d.body;
					var messages = message.split(";");
					console.log(messages);
					Notification.requestPermission(function(status) {
						if (status === "granted") {
							new Notification(messages);
							_this.$refs["leftnav"].getList("layout");
						} else {
							alert(messages);
						}
					});
				}
			);
		};
		// 断开连接
		var on_error = function() {
			_this.sendRabbitmq();
			_this.$refs["leftnav"].getList("layout");
			console.error("断开重新连接,error");
		};
		client.connect("read", "read", on_connect, on_error, "/");
	},
   },
  mounted() {
	  _this = this ;
    // 监听
    this.$root.Bus.$on('toggle', value => {
      if (value) {
        this.showclass = 'asideshow'
      } else {
        setTimeout(() => {
          this.showclass = 'aside'
        }, 300)
      }
    });
		this.sendRabbitmq();
  },
  beforeUpdate() {},
  // 挂载前状态(里面是操作)
}
</script>
<style >
.index-con {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.aside {
  width: 64px !important;
  height: 100%;
  background-color: #334157;
  margin: 0px;
}
.asideshow {
  width: 240px !important;
  height: 100%;
  background-color: #334157;
  margin: 0px;
}
.index-header,
.index-main {
  padding: 0px;
  border-left: 2px solid #333;
}
</style>
