<template>
  <div class="page_root" id="root_index">
    <div class="warp">
      <div class="container-fluid">
        <el-row>
          <el-col :span="4">
            <div_label
              bg_color="bg_purple"
              icon="el-icon-user-solid"
              :url="url_user_count"
              unit="人"
              title="用户数量"
            ></div_label>
          </el-col>
          <!--					<el-col :span="4">-->
          <!--						<div_label bg_color="bg_green" icon="el-icon-view" :url="url_article_hits" unit="次"-->
          <!--								  title="文章浏览量"></div_label>-->
          <!--					</el-col>-->
        </el-row>

        <el-row>
          <el-col
            v-if="
              user_group == '管理员' ||
              $check_figure('/attraction_reservation/table')
            "
            :span="8"
          >
            <div class="card chart">
              <newLineChart
                v-if="line_obj_attraction_reservation.values.length > 0"
                id="line_obj_attraction_reservation"
                :vm="line_obj_attraction_reservation"
                :title="'景点预约统计'"
              >
              </newLineChart>
              <div v-if="!line_obj_attraction_reservation.values.length">
                景点预约没有符合条件的数据
              </div>
            </div>
          </el-col>
          <!-- <el-col
            v-if="
              user_group == '管理员' ||
              $check_figure('/homestay_reservation/table')
            "
            :span="8"
          >
            <div class="card chart">
              <stackedHorizontalBarChart
                v-if="bar_obj_homestay_reservation.values.length > 0"
                id="bar_obj_homestay_reservation"
                :vm="bar_obj_homestay_reservation"
                :title="'民宿预约统计'"
              >
              </stackedHorizontalBarChart>
              <div v-if="!bar_obj_homestay_reservation.values.length">
                民宿预约没有符合条件的数据
              </div>
            </div>
          </el-col> -->
          <!-- <el-col
            v-if="
              user_group == '管理员' || $check_figure('/product_exchange/table')
            "
            :span="8"
          >
            <div class="card chart">
              <newBarChart
                v-if="bar_obj_product_exchange.values.length > 0"
                id="bar_obj_product_exchange"
                :vm="bar_obj_product_exchange"
                :title="'商品兑换统计'"
              >
              </newBarChart>
              <div v-if="!bar_obj_product_exchange.values.length">
                商品兑换没有符合条件的数据
              </div>
            </div>
          </el-col> -->
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from "@/mixins/page.js";
import newBarChart from "@/components/charts/new_bar_chart";
import newLineChart from "@/components/charts/new_line_chart";
import stackedHorizontalBarChart from "@/components/charts/stacked_horizontal_bar_chart";
import div_label from "@/components/div_label.vue";
export default {
  mixins: [mixin],
  name: "Home",
  components: {
    newBarChart,
    newLineChart,
    stackedHorizontalBarChart,
    div_label,
  },
  data() {
    return {
      activeName: "third",
      line_obj_attraction_reservation: {
        names: [],
        xAxis: [],
        values: [],
      },
      attractionCitiesMap: {},
      bar_obj_homestay_reservation: {
        names: [],
        xAxis: [],
        values: [],
      },
      bar_obj_product_exchange: {
        names: [],
        xAxis: [],
        values: [],
      },
      url_user_count: "~/api/user/count?",
      url_article_hits: "~/api/article/sum?field=hits",
    };
  },
  created() {
    // 执行景点预约数据获取
    this.get_list_attraction_reservation();
    // 执行民宿预约数据获取
    this.get_list_homestay_reservation();
    // 执行商品兑换数据获取
    this.get_list_product_exchange();
  },
  mounted() {},
  methods: {
    async get_nickname(list, flag) {
      if (flag) {
        for (let i = 0; i < list.length; i++) {
          await this.$get(
            "~/api/user/get_obj?user_id=" + list[i],
            null,
            (json) => {
              if (json.result) {
                list[i] = json.result.obj.nickname;
              }
            }
          );
        }
      } else {
        for (let i = 0; i < list.length; i++) {
          await this.$get(
            "~/api/user/get_obj?user_id=" + list[i].name,
            null,
            (json) => {
              if (json.result) {
                list[i].name = json.result.obj.nickname;
              }
            }
          );
        }
      }
    },
    // 获取景点预约统计图数据
    async get_list_attraction_reservation() {
      let group_by_value = "attraction_name";
      let data = {};
      let flag = false;
      let user_group = this.$store.state.user.user_group;
      let user_id = this.$store.state.user.user_id;
      if (user_group != "管理员") {
        let sqlwhere = "(";
        if (user_group == "普通用户") {
          sqlwhere += "regular_users = " + user_id + " or ";
        }
        if (sqlwhere.length > 1) {
          sqlwhere = sqlwhere.substr(0, sqlwhere.length - 4);
          sqlwhere += ")";
          data.sqlwhere = sqlwhere;
        }
      }
      await this.$get(
        "~/api/attraction_reservation/get_list?groupby=" + group_by_value,
        data,
        (json) => {
          if (json.result) {
            let list = json.result.list;
            let name_list = [];
            for (let i = 0; i < list.length; i++) {
              name_list.push(list[i].attraction_name);
            }
            list.forEach((item) => {
              const city = item.attraction_cities;
              const name = item.attraction_name;
              // 如果当前城市不存在于统计对象中，则创建一个空数组
              if (!this.attractionCitiesMap[city]) {
                this.attractionCitiesMap[city] = [];
              }
              // 如果当前景点名称不存在于当前城市的数组中，则添加到数组中
              if (!this.attractionCitiesMap[city].includes(name)) {
                this.attractionCitiesMap[city].push(name);
              }
            });
            this.line_obj_attraction_reservation.names = name_list;
            this.get_list_attraction_reservation_sub("attraction_name", flag);
          }
        }
      );
    },
    async get_list_attraction_reservation_sub(v1, names_flag) {
      let data = {};
      let flag = false;
      let user_group = this.$store.state.user.user_group;
      let user_id = this.$store.state.user.user_id;
      if (user_group != "管理员") {
        let sqlwhere = "(";
        if (user_group == "普通用户") {
          sqlwhere += "regular_users = " + user_id + " or ";
        }
        if (sqlwhere.length > 1) {
          sqlwhere = sqlwhere.substr(0, sqlwhere.length - 4);
          sqlwhere += ")";
          data.sqlwhere = sqlwhere;
        }
      }
      await this.$get(
        "~/api/attraction_reservation/get_list?groupby=appointment_time",
        data,
        (json) => {
          if (json.result) {
            let list = json.result.list;
            let xAxis_list = [];
            for (let i = 0; i < list.length; i++) {
              xAxis_list.push(
                this.$toTime(list[i].appointment_time, "yyyy-MM-dd")
              );
            }
            this.line_obj_attraction_reservation.xAxis = xAxis_list;
            this.get_list_attraction_reservation_sub_sub(
              v1,
              "appointment_time",
              names_flag,
              flag
            );
          }
        }
      );
    },
    async get_list_attraction_reservation_sub_sub(
      v1,
      v2,
      names_flag,
      xAxis_flag
    ) {
      let data_str = '{"' + v1 + '":"","' + v2 + '":""}';
      let data = JSON.parse(data_str);
      let user_group = this.$store.state.user.user_group;
      let user_id = this.$store.state.user.user_id;
      if (user_group != "管理员") {
        let sqlwhere = "(";
        if (user_group == "普通用户") {
          sqlwhere += "regular_users = " + user_id + " or ";
        }
        if (sqlwhere.length > 1) {
          sqlwhere = sqlwhere.substr(0, sqlwhere.length - 4);
          sqlwhere += ")";
          data.sqlwhere = sqlwhere;
        }
      }
      for (
        let i = 0;
        i < this.line_obj_attraction_reservation.xAxis.length;
        i++
      ) {
        let list = [];
        for (
          let j = 0;
          j < this.line_obj_attraction_reservation.names.length;
          j++
        ) {
          data[v2] = this.line_obj_attraction_reservation.xAxis[i];
          data[v1] = this.line_obj_attraction_reservation.names[j];
          await this.$get(
            "~/api/attraction_reservation/sum?field=number_of_reservations",
            data,
            (json) => {
              if (json.result) {
                list[j] = json.result;
              } else {
                list[j] = 0;
              }
            }
          );
        }
        this.line_obj_attraction_reservation.values.push(list);
      }
      console.log(
        this.line_obj_attraction_reservation,
        JSON.parse(JSON.stringify(this.line_obj_attraction_reservation)),
        this.attractionCitiesMap,
        "最终数据"
      );
      setTimeout(() => {
        const citydata = JSON.parse(
          JSON.stringify(this.line_obj_attraction_reservation)
        );

        const citiesMapping = {
          九江市: [],
          上饶市: [],
          南昌市: [],
        };

        // 根据市名将景点数据进行分组
        citydata.names.forEach((attraction, index) => {
          const city = citydata.xAxis[index];
          if (citiesMapping[city]) {
            citiesMapping[city].push({
              name: attraction,
              values: citydata.values[index],
            });
          }
        });

        // 将分组后的数据按照提供的市名顺序组成新的数据结构
        const groupedData = Object.keys(citiesMapping).map((city) => ({
          city,
          attractions: citiesMapping[city],
        }));

        console.log(groupedData);
      }, 1000);

      if (names_flag) {
        this.get_nickname(this.line_obj_attraction_reservation.names, true);
      }
      if (xAxis_flag) {
        this.get_nickname(this.line_obj_attraction_reservation.xAxis, true);
      }
    },
    // 获取民宿预约统计图
    async get_list_homestay_reservation() {
      let name_list = [];
      let query_str = "";
      let group_by_value = "homestay_room_type";
      let flag = false;
      let date_flag = "其他";
      name_list.push("预约数量");
      query_str = query_str + "appointment_quantity" + ",";
      this.bar_obj_homestay_reservation.names = name_list;
      query_str = query_str.substr(0, query_str.length - 1);
      let data = {};
      let user_group = this.$store.state.user.user_group;
      let user_id = this.$store.state.user.user_id;
      if (user_group != "管理员") {
        let sqlwhere = "(";
        if (user_group == "普通用户") {
          sqlwhere += "regular_users = " + user_id + " or ";
        }
        if (sqlwhere.length > 1) {
          sqlwhere = sqlwhere.substr(0, sqlwhere.length - 4);
          sqlwhere += ")";
          data.sqlwhere = sqlwhere;
        }
      }
      await this.$get(
        "~/api/homestay_reservation/bar_group?field=" +
          query_str +
          "&groupby=" +
          group_by_value,
        data,
        (json) => {
          if (json.result) {
            let xAxis = [];
            let values = [];
            json.result.list.map((o) => {
              if (date_flag === "日期") {
                xAxis.push(this.$toTime(o[0], "yyyy-MM-dd"));
              } else if (date_flag === "时间") {
                xAxis.push(this.$toTime(o[0], "hh:mm:ss"));
              } else if (date_flag === "日长") {
                xAxis.push(this.$toTime(o[0], "yyyy-MM-dd hh:mm:ss"));
              } else {
                xAxis.push(o[0]);
              }
              values.push(o.splice(1));
            });
            this.bar_obj_homestay_reservation.xAxis = xAxis;
            this.bar_obj_homestay_reservation.values = values;
          }
          if (flag) {
            this.get_nickname(this.bar_obj_homestay_reservation.xAxis, true);
          }
        }
      );
    },
    // 获取商品兑换统计图
    async get_list_product_exchange() {
      let name_list = [];
      let query_str = "";
      let group_by_value = "product_type";
      let flag = false;
      let date_flag = "其他";
      name_list.push("兑换数量");
      query_str = query_str + "exchange_quantity" + ",";
      this.bar_obj_product_exchange.names = name_list;
      query_str = query_str.substr(0, query_str.length - 1);
      let data = {};
      let user_group = this.$store.state.user.user_group;
      let user_id = this.$store.state.user.user_id;
      if (user_group != "管理员") {
        let sqlwhere = "(";
        if (user_group == "普通用户") {
          sqlwhere += "regular_users = " + user_id + " or ";
        }
        if (sqlwhere.length > 1) {
          sqlwhere = sqlwhere.substr(0, sqlwhere.length - 4);
          sqlwhere += ")";
          data.sqlwhere = sqlwhere;
        }
      }
      await this.$get(
        "~/api/product_exchange/bar_group?field=" +
          query_str +
          "&groupby=" +
          group_by_value,
        data,
        (json) => {
          if (json.result) {
            let xAxis = [];
            let values = [];
            json.result.list.map((o) => {
              if (date_flag === "日期") {
                xAxis.push(this.$toTime(o[0], "yyyy-MM-dd"));
              } else if (date_flag === "时间") {
                xAxis.push(this.$toTime(o[0], "hh:mm:ss"));
              } else if (date_flag === "日长") {
                xAxis.push(this.$toTime(o[0], "yyyy-MM-dd hh:mm:ss"));
              } else {
                xAxis.push(o[0]);
              }
              values.push(o.splice(1));
            });
            this.bar_obj_product_exchange.xAxis = xAxis;
            this.bar_obj_product_exchange.values = values;
          }
          if (flag) {
            this.get_nickname(this.bar_obj_product_exchange.xAxis, true);
          }
        }
      );
    },
  },
  computed: {
    recognitionHeight() {
      return "830px";
    },
    recognitionUrl() {
      return "https://www.faceplusplus.com.cn/${model.filter.recognitionType}/";
    },
  },
};
</script>

<style scoped="scoped">
.chart {
  display: block;
  width: 100%;
  height: 400px;
  padding: 1rem;
  position: relative;
}

.el-col {
  padding: 0.5rem;
}

.card {
  overflow: hidden;
}

.iframe_box,
.iframe_box_change {
  width: 100%;
  height: 1180px;
  position: relative;
  margin-top: 25px;
}
.iframe_box_change {
  height: 580px;
  padding-top: 50px;
}
.iframe_box .iframe_box_content,
.iframe_box_change .iframe_box_content {
  width: 100%;
  height: 100%;
}
.iframe_box_top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  font-size: 25px;
  line-height: 100px;
  background: #fff;
  z-index: 99999999;
  padding-left: 50px;
}
#iframe_box_face div::before {
  content: "";
  width: 100px;
  position: absolute;
  top: 154px;
  right: 129px;
  z-index: 999;
  height: 20px;
  background-color: #ffffff;
}

#iframe_box_face > h1 {
  margin-top: 100px;
  margin-bottom: 20px;
}
</style>
