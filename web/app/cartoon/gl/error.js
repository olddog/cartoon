var Error = {
  'zh_CN': {
    'signup': {
      e_signup_success: {
        code: 100000,
        msg : '主银，恭喜您注册成功。'
      },
      e_signup_fail: {
        code: 100001,
        msg : '就尼玛不许服务器出点问题呀'
      },
      e_signup_miss_params: {
        code: 100002,
        msg : '装B遭雷劈'
      },
      e_signup_miss_params: {
        code: 100003,
        msg : '这破名字也有人用过了'
      },
      e_signup_exception: {
        code: 100004,
        msg : '异常咧'
      }   
    },
    'login': {
      e_login_success: {
        code: 100010,
        msg: '主银，欢迎回来'
      },
      e_login_fail: {
        code: 100011,
        msg: '你这货不是主银'      
      },
      e_login_miss_params: {
        code: 100012,
        msg: '你这货的屏幕有问题吧'      
      },
      e_login_exception: {
        code: 100013,
        msg : '异常咧'
      },
      e_login_multi_users: {
        code: 100014,
        msg : '你是双胞胎么'
      }  
    }
  }
}
exports.Error =  Error;