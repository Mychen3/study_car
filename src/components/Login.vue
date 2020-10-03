<template>
  <div class="login_components">
    <div class="login_box1">
      <div class="fonts"><h2>后台管理系统</h2></div>
      <Form class="login_from" ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="80">
        <FormItem label="账号" prop="user_name">
          <Input v-model="formItem.user_name" placeholder="请输入账号"></Input>
        </FormItem>
        <FormItem label="密码" prop="user_passwrod">
          <Input v-model="formItem.user_passwrod" placeholder="请输入密码" type="password"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" class="but" style="width: 100px" @click="getUserlist">登入</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        formItem: {
          user_name: '97491530',
          user_passwrod: '97491530'
        },
        ruleValidate: {
          user_name: [
            {
              require: true,
              message: '请输入正确的账号',
              trigger: 'blur'
            }],
          user_passwrod: [
            {
              require: true,
              message: '请输入正确的密码',
              trigger: 'blur'
            },
            {
              type: 'string',
              min: 3,
              max: 15,
              message: '密码长度不能少于6位,大于15位',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      getUserlist () {
        //  存储this的指向
        let _this = this
        // 预验证
        this.$refs.formValidate.validate(valid => {
          if (!valid) return
          this.$axios.post('user', this.formItem).then(function (res) {
            console.log(res)
            if (res.data.meta.status == 200) {
              // 保存token
              window.sessionStorage.setItem('token', res.data.data.UUID)
              // 也保存name
              window.sessionStorage.setItem('name', res.data.data.name)
              _this.$Message.success('登入成功')
              _this.$router.push('/home')
            }
          }).catch(function (err) {
            console.log(err)
            _this.$Message.error('登入失败，请检查账号密码')
          })
        })
      }
    }
  }
</script>
<style scoped lang="less">
  .login_components {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("../assets/c1.jpg");
    background-size: 100% 100%;
    //字体抗锯齿
    -webkit-font-smoothing: antialiased
  }

  .login_box1 {
    width: 380px;
    height: 260px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 6px 6px 5px #888888;
  }

  .login_from {

    position: relative;
    box-sizing: border-box;
    top: 60px;
    right: 20px;
  }

  .but {
    position: relative;
    left: 80px;
  }

  .fonts {
    position: relative;
    left: 130px;
    top: 30px;


  }

</style>
