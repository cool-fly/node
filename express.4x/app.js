// 应用级
const express=require('express');
const bodyParser=require('body-parser');
const router=require('./router/router');
const fs=require('fs');
const app=express();
const admin=express();
const indexData={
	name:'lisong',
	ulList:[0,1,2,3,4]
}
//中间件
//
//
app.use(express.static('public'));
app.use('/index',router);
app.use('/admin',admin);
app.use(bodyParser.urlencoded({ extended: false }));
//登入获取session_key
app.use('/login',(req,res,next)=>{
       console.log(req)
})

//options设置
//
//
app.set('views','./views'),
app.set('view engine','ejs')
// 
// 
admin.get('/',(req,res,next)=>{
	//console.log(admin.mountpath)//子应用的挂载路径
	res.render('index',indexData)
});
//事件
admin.on('mount',(app)=>{
	console.log(app)
})
//设置自己的模板引擎
app.engine('li',(path,options,callback)=>{
	fs.readFile(path,(err,content)=>{
		if(err) return callback(new Error(err));
		var text=content.toString().replace(/{{(\w+)}}/,(macth,$1)=>{
			return indexData[$1]
		})
		return callback(null,text)
	})


})
// 方法
app.param('id', function (req, res, next, id) {//为参数注册回调函数
  console.log('CALLED ONLY ONCE');
  next();
})
app.get('/user/:id', function (req, res, next) {
  console.log('although this matches');
  next();
});

app.get('/user/:id', function (req, res) {
  console.log('and this matches too');
  res.end();
});
// 
// 
app.listen(8000,()=>{
	console.log('111');
	console.log(app.locals)//set设置项
})