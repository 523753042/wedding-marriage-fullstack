<template>
  <div class="c-Publicity">
    <el-carousel
      height="50px"
      :autoplay="true"
      indicator-position="none"
      arrow="never"
      :interval="3000"
    >
      <el-carousel-item v-for="item in message" :key="item.key">
        <div class="item" :class="{ actiname: item.key === 0 }">
          <template v-if="attendList.length > 0">
            <span v-if="item.title" class="title"> {{ item.title }}</span>
            <template v-if="item.value && item.value.length > 0">
              <span
                class="value"
                v-for="(person, index) in item.value"
                :key="index"
              >
                <img class="public-img" :src="person.avatarUrl" alt="" />
                <span> {{ person.nickName }}</span>
                <span> {{ index === item.value.length - 1 ? '' : '、' }}</span>
              </span>
            </template>
          </template>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { conversionCategoryName } from '@/helper/index';

export default {
  name: 'Publicity',
  computed: {
    config() {
      return this.$store.state.config;
    },
    result() {
      return this.$store.state.result;
    },
    attendList: {
      get() {
        console.log('11', this.$store.state.attendList)
        return this.$store.state.attendList
      }
    },
    message() {
      const { result, config } = this;
      const fields = Object.keys(config);

      let message = [{ key: 0, title: config.name }];
      fields.forEach((item, index) => {
        let label = conversionCategoryName(item);
        if (result[item] && config[item] > 0) {
          message.push({
            key: index + 1,
            title: `${label}抽奖结果:`,
            value: result[item]
          });
        }
      });
      console.log('message', message)
      return message;
    }
  }
};
</script>
<style lang="scss">
.c-Publicity {
  height: 100%;
  // width: 1000px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  .el-carousel {
    width: 80vw;
    margin: 0 auto;
  }
  .item {
    text-align: center;
    color: #fff;
    font-size: 16px;
    .title {
      color: #ccc;
    }
    .value {
      margin-left: 10px;
    }
    .public-img {
      width: 30px;
    }
    &.actiname {
      .title {
        color: red;
        font-size: 20px;
      }
    }
  }
}
</style>
