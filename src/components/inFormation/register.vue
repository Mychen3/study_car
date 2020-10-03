<template>
  <div class="content">
    <!--头部-->
    <div>
      <Breadcrumb class="content1">
        <BreadcrumbItem to="/user">
          <Icon type="md-home"/>
          主页
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="md-contact"/>
          学员登记
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--按钮-->
    <div class="content-btn">
      <Button type="success" long @click="btn">
        <Icon type="md-add"/>
        添加学员
      </Button>
    </div>
    <!--表格-->
    <div class="content-table">
      <Table border :columns="columns" :data="Databeas.rows" :height="tableHeight" ref="table">
        <template slot-scope="{row}" slot="sex">
          <span v-show="row.student_sex === 0"><Icon type="ios-man" size="20" color="DeepSkyBlue"/></span>
          <span v-show="row.student_sex === 1"><Icon type="md-woman" size="23" color="HotPink"/></span>
        </template>
      </Table>
    </div>
    <!--分页-->
    <div class="content-page">
      <Page :total="count" :current="current" @on-change="handleSizeChange" show-total show-sizer @on-page-size-change="pagechange"/>
    </div>
    <!-- 模态框-->
    <Modal v-model="modal1" ref="modelRef" footer-hide width="800px">
      <div class="Modal-content"><h3>添加学员</h3></div>
      <div>
        <Divider/>
      </div>
      <Form ref="ValidateRef" :model="AddList" :rules="dataRules" :label-width="80" style="margin-top: 20px">
        <div class="Modal-content1">
          <FormItem label="姓名：" prop="student_name">
            <Input v-model="AddList.student_name" placeholder="请输入您的姓名" style="width: 230px;"></Input>
          </FormItem>
          <FormItem label="身份证：" prop="student_card">
            <Input v-model="AddList.student_card" placeholder="身份证" class="input-add"></Input>
          </FormItem>
        </div>
        <div class="Modal-content1">
          <FormItem label="手机号：" prop="student_phone">
            <Input v-model="AddList.student_phone" placeholder="请输入手机号" style="width: 230px;"></Input>
          </FormItem>
          <FormItem label="进度：" prop="student_schedule">
            <Select style="width:230px" class="input-add" v-model="AddList.student_schedule">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label}}</Option>
            </Select>
          </FormItem>
        </div>
        <div class="Modal-content1">
          <FormItem label="微信号：" prop="student_WeChat">
            <Input v-model="AddList.student_WeChat" placeholder="请输入微信号" style="width: 230px;"></Input>
          </FormItem>
          <FormItem label="性别：" prop="student_sex">
            <RadioGroup v-model="AddList.student_sex" style="width:230px" class="input-add">
              <Radio label="0">
                <span>男：</span>
                <Icon type="ios-man" size="20" color="DeepSkyBlue"/>
              </Radio>
              <Radio label="1">
                <span>女：</span>
                <Icon type="md-woman" size="23" color="HotPink"/>
              </Radio>
            </RadioGroup>
          </FormItem>
        </div>
        <div class="Modal-content1">
          <FormItem label="住址：" prop="student_site">
            <Input v-model="AddList.student_site" placeholder="请输入家庭住址" style="width: 230px;"></Input>
          </FormItem>
          <FormItem label="费用：" prop="student_cost">
            <RadioGroup v-model="AddList.student_cost" class="input-add">
              <Radio label="0">
                <span>已交费：</span>
                <Icon type="ios-checkmark-circle" size="20" color="LimeGreen"/>
              </Radio>
              <Radio label="1">
                <span>未交费：</span>
                <Icon type="ios-close-circle" size="20" color="Crimson"/>
              </Radio>
            </RadioGroup>
          </FormItem>
        </div>
        <div class="Modal-content1">
          <FormItem label="单位：" prop="student_work">
            <Input v-model="AddList.student_work" placeholder="请输入工作单位" style="width: 230px"></Input>
          </FormItem>
        </div>
        <div>
          <Divider/>
        </div>
        <div class="Modal-content1">
          <FormItem>
            <Button type="primary" style="width: 230px;" @click="AddQuery">确认添加</Button>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="closeA" style="width: 230px; margin-right:80px">取消添加</Button>
          </FormItem>
        </div>
      </Form>
    </Modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tableHeight:545,
        modal1: false,
        // 页码
        current: 1,
        // 分页条数
        pagesize: 10,
        // 分页总数
        count: null,
        columns: [
          {
            title: '序号',
            type: 'index',
            align: 'center',
            width: '70px'
          },
          {
            title: '姓名',
            key: 'student_name',
            align: 'center',
            width: '130px'
          },
          {
            title: '手机号',
            key: 'student_phone',
            align: 'center',
            width: '150px'
          },
          {
            title: '身份证',
            key: 'student_card',
            align: 'center'
          },
          {
            title: '学车进度',
            key: 'student_schedule',
            align: 'center',
            width: '100px'
          },
          {
            title: '微信号',
            key: 'student_WeChat',
            align: 'center'
          },
          {
            title: '家庭地址',
            key: 'student_site',
            align: 'center'
          },
          {
            title: '工作单位',
            key: 'student_work',
            align: 'center'
          },
          {
            title: '性别',
            key: 'student_sex',
            align: 'center',
            slot: 'sex',
            width: '100px'
          }
        ],
        Databeas: [],
        cityList: [
          {
            value: '科目一',
            label: '科目一'
          },
          {
            value: '科目二',
            label: '科目二'
          },
          {
            value: '科目三',
            label: '科目三'
          },
          {
            value: '科目四',
            label: '科目四'
          },
        ],
          dataRules: {
            student_name: [
              {
                required: true,
                message: '请输入账号',
              },
            ],
            student_card: [
              {
                required: true,
                message: '请输入身份证',
                trigger: 'blur',
              },
              {
                max: 18,
                min: 18,
                message: '请输入正确18位身份证',
                trigger: 'blur'
              }
            ],
            student_phone: [
              {
                required: true,
                message: '请输入手机号',
                trigger: 'blur'
              },
              {

                max: 11,
                min: 11,
                message: '请输入正确11位手机号',
                trigger: 'blur'
              }
            ],
            student_schedule: [
              {
                required: true,
                message: '请选择学车进度',
                trigger: 'blur'
              },
              {
                max: 10,
                min: 0,
                message: '请选择学车进度',
                trigger: 'blur'
              }
            ],
            student_WeChat: [
              {
                required: true,
                message: '请输入微信号',
                trigger: 'blur'
              },
              {

                max: 20,
                min: 0,
                message: '微信号最大20位',
                trigger: 'blur'
              }
            ],
            student_sex: [
              {
                required: true,
                message: '请选择性别',
                trigger: 'blur'
              },
              {

                max: 5,
                min: 0,
                message: '请选择性别',
                trigger: 'blur'
              }
            ],
            student_site: [
              {
                required: true,
                message: '请输入家庭地址',
                trigger: 'blur'
              },
              {

                max: 30,
                min: 0,
                message: '家庭地址最大30位',
                trigger: 'blur'
              }
            ],
            student_cost: [
              {
                required: true,
                message: '请选择是否交费',
                trigger: 'blur'
              },
              {

                max: 5,
                min: 0,
                message: '请选择是否交费',
                trigger: 'blur'
              }
            ],
            student_work: [
              {
                required: true,
                message: '请输入单位',
                trigger: 'blur'
              },
              {

                max: 20,
                min: 0,
                message: '单位最大20位',
                trigger: 'blur'
              }
            ]
          },
        AddList: {
          student_name: '',
          student_phone: '',
          student_card: '',
          student_schedule: '',
          student_time: new Date(),
          student_cost: '',
          student_sex: '',
          student_WeChat: '',
          student_site: '',
          student_work: '',
        },
      }
    },
    methods: {
      pagechange(newpage){
        this.pagesize = newpage
        this.getDatalist()
      },
      // 关闭模态框
      closeA () {
        this.modal1 = false
        this.$refs.ValidateRef.resetFields();

      },
      btn () {
        this.modal1 = true
      },
      async getDatalist () {
        const Databess = await this.$axios.get('student', {
          params: {
            index: this.pagesize,
            Num: this.current
          }
        })
        if (Databess.status == 200) {
          this.Databeas = Databess.data.data
          this.count = this.Databeas.count
        }
      },
      // 确认添加
      AddQuery () {

        this.$refs.ValidateRef.validate(async valid => {
          if (!valid) return
          let datalist = await this.$axios.post('Addstudent', this.AddList)
          if (datalist.data.status == 200) {
            this.$Message.success('添加成功')
            this.$refs.ValidateRef.resetFields();
            this.modal1 = false
          }
        })
      },
      // 分页事件
      handleSizeChange (newcurrent) {
        this.current = newcurrent
        this.getDatalist()
      },


    },
    created () {
      this.getDatalist()
    },
    mounted () {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 60
      //window.innerHeight是浏览器可用高度，this.$refs.table.$el.offsetTop是表格距离浏览器可用高度顶部的距离
    },
    // watch:{
    //   modal1(newValue,oldValue){
    //     if(!newValue){
    //       this.$refs.ValidateRef.resetFields();
    //     }
    //   }
    // }
  }
</script>

<style scoped lang="less">

  .content {
    width: 100%;
    height: 100%;
  }

  .content1 {
    padding-top: 10px;
    padding-left: 15px;
    height: 35px;
    display: flex;
  }

  .content-btn {
    // 上 右 下 左
    margin: 2px 20px 10px 20px;

    // 边框阴影
    box-shadow: 3px 3px 3px #888888;
    border-radius: 8px;
  }

  .content-table {
    margin-left: 20px;
    margin-right: 20px;
  }

  .content-page {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .Modal-content {
    display: flex;
    justify-content: center;
    margin-right: 20px;
  }

  .Modal-content1 {
    display: flex;
    justify-content: space-between;
  }

  .input-add {
    width: 230px;
    margin-right: 50px
  }

</style>
