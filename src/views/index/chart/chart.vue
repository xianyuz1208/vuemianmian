<template>
  <div class="chart-content">
    <el-card class="top-card">
      <ul>
        <li>
          <span class="circle primary">{{ totalData.increment_users }}</span>
          <span>今日新增用户</span>
        </li>
        <li>
          <span class="circle primary">{{ totalData.total_users }}</span>
          <span>总用户量</span>
        </li>
        <li>
          <span class="circle warning">{{
            totalData.increment_questions
          }}</span>
          <span>新增试题</span>
        </li>
        <li>
          <span class="circle warning">{{ totalData.total_questions }}</span>
          <span>总试题量</span>
        </li>
        <li>
          <span class="circle success">{{
            totalData.total_done_questions
          }}</span>
          <span>总刷题量</span>
        </li>
        <li>
          <span class="circle success">{{ totalData.personal_questions }}</span>
          <span>人均刷题量</span>
        </li>
      </ul>
    </el-card>
    <el-card class="bottom-card">
      <div ref="chart" class="chartBox"></div>
    </el-card>
  </div>
</template>

<script>
import { getTitle, getStatistics } from "@/api/data.js";
import echarts from 'echarts';
export default {
  name: "chart",
  data() {
    return {
      totalData: {},
    };
  },
  mounted() {
    getTitle().then((res) => {
      // window.console.log(res)
      this.totalData = res.data;
    });
    getStatistics().then((res) => {
      // window.console.log(res)
      let myChart = echarts.init(this.$refs.chart);
      let name = res.data.map((v) => {
        return v.name;
      });
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          right: 10,
          data: name,
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: res.data,
          },
        ],
      };
      myChart.setOption(option);
    });
  },
};
</script>

<style lang="less">
.chart-content {
  .top-card {
    height: 160px;
    margin-bottom: 10px;
    ul {
      display: flex;
      align-items: center;
      justify-content: space-around;
      li {
        span {
          display: block;
          color: #737373;
          text-align: center;
          font-size: 16px;
          margin-top: 5px;
        }
        .circle {
          width: 99px;
          height: 99px;
          border: 2px solid pink;
          border-radius: 50%;
          text-align: center;
          line-height: 99px;
          font-size: 35px;
          &.primary {
            color: #0086fa;
            border-color: #0086fa;
          }
          &.warning {
            color: #f76238;
            border-color: #f76238;
          }
          &.success {
            color: #55cd78;
            border-color: #55cd78;
          }
        }
      }
    }
  }
  .bottom-card{
    height: 571px;
  .chartBox{
    height: 571px;
  }
  }
}
</style>
