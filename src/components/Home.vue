<template>
  <div>
    <Layout>
      <Header style="height: 50px" class="Header">
        <div><span class="sname">后台管理系统</span></div>
        <div class="content_exit"><span>您好{{Sname}} </span>
          <span @click="Exit" class="HeaderSpan2">退出</span>
        </div>
      </Header>
      <Layout>
        <Sider hide-trigger>
          <Menu theme="dark" width="auto" accordion>
            <div v-for="(item,i) in dataList" :key="i">
            <Submenu :name="i">
              <template slot="title">
                <Icon :type="iconOBJ[item.type_id]"/>
                <span>{{item.type_Name}}</span>
              </template>
              <MenuItem :name="child.type_path" v-for="child in item.u" @click.native="go(child.type_path)" :key="child.type_path">
                {{child.type_Name1}}
              </MenuItem>
            </Submenu>
            </div>
          </Menu>
        </Sider>
        <Content class="content_div">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        dataList: '',
        Sname: '',
        // 循环测边栏图标 通过ID循环
        iconOBJ: {
          1: 'ios-people',
          5: 'md-card'
        }
      }
    },
    created () {
      this.getquerylist()
      this.Sname = window.sessionStorage.getItem('name')
    },
    methods: {
      //
      go (toName) {
        this.$router.push({
          path: '/' + toName
        })
      },
      Exit () {
        // 清空token
        window.sessionStorage.clear()
        // 跳转
        this.$router.push('login')
      },
      // 查询全部数据列表
      async getquerylist () {
        const res = await this.$axios.get('/type')
        if (res.data.status == 200) {
          this.dataList = res.data.data
          console.log(this.dataList)
        }
      }
    }
  }
</script>

<style scoped lang="less">

  * {
    margin: 0px;
    padding: 0px;
  }
  .content_div{
    width: 100%;
    height: 100%;
  }

  .Header {
    /*background: linear-gradient(45deg, rgba(254, 172, 94, 0.5), rgba(199, 121, 208, 0.5), rgba(75, 192, 200, 0.5));*/
    background-color: #619cf5;
    display: flex;
    /*左右贴边对其*/
    justify-content: space-between;
    padding-left: 20px;
    align-items: center;
    color: #ffffff;
    font-size: 15px;
    font-weight: bolder;
    width: 100%;
  }

  .HeaderSpan {
    font-size: 13px;
  }

  .HeaderSpan2 {
    // 触摸加手
    cursor: pointer;
  }

  .sname {
    position: relative;
    left: 30px;
    font-size: 21px;

  }

  // 测边栏占满
  .ivu-layout {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  .ivu-menu-submenu {
    height: 100%;
    width: 100%;
  }

  .ivu-menu-submenu-title {
    height: 100%;
    width: 100%
  }

  .ivu-table-body {
    height: 100%;
  }

  .ivu-layout-sider {
    width: 100%;
  }

  .content_exit {
    position: relative;
    right: 30px;
  }


</style>
