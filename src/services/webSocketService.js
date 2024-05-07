// WebSocketService.js
import { ref } from 'vue';
import { ElNotification } from 'element-plus'
export class WebSocketService {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.isConnected = ref(false);
    this.messages = ref();
  }

  connect() {
    if (this.ws) {
      console.warn('WebSocket is already connected');
      return;
    }

    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      this.isConnected.value = true;
      console.log('WebSocket connected');
    };

    this.ws.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
      this.messages.value = JSON.parse(event.data);
      new Audio("/src/assets/mp3/preview.mp3").play()
      // 使用 Element Plus 通知显示消息
      ElNotification({
        title: '待接单',
        message: "订单:" + this.messages.value.orderNumber + " " + this.messages.value.info + "啦", // 从 WebSocket 消息中提取信息
        type: 'info', // 你可以选择 'success', 'warning', 'error', 'info'
      })
      console.log(this.messages.value)
    };

    this.ws.onclose = () => {
      this.isConnected.value = false;
      this.ws = null;
      console.log('WebSocket closed');
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(message) {
    if (this.ws && this.isConnected.value) {
      this.ws.send(message);
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  disconnect() {
    if (this.ws) {
      //调用webSocket的close方法会自动触发onclose函数
      this.ws.close();
    }
  }
}
