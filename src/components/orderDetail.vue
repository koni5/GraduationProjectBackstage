<template>
  <el-dialog
      title="订单信息"
      width="53%"
      class="order-dialog"
  >
    <el-scrollbar style="height: 100%">
      <div class="order-top">
        <div>
          <div style="display: inline-block">
            <label style="font-size: 16px">订单号：</label>
            <div class="order-num">
              {{ orderDetail.number }}
            </div>
          </div>
          <div
              style="display: inline-block"
              class="order-status"
              :class="{ status3: [3, 4].includes(orderDetail.status) }"
          >
            取消
          </div>
        </div>
        <p><label>下单时间：</label>{{ orderDetail.orderTime }}</p>
      </div>

      <div class="order-middle">
        <div class="user-info">
          <div class="user-info-box">
            <div class="user-name">
              <label>用户名：</label>
              <span>{{ orderDetail.name }}</span>
            </div>
          </div>
          <div
              class="user-remark"
              :class="{ orderCancel: orderDetail.status === 6 }"
          >
            <div>{{ orderDetail.status === 6 ? '取消原因' : '备注' }}</div>
            <span>{{
                orderDetail.status === 6
                    ? props.orderDetail.status.cancelReason || props.orderDetail.status.rejectionReason
                    : props.orderDetail.status.remark
              }}</span>
          </div>
        </div>

        <div class="dish-info">
          <div class="dish-label">菜品</div>
          <div class="dish-list">
            <div
                v-for="(item, index) in orderDetail.orderDetailList"
                :key="index"
                class="dish-item"
            >
              <div class="dish-item-box">
                <span class="dish-name">{{ item.name }}</span>
                <span class="dish-num">x{{ item.number }}</span>
              </div>
              <span class="dish-price"
              >￥{{ item.amount }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </el-dialog>
</template>
<script setup>
import {useOrderDetailStore} from "@/stores/index.js";

const orderDetailStore = useOrderDetailStore()
let orderDetail = orderDetailStore.info
</script>
