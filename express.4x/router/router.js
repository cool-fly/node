//挂载在路由上的分路由模块 入口->模块 路由级中间件
const express=require('express');
const router=express.Router();
router.use((req,res,next)=>{
	console.log(new Date())
	next();
});
router.get('/li/:id',(req,res,next)=>{
	console.log(req.url);
	next();   
})
router.get('/li/:id',(req,res,next)=>{
	console.log(req.params)
    res.send('li')
})
router.get('/indexd',(req,res)=>{
    res.send('li')
});
module.exports=router;