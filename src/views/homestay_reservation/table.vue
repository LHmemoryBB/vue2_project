<template>
  <el-main class="bg table_wrap comtabel_t">
    <el-form
      label-position="right"
      :model="query"
      class="form p_4"
      label-width="120"
    >
      <el-row class="rows row1">
        <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
          <el-form-item label="民宿名称">
            <el-input v-model="query.homestay_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
          <el-form-item label="民宿地址">
            <el-input v-model="query.homestay_address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
          <el-form-item label="民宿房型">
            <el-input v-model="query.homestay_room_type"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
          <el-form-item label="用户姓名">
            <el-input v-model="query.user_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
          <el-form-item label="支付状态">
            <el-select v-model="query.pay_state">
              <el-option value="">全部</el-option>
              <el-option value="未支付">未支付</el-option>
              <el-option value="已支付">已支付</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="rows row2">
        <el-col :xs="24" :sm="24" :lg="24" class="search_btn_wrap search_btns">
          <el-col
            :xs="24"
            :sm="10"
            :lg="8"
            class="search_btn_1 search_btn_wrap_1 btns"
          >
            <el-button type="primary" @click="search()" class="search_btn_find"
              >查询</el-button
            >
            <el-button
              @click="reset()"
              style="margin-right: 74px"
              class="search_btn_reset"
              >重置</el-button
            >

            <el-button
              v-if="
                user_group == '管理员' ||
                $check_action('/homestay_reservation/table', 'del') ||
                $check_action('/homestay_reservation/view', 'del')
              "
              class="search_btn_del"
              type="danger"
              @click="delInfo()"
              >删除</el-button
            >
          </el-col>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="list"
      @selection-change="selectionChange"
      @sort-change="$sortChange"
      style="width: 100%"
      id="dataTable"
    >
      <el-table-column fixed type="selection" tooltip-effect="dark" width="55">
      </el-table-column>
      <el-table-column
        prop="homestay_name"
        @sort-change="$sortChange"
        label="民宿名称"
        v-if="user_group == '管理员' || $check_field('get', 'homestay_name')"
        min-width="200"
      >
      </el-table-column>
      <el-table-column
        prop="homestay_address"
        @sort-change="$sortChange"
        label="民宿地址"
        v-if="user_group == '管理员' || $check_field('get', 'homestay_address')"
        min-width="200"
      >
      </el-table-column>
      <el-table-column
        prop="homestay_room_type"
        @sort-change="$sortChange"
        label="民宿房型"
        v-if="
          user_group == '管理员' || $check_field('get', 'homestay_room_type')
        "
        min-width="200"
      >
      </el-table-column>
      <el-table-column
        prop="homestay_prices"
        @sort-change="$sortChange"
        label="民宿价格"
        v-if="user_group == '管理员' || $check_field('get', 'homestay_prices')"
        min-width="200"
      >
      </el-table-column>
      <el-table-column
        prop="regular_users"
        @sort-change="$sortChange"
        label="普通用户"
        v-if="user_group == '管理员' || $check_field('get', 'regular_users')"
        min-width="200"
      >
        <template slot-scope="scope">
          {{ get_user_regular_users(scope.row["regular_users"]) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="user_name"
        @sort-change="$sortChange"
        label="用户姓名"
        v-if="user_group == '管理员' || $check_field('get', 'user_name')"
        min-width="200"
      >
      </el-table-column>
      <el-table-column
        prop="appointment_quantity"
        @sort-change="$sortChange"
        label="预约数量"
        v-if="
          user_group == '管理员' || $check_field('get', 'appointment_quantity')
        "
        min-width="200"
      >
      </el-table-column>
      <el-table-column
        prop="appointment_days"
        @sort-change="$sortChange"
        label="预约天数"
        v-if="user_group == '管理员' || $check_field('get', 'appointment_days')"
        min-width="200"
      >
      </el-table-column>
      <el-table-column
        prop="appointment_time"
        @sort-change="$sortChange"
        label="预约时间"
        v-if="user_group == '管理员' || $check_field('get', 'appointment_time')"
        min-width="200"
      >
        <template slot-scope="scope">
          {{ $toTime(scope.row["appointment_time"], "yyyy-MM-dd hh:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="appointment_amount"
        @sort-change="$sortChange"
        label="预约金额"
        v-if="
          user_group == '管理员' || $check_field('get', 'appointment_amount')
        "
        min-width="200"
      >
      </el-table-column>
      <el-table-column
        prop="appointment_remarks"
        @sort-change="$sortChange"
        label="预约备注"
        v-if="
          user_group == '管理员' || $check_field('get', 'appointment_remarks')
        "
        min-width="200"
      >
      </el-table-column>

      <el-table-column label="支付状态" prop="pay_state"> </el-table-column>

      <el-table-column
        sortable
        prop="create_time"
        label="创建时间"
        min-width="200"
      >
        <template slot-scope="scope">
          {{ $toTime(scope.row["create_time"], "yyyy-MM-dd hh:mm:ss") }}
        </template>
      </el-table-column>

      <el-table-column
        sortable
        prop="update_time"
        label="更新时间"
        min-width="200"
      >
        <template slot-scope="scope">
          {{ $toTime(scope.row["update_time"], "yyyy-MM-dd hh:mm:ss") }}
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        min-width="200"
        v-if="
          user_group == '管理员' ||
          $check_action('/homestay_reservation/table', 'set') ||
          $check_action('/homestay_reservation/view', 'set') ||
          $check_action('/homestay_reservation/view', 'get') ||
          $check_action('/申请退款/table', 'add') ||
          $check_action('/申请退款/view', 'add')
        "
      >
        <template slot-scope="scope">
          <div class="view_a">
            <router-link
              class="e-button el-button--small is-plain el-button--success"
              style="margin: 5px !important"
              v-if="
                user_group == '管理员' ||
                $check_action('/homestay_reservation/table', 'set') ||
                $check_action('/homestay_reservation/view', 'set') ||
                $check_action('/homestay_reservation/view', 'get')
              "
              :to="'./view?' + field + '=' + scope.row[field]"
              size="small"
            >
              <span>详情</span>
            </router-link>
            <!--跨表按钮-->
            <!-- <el-button
              class="e-button el-button--small is-plain el-button--default"
              style="margin: 5px !important"
              size="small"
              @click="to_table(scope.row, '/refunds_for_homestays/view')"
              v-if="
                user_group == '管理员' ||
                $check_action('/refunds_for_homestays/table', 'add') ||
                $check_action('/refunds_for_homestays/view', 'add')
              "
            >
              <span>申请退款</span>
            </el-button> -->
            <el-button
              class="el-button el-button--small is-plain el-button--default"
              style="margin: 5px !important"
              size="small"
              @click="openPayModal(scope.row)"
              v-if="
                scope.row.pay_state === '未支付' &&
                (user_group == '管理员' ||
                  $check_pay('/homestay_reservation/table'))
              "
            >
              <span>支付</span>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <div class="mt text_center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.page"
        :page-sizes="[7, 10, 30, 100]"
        :page-size="query.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
    </div>
    <!-- /分页器 -->

    <el-dialog title="沙箱支付" :visible.sync="payModalVisible" width="500px">
      <div style="width: 80%; margin: 0 auto">
        <div style="width: 60%; margin: 30px auto">
          <el-image style="width: 100%" :src="pay_qrcode">
            <div slot="error" class="image-slot">
              <img
                src="../../../public/img/error.png"
                style="width: 90px; height: 90px"
              />
            </div>
          </el-image>
        </div>
        <div style="width: 80%; margin: 0 auto">
          <div
            style="
              width: 100%;
              background-color: #409eff;
              color: white;
              font-size: 14px;
              text-align: center;
              line-height: 40px;
              cursor: pointer;
            "
            @click="submitPay()"
          >
            确认支付
          </div>
        </div>
      </div>
    </el-dialog>

    <div class="modal_wrap" v-if="showModal">
      <div class="modal_box">
        <!-- <div class="modal_box_close" @click="closeModal">X</div> -->
        <p class="modal_box_title">重要提醒</p>
        <p class="modal_box_text">当前有数据达到预警值！</p>
        <div class="btn_box">
          <span @click="closeModal">取消</span>
          <span @click="closeModal">确定</span>
        </div>
      </div>
    </div>
  </el-main>
</template>
<script>
import mixin from "@/mixins/page.js";

export default {
  mixins: [mixin],
  data() {
    return {
      // 弹框
      showModal: false,
      // 获取数据地址
      url_get_list: "~/api/homestay_reservation/get_list?like=0",
      url_del: "~/api/homestay_reservation/del?",

      // 字段ID
      field: "homestay_reservation_id",

      // 查询
      query: {
        size: 7,
        page: 1,
        homestay_name: "",
        homestay_address: "",
        homestay_room_type: "",
        user_name: "",
        pay_state: "",
        login_time: "",
        create_time: "",
        orderby: `create_time desc`,
      },

      // 数据
      list: [],
      payModalVisible: false,
      pay_obj: {
        id: "",
      },
      pay_qrcode: "",
      // 用户列表
      list_user_regular_users: [],
    };
  },
  methods: {
    // 关闭弹框
    closeModal() {
      this.showModal = false;
    },

    get_list_before(param) {
      var user_group = this.user.user_group;
      if (user_group != "管理员") {
        let sqlwhere = "(";
        if (user_group == "普通用户") {
          sqlwhere += "regular_users = " + this.user.user_id + " or ";
        }
        if (sqlwhere.length > 1) {
          sqlwhere = sqlwhere.substr(0, sqlwhere.length - 4);
          sqlwhere += ")";
          param["sqlwhere"] = sqlwhere;
        }
      }
      return param;
    },

    /**
     * 获取普通用户用户列表
     */
    async get_list_user_regular_users() {
      var json = await this.$get("~/api/user/get_list?user_group=普通用户");
      if (json.result && json.result.list) {
        this.list_user_regular_users = json.result.list;
      } else if (json.error) {
        console.error(json.error);
      }
    },

    get_user_regular_users(id) {
      var obj = this.list_user_regular_users.getObj({ user_id: id });
      var ret = "";
      if (obj) {
        ret = obj.nickname + "-" + obj.username;
        // if(obj.nickname){
        // 	ret = obj.nickname;
        // }
        // else{
        // 	ret = obj.username;
        // }
      }
      return ret;
    },
    openPayModal(v) {
      this.pay_obj.id = v.homestay_reservation_id;
      this.payModalVisible = true;
      let goods_name = v.homestay_name;
      let pay_money = v.appointment_amount;
      this.$get(
        "~/api/homestay_reservation/alipay?goods_name=" +
          goods_name +
          "&pay_money=" +
          pay_money,
        {},
        (json) => {
          if (json.result) {
            this.pay_qrcode =
              "https://api.mhjz1.cn/qr/?size=250&text=" + json.result;
            this.payModalVisible = true;
          } else if (json.error) {
            console.error(json.error);
          }
        }
      );
    },
    submitPay() {
      let _this = this;
      let url = this.$toUrl(
        this.query,
        "~/api/homestay_reservation/set?homestay_reservation_id=" +
          this.pay_obj.id
      );
      let param = { pay_state: "已支付" };
      this.$post(url, param, function (json, status) {
        console.log("提交结果：", json);
        if (json.result) {
          _this.$toast("支付成功！", "success");
          _this.payModalVisible = false;
          _this.get_list();
        } else if (json.error) {
          _this.$toast(json.error.message, "danger");
        }
      });
    },
  },
  created() {
    this.get_list_user_regular_users();
  },
};
</script>

<style type="text/css">
.bg {
  background: white;
}

.form.p_4 {
  padding: 1rem;
}

.form .el-input {
  width: initial;
}

.mt {
  margin-top: 1rem;
}

.text_center {
  text-align: center;
}

.float-right {
  float: right;
}

.modal_wrap {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999999999;
}
.modal_wrap .modal_box {
  width: 400px;
  height: 200px;
  background: url("../../assets/modal_bg.jpg") no-repeat center;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -100px;
  border-radius: 10px;
}
.modal_wrap .modal_box .modal_box_close {
  font-size: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.modal_wrap .modal_box .modal_box_title {
  text-align: center;
  font-size: 18px;
  margin: 16px auto;
  color: #fff;
  border-bottom: 1px solid rgba(117, 116, 116, 0.5);
  padding-bottom: 16px;
  width: 356px;
}
.modal_wrap .modal_box .modal_box_text {
  text-align: center;
  font-size: 15px;
  color: #fff;
  margin-top: 25px;
}
.modal_wrap .modal_box .btn_box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 42px;
}
.modal_wrap .modal_box .btn_box span {
  display: inline-block;
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #ccc;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
}
.modal_wrap .modal_box .btn_box span:nth-child(2) {
  background: #409eff;
  color: #fff;
  border-color: #409eff;
  margin-left: 15px;
}
</style>
