<template>
  <el-main class="bg edit_wrap comtable_e">
    <el-form
      ref="form"
      :model="form"
      status-icon
      label-width="120px"
      v-if="is_view()"
    >
      <el-row class="row_ce">
        <el-col
          v-if="
            user_group === '管理员' ||
            $check_field('get', 'attraction_name') ||
            $check_field('add', 'attraction_name') ||
            $check_field('set', 'attraction_name')
          "
          :xs="24"
          :sm="12"
          :lg="8"
          class="el_form_item_warp"
        >
          <el-form-item label="景点名称" prop="attraction_name">
            <el-input
              id="attraction_name"
              v-model="form['attraction_name']"
              placeholder="请输入景点名称"
              v-if="
                user_group === '管理员' ||
                (form['attraction_information_id'] &&
                  $check_field('set', 'attraction_name')) ||
                (!form['attraction_information_id'] &&
                  $check_field('add', 'attraction_name'))
              "
              :disabled="disabledObj['attraction_name_isDisabled']"
            ></el-input>
            <div v-else-if="$check_field('get', 'attraction_name')">
              {{ form["attraction_name"] }}
            </div>
          </el-form-item>
        </el-col>
        <el-col
          v-if="
            user_group === '管理员' ||
            $check_field('get', 'types_of_attractions') ||
            $check_field('add', 'types_of_attractions') ||
            $check_field('set', 'types_of_attractions')
          "
          :xs="24"
          :sm="12"
          :lg="8"
          class="el_form_item_warp"
        >
          <el-form-item label="景点类型" prop="types_of_attractions">
            <el-select
              id="types_of_attractions"
              v-model="form['types_of_attractions']"
              v-if="
                user_group === '管理员' ||
                (form['attraction_information_id'] &&
                  $check_field('set', 'types_of_attractions')) ||
                (!form['attraction_information_id'] &&
                  $check_field('add', 'types_of_attractions'))
              "
            >
              <el-option
                v-for="o in list_types_of_attractions"
                :key="o['types_of_attractions']"
                :label="o['types_of_attractions']"
                :value="o['types_of_attractions']"
              ></el-option>
            </el-select>
            <div v-else-if="$check_field('get', 'types_of_attractions')">
              {{ form["types_of_attractions"] }}
            </div>
          </el-form-item>
        </el-col>
        <el-col
          v-if="
            user_group === '管理员' ||
            $check_field('get', 'attraction_cities') ||
            $check_field('add', 'attraction_cities') ||
            $check_field('set', 'attraction_cities')
          "
          :xs="24"
          :sm="12"
          :lg="8"
          class="el_form_item_warp"
        >
          <el-form-item label="景点城市" prop="attraction_cities">
            <el-input
              id="attraction_cities"
              v-model="form['attraction_cities']"
              placeholder="请输入景点城市"
              v-if="
                user_group === '管理员' ||
                (form['attraction_information_id'] &&
                  $check_field('set', 'attraction_cities')) ||
                (!form['attraction_information_id'] &&
                  $check_field('add', 'attraction_cities'))
              "
              :disabled="disabledObj['attraction_cities_isDisabled']"
            ></el-input>
            <div v-else-if="$check_field('get', 'attraction_cities')">
              {{ form["attraction_cities"] }}
            </div>
          </el-form-item>
        </el-col>
        <el-col
          v-if="
            user_group === '管理员' ||
            $check_field('get', 'attraction_address') ||
            $check_field('add', 'attraction_address') ||
            $check_field('set', 'attraction_address')
          "
          :xs="24"
          :sm="12"
          :lg="8"
          class="el_form_item_warp"
        >
          <el-form-item label="景点地址" prop="attraction_address">
            <el-input
              id="attraction_address"
              v-model="form['attraction_address']"
              placeholder="请输入景点地址"
              v-if="
                user_group === '管理员' ||
                (form['attraction_information_id'] &&
                  $check_field('set', 'attraction_address')) ||
                (!form['attraction_information_id'] &&
                  $check_field('add', 'attraction_address'))
              "
              :disabled="disabledObj['attraction_address_isDisabled']"
            ></el-input>
            <div v-else-if="$check_field('get', 'attraction_address')">
              {{ form["attraction_address"] }}
            </div>
          </el-form-item>
        </el-col>
        <el-col
          v-if="
            user_group === '管理员' ||
            $check_field('get', 'admission_price') ||
            $check_field('add', 'admission_price') ||
            $check_field('set', 'admission_price')
          "
          :xs="24"
          :sm="12"
          :lg="8"
          class="el_form_item_warp"
        >
          <el-form-item label="门票价格" prop="admission_price">
            <el-input-number
              id="admission_price"
              v-model.number="form['admission_price']"
              v-if="
                user_group === '管理员' ||
                (form['attraction_information_id'] &&
                  $check_field('set', 'admission_price')) ||
                (!form['attraction_information_id'] &&
                  $check_field('add', 'admission_price'))
              "
              :disabled="disabledObj['admission_price_isDisabled']"
            ></el-input-number>
            <div v-else-if="$check_field('get', 'admission_price')">
              {{ form["admission_price"] }}
            </div>
          </el-form-item>
        </el-col>
        <el-col
          v-if="
            user_group === '管理员' ||
            $check_field('get', 'opening_hours') ||
            $check_field('add', 'opening_hours') ||
            $check_field('set', 'opening_hours')
          "
          :xs="24"
          :sm="12"
          :lg="8"
          class="el_form_item_warp"
        >
          <el-form-item label="开放时间" prop="opening_hours">
            <el-input
              id="opening_hours"
              v-model="form['opening_hours']"
              placeholder="请输入开放时间"
              v-if="
                user_group === '管理员' ||
                (form['attraction_information_id'] &&
                  $check_field('set', 'opening_hours')) ||
                (!form['attraction_information_id'] &&
                  $check_field('add', 'opening_hours'))
              "
              :disabled="disabledObj['opening_hours_isDisabled']"
            ></el-input>
            <div v-else-if="$check_field('get', 'opening_hours')">
              {{ form["opening_hours"] }}
            </div>
          </el-form-item>
        </el-col>
        <el-col
          v-if="
            user_group === '管理员' ||
            $check_field('get', 'map_link') ||
            $check_field('add', 'map_link') ||
            $check_field('set', 'map_link')
          "
          :xs="24"
          :sm="12"
          :lg="8"
          class="el_form_item_warp"
        >
          <el-form-item label="地图链接" prop="map_link">
            <el-input
              id="map_link"
              v-model="form['map_link']"
              placeholder="请输入地图链接"
              v-if="
                user_group === '管理员' ||
                (form['attraction_information_id'] &&
                  $check_field('set', 'map_link')) ||
                (!form['attraction_information_id'] &&
                  $check_field('add', 'map_link'))
              "
              :disabled="disabledObj['map_link_isDisabled']"
            ></el-input>
            <div v-else-if="$check_field('get', 'map_link')">
              {{ form["map_link"] }}
            </div>
          </el-form-item>
        </el-col>
        <el-col
          v-if="
            user_group === '管理员' ||
            $check_field('get', 'appointment_points') ||
            $check_field('add', 'appointment_points') ||
            $check_field('set', 'appointment_points')
          "
          :xs="24"
          :sm="12"
          :lg="8"
          class="el_form_item_warp"
        >
          <el-form-item label="预约积分" prop="appointment_points">
            <el-input-number
              id="appointment_points"
              v-model.number="form['appointment_points']"
              v-if="
                user_group === '管理员' ||
                (form['attraction_information_id'] &&
                  $check_field('set', 'appointment_points')) ||
                (!form['attraction_information_id'] &&
                  $check_field('add', 'appointment_points'))
              "
              :disabled="disabledObj['appointment_points_isDisabled']"
            ></el-input-number>
            <div v-else-if="$check_field('get', 'appointment_points')">
              {{ form["appointment_points"] }}
            </div>
          </el-form-item>
        </el-col>
        <el-col
          v-if="
            user_group === '管理员' ||
            $check_field('get', 'appointment_points') ||
            $check_field('add', 'appointment_points') ||
            $check_field('set', 'appointment_points')
          "
          :xs="24"
          :sm="12"
          :lg="8"
          class="el_form_item_warp"
        >
          <el-form-item label="设置预约时间" prop="appointment_points">
            <el-button
              id="appointment_points"
              v-if="
                user_group === '管理员' ||
                (form['attraction_information_id'] &&
                  $check_field('set', 'appointment_points')) ||
                (!form['attraction_information_id'] &&
                  $check_field('add', 'appointment_points'))
              "
              :disabled="disabledObj['appointment_points_isDisabled']"
              @click="openSetTimeDialog = true"
              icon="el-icon-setting"
            ></el-button>
            <div v-else-if="$check_field('get', 'appointment_points')">
              {{ form["appointment_points"] }}
            </div>
          </el-form-item>
        </el-col>
        <el-col
          v-if="
            user_group === '管理员' ||
            $check_field('get', 'tourist_attraction_routes') ||
            $check_field('add', 'tourist_attraction_routes') ||
            $check_field('set', 'tourist_attraction_routes')
          "
          :xs="24"
          :sm="12"
          :lg="8"
          class="el_form_item_warp"
        >
          <el-form-item label="景点路线" prop="tourist_attraction_routes">
            <el-input
              type="textarea"
              id="tourist_attraction_routes"
              v-model="form['tourist_attraction_routes']"
              placeholder="请输入景点路线"
              v-if="
                user_group === '管理员' ||
                (form['attraction_information_id'] &&
                  $check_field('set', 'tourist_attraction_routes')) ||
                (!form['attraction_information_id'] &&
                  $check_field('add', 'tourist_attraction_routes'))
              "
              :disabled="disabledObj['tourist_attraction_routes_isDisabled']"
            ></el-input>
            <div v-else-if="$check_field('get', 'tourist_attraction_routes')">
              {{ form["tourist_attraction_routes"] }}
            </div>
          </el-form-item>
        </el-col>
        <el-col
          v-if="
            user_group === '管理员' ||
            $check_field('get', 'cover_photo') ||
            $check_field('add', 'cover_photo') ||
            $check_field('set', 'cover_photo')
          "
          :xs="24"
          :sm="12"
          :lg="8"
          class="el_form_item_warp"
        >
          <el-form-item label="封面图片" prop="cover_photo">
            <el-upload
              :disabled="disabledObj['cover_photo_isDisabled']"
              id="cover_photo"
              class="avatar-uploader"
              drag
              accept="image/gif, image/jpeg, image/png, image/jpg"
              action
              :http-request="upload_cover_photo"
              :show-file-list="false"
              v-if="
                user_group === '管理员' ||
                (form['attraction_information_id'] &&
                  $check_field('set', 'cover_photo')) ||
                (!form['attraction_information_id'] &&
                  $check_field('add', 'cover_photo'))
              "
            >
              <img
                v-if="form['cover_photo']"
                :src="$fullUrl(form['cover_photo'])"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-image
              v-else-if="$check_field('get', 'cover_photo')"
              style="width: 100px; height: 100px"
              :src="$fullUrl(form['cover_photo'])"
              :preview-src-list="[$fullUrl(form['cover_photo'])]"
            >
              <div slot="error" class="image-slot">
                <img
                  src="../../../public/img/error.png"
                  style="width: 90px; height: 90px"
                />
              </div>
            </el-image>
          </el-form-item>
        </el-col>

        <el-col
          v-if="
            user_group === '管理员' ||
            $check_field('get', 'introduction_to_scenic_spots') ||
            $check_field('add', 'introduction_to_scenic_spots') ||
            $check_field('set', 'introduction_to_scenic_spots')
          "
          :xs="24"
          :sm="24"
          :lg="24"
          class="el_form_editor_warp"
        >
          <el-form-item label="景点简介" prop="introduction_to_scenic_spots">
            <quill-editor
              v-model.number="form['introduction_to_scenic_spots']"
              v-if="
                user_group === '管理员' ||
                (form['attraction_information_id'] &&
                  $check_field('set', 'introduction_to_scenic_spots')) ||
                (!form['attraction_information_id'] &&
                  $check_field('add', 'introduction_to_scenic_spots'))
              "
            ></quill-editor>
            <div
              v-else-if="$check_field('get', 'introduction_to_scenic_spots')"
              v-html="form['introduction_to_scenic_spots']"
            ></div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
        <el-form-item
          v-if="
            $check_action('/attraction_information/view', 'set') ||
            $check_action('/attraction_information/view', 'add') ||
            $check_option('/attraction_information/table', 'examine')
          "
        >
          <el-button type="primary" @click="submit()">提交</el-button>
          <el-button @click="cancel()">取消</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button @click="cancel()">返回</el-button>
        </el-form-item>
      </el-col>
    </el-form>
    <el-dialog title="提示" :visible.sync="openSetTimeDialog" width="30%">
      <!-- <el-form ref="form" :model="time_obj" label-width="120px" :inline="true">
        <el-form-item label="时间段" style="display: flex;" class="time-select-css">
          <el-time-picker
            v-model="time_obj.start_time"
            :picker-options="{
              selectableRange: '18:30:00 - 20:30:00',
            }"
            placeholder="开始时间"
          >
          </el-time-picker>
          <el-time-picker
            arrow-control
            v-model="time_obj.end_time"
            :picker-options="{
              selectableRange: '18:30:00 - 20:30:00',
            }"
            placeholder="结束时间"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="预约上限人数">
          <el-input
            v-model.number="maxPeople"
            placeholder="请输入预约上限人数"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addTimeSlot">添加</el-button>
        </el-form-item>
      </el-form> -->
      <el-form ref="form" label-width="80px">
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-time-picker
              type="date"
              placeholder="开始时间"
              v-model="start_time"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="结束时间"
              v-model="end_time"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="人数上限">
          <el-input v-model="maximum"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addTimeSlot">添加</el-button>
        </el-form-item>
      </el-form>

      <el-divider></el-divider>

      <el-table :data="time_obj" border>
        <el-table-column prop="start_time" label="开始时间"></el-table-column>
        <el-table-column prop="end_time" label="结束时间"></el-table-column>
        <el-table-column
          prop="maximum"
          label="预约上限人数"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="removeTimeSlot(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openSetTimeDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitTime">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import mixin from "@/mixins/page.js";

export default {
  mixins: [mixin],
  data() {
    return {
      field: "attraction_information_id",
      url_add: "~/api/attraction_information/add?",
      url_set: "~/api/attraction_information/set?",
      url_get_obj: "~/api/attraction_information/get_obj?",
      url_upload: "~/api/attraction_information/upload?",
      openSetTimeDialog: false,
      query: {
        attraction_information_id: 0,
      },
      time_obj: [],
      start_time:'',
      end_time: '',
      maximum:'',
      timeSlot: "",
      maxPeople: "",
      delList:[],
      form: {
        attraction_name: "", // 景点名称
        types_of_attractions: "", // 景点类型
        attraction_cities: "", // 景点城市
        attraction_address: "", // 景点地址
        admission_price: 0, // 门票价格
        opening_hours: "", // 开放时间
        map_link: "", // 地图链接
        appointment_points: 0, // 预约积分
        tourist_attraction_routes: "", // 景点路线
        cover_photo: "", // 封面图片
        introduction_to_scenic_spots: "", // 景点简介
        attraction_information_id: 0, // ID
        time_obj:[]
      },
      disabledObj: {
        attraction_name_isDisabled: false,
        types_of_attractions_isDisabled: false,
        attraction_cities_isDisabled: false,
        attraction_address_isDisabled: false,
        admission_price_isDisabled: false,
        opening_hours_isDisabled: false,
        map_link_isDisabled: false,
        appointment_points_isDisabled: false,
        tourist_attraction_routes_isDisabled: false,
        cover_photo_isDisabled: false,
        introduction_to_scenic_spots_isDisabled: false,
      },

      // 景点类型选项列表
      list_types_of_attractions: [""],
    };
  },
  watch:{
    
  },
  methods: {
    /**
     * 获取景点类型列表
     */
    async get_list_types_of_attractions() {
      var json = await this.$get("~/api/types_of_attractions/get_list?");
      if (json.result && json.result.list) {
        this.list_types_of_attractions = json.result.list;
      } else if (json.error) {
        console.error(json.error);
      }
    },
    addTimeSlot() {
      if (this.start_time && this.end_time && this.maximum) {
        this.time_obj.push({
          start_time: this.$dayJs(this.start_time).format('HH:mm:ss'),
          end_time: this.$dayJs(this.end_time).format('HH:mm:ss'),
          maximum: this.maximum
        });
        console.log(this.time_obj);
      } else {
        this.$message.error("请填写完整信息");
      }
    },
    removeTimeSlot(index, row) {
      if (row.time_slots_id) {
        this.delList.push(row)
      }
      this.time_obj.splice(index, 1);
    },
    /**
     * 上传封面图片
     * @param {Object} param 图片参数
     */
    upload_cover_photo(param) {
      this.uploadFile(param.file, "cover_photo");
    },

    /**
     * 获取对象之前
     * @param {Object} param
     */
    get_obj_before(param) {
      var form = "";

      if (this.form && form) {
        Object.keys(this.form).forEach((key) => {
          Object.keys(form).forEach((dbKey) => {
            // if(dbKey === "charging_standard"){
            // 	this.form['charging_rules'] = form[dbKey];
            // 	this.disabledObj['charging_rules_isDisabled'] = true;
            // };
            if (key === dbKey) {
              this.disabledObj[key + "_isDisabled"] = true;
            }
          });
        });
      }
      this.time_obj = this.form.time_obj
      console.log(form,'123123', this.form, '12312312312312');
      $.db.del("form");

      return param;
    },

    /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func) {},

    /**
     * 提交前验证事件
     * @param {Object} 请求参数
     * @return {String} 验证成功返回null, 失败返回错误提示
     */
    submit_check(param) {
      return null;
    },

    is_view() {
      var bl = this.user_group == "管理员";

      if (!bl) {
        bl = this.$check_action("/attraction_information/table", "add");
        console.log(
          bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限"
        );
      }
      if (!bl) {
        bl = this.$check_action("/attraction_information/table", "set");
        console.log(
          bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限"
        );
      }
      if (!bl) {
        bl = this.$check_action("/attraction_information/view", "add");
        console.log(
          bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限"
        );
      }
      if (!bl) {
        bl = this.$check_action("/attraction_information/view", "set");
        console.log(
          bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限"
        );
      }
      if (!bl) {
        bl = this.$check_action("/attraction_information/view", "get");
        console.log(
          bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限"
        );
      }

      console.log(
        bl
          ? "具有当前页面的查看权，请注意这不代表你有字段的查看权"
          : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行"
      );

      return bl;
    },
    /**
     * 上传文件
     * @param {Object} param
     */
    uploadimg(param) {
      this.uploadFile(param.file, "avatar");
    },
    submitTime() {
      
      this.form.time_obj = this.time_obj;
      if (this.form.attraction_information_id) {
        this.form.time_obj.forEach(e =>{
          e.attraction_id = this.form.attraction_information_id
        })
      }
      this.delList.forEach(e =>{
        this.$get(`~/api/attraction_information/delTime?time_slots_id=${e.time_slots_id}`,(res)=>{
          console.log(res);
        })
      })
      this.openSetTimeDialog = false
    },
  },
  created() {
    this.get_list_types_of_attractions();
  },
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

/* // .time-select-css /deep/  */

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
