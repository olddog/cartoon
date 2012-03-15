/**
 * 服务器配置
 */
 
// 注意： 
// 此配置文件可能会被多次载入，如在程序中有进行其他一些初始化操作，需要自己判断  
 
module.exports = {

  /* Worker进程数量 0表示自动设置为CPU个数 */
  'cluster':    1,
  
  /* 监听的端口 可同时监听多个端口，例如： [80, 81, 82] */
  'listen http':  [8080],
  
  
  /* 管理界面配置 */
  'master': {
    'port':       8850,           // 监听端口
    'host':       '127.0.0.1',    // 监听地址，设置为0.0.0.0时可以从任何主机访问
    'admin':      'admin',        // 账户
    'password':   'admin'         // 密码
  },
  
  
  /* 更新服务器状态 */
  'status update': {
  
    /* 请求状态统计 */
    'connector':        10000,    // 更新请求统计周期（单位：毫秒），默认为10秒
    'connector size':   200,      // 历史请求统计数据个数，默认为200个
    
    /* 资源占用统计 */
    'load line':        10000,    // 更新系统资源占用周期（单位：毫秒），默认为10秒
    'load line size':   60,       // 系统资源占用数据个数，默认为60个
  },
  
  
  /* 记录的进程异常信息数量，默认为50个 */
  'exception log size': 50,
  
  
  /*
  // onExtend插件， 扩展request, response对象之后，执行路由处理程序之前
  // 如需要对扩展后的request和response实例进行进一步的处理，可在此处执行
  'onExtend': function (req, res) {
    console.log(new Date().toUTCString() + ' ' + req.method + ' ' + req.url);
  },
  */
  
  
  /*
  // onRequest插件，在接收到请求，准备处理之前，所有的请求都会经过此处进行处理
  // 中间件可在此处执行  第一个参数为扩展后的request实例，第二个参数为扩展后的response实例
  // 第三个参数为一个函数，仅当调用此函数时，程序的控制权才会交由QuickWeb Connector来进行路由处理
  'onRequest': function (req, res, next) {
    res.setHeader('Date', new Date().toUTCString());
    next();
  }
  */
}
