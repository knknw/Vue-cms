


<template>
  <!--这是vue组件模板的页面 主要存放组件渲染的页面代码
    应为顶部和底部不变所以直接用组件渲染出来,中间是根据底部按钮改变的,所以
    用路由做相应的切换
   -->
  <div class="app-conpen">
  
  
    <!-- 顶部Header区域 -->
    <mt-header fixed title="固定在顶部"></mt-header>
    <!-- 中间路由router-view区域 -->

    <h1>123</h1>
    <!-- 底部Tabbar区域 -->
    <nav class="mui-bar mui-bar-tab">
			<a class="mui-tab-item mui-active" href="#tabbar">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-chat">
				<span class="mui-icon mui-icon-email"><span class="mui-badge">9</span></span>
				<span class="mui-tab-label">消息</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-contact">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">通讯录</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-map">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">设置</span>
			</a>
		</nav>
     
  </div>
</template>

<script>

</script>

<style lang="less" scoped>
  .app-conpen{
    padding: 40px 0;
  }
</style>

