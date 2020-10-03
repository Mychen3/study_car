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
      <div class="content-btnleft"><Input search enter-button placeholder="手机号查询" @on-search="cellphone "/></div>
      <div class="content-btnleft"><Input search enter-button placeholder="姓名查询" @on-search="queryName"/></div>
      <div class="content-btnleft"><Input search enter-button placeholder="科目查询" @on-search="subJect"/></div>

    </div>
    <!--表格-->
    <div class="content-table">
      <Table border :columns="columns" :data="Databeas.rows" :height="tableHeight" ref="table">
        <template slot-scope="{row}" slot="sex">
          <span v-show="row.student_sex === 0"><Icon type="ios-man" size="20" color="DeepSkyBlue"/></span>
          <span v-show="row.student_sex === 1"><Icon type="md-woman" size="23" color="HotPink"/></span>
        </template>
        <template slot-scope="{row}" slot="cost">
          <span v-show="row.student_cost === 0"><Icon type="ios-checkmark-circle" size="20" color="LimeGreen"/></span>
          <span v-show="row.student_cost === 1"><Icon type="ios-close-circle" size="20" color="Crimson"/></span>
        </template>
      </Table>
    </div>
    <!--分页-->
    <div class="content-page">
      <Page :total="count" :current="current" @on-change="handleSizeChange" show-total show-sizer
            @on-page-size-change="pagechange"/>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tableHeight: 545,
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
            align: 'center',
            width: '200px'
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
            align: 'center',
            width: '150px'
          },
          {
            title: '家庭地址',
            key: 'student_site',
            align: 'center',
            width: '200px'
          },
          {
            title: '工作单位',
            key: 'student_work',
            align: 'center',
            width: '200px'
          },
          {
            title: '入档时间',
            key: 'student_time',
            align: 'center',
            width: '130px'
          },
          {
            title: '费用缴纳',
            key: 'student_cost',
            align: 'center',
            slot:'cost',
            width: '100px'
          },
          {
            title: '性别',
            key: 'student_sex',
            align: 'center',
            slot: 'sex',
            width: '80px'
          }
        ],
        Databeas: [],
      }
    },
    methods: {
      pagechange (newpage) {
        this.pagesize = newpage
        this.getDatalist()
      },
      // 关闭模态框
      closeA () {
        this.modal1 = false
        this.$refs.ValidateRef.resetFields()

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
      // 分页事件
      handleSizeChange (newcurrent) {
        this.current = newcurrent
        this.getDatalist()
      },

      // 手机号查询
      async cellphone (value) {
        if (!value) {
          this.$Message.error('请输入手机号')
        } else {
          let Databeas = await this.$axios.get('student', {
            params: {
              student_phone: value
            }
          })
          if (Databeas.status == 200) {
            this.Databeas = Databeas.data
            this.count = this.Databeas.rows.length
          }
        }
      },
      // 姓名查询
      async queryName (value) {
        if (!value) {
          this.$Message.error('请输入姓名')
        } else {
          let Databeas = await this.$axios.get('student', {
            params: {
              student_name: value
            }
          })
          if (Databeas.status == 200) {
            this.Databeas = Databeas.data
            this.count = this.Databeas.rows.length
          }
        }
      },
      // 科目查询
      async subJect (value) {
        if (!value) {
          this.$Message.error('请输入科目')
        } else {
          let Databeas = await this.$axios.get('student', {
            params: {
              student_schedule: value
            }
          })
          if (Databeas.status == 200) {
            this.Databeas = Databeas.data
            this.count = this.Databeas.rows.length
          }
        }
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
    display: flex;
    margin-bottom: 5px;
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

  .content-btnleft {
    margin-left: 20px;
  }

</style>
