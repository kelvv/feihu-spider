### 如何运行？
```
node spiders/gamer
```
爬取gamer.com.tw文章列表，获取文章入口，爬取文章内容，解析文章数据  
将整理好的数据通过接口传给后端保存，并且将文章ID保存到本地MongoDB，避免重复爬取
图片需求，将列表图片，文章图片下载上传至国内CDN，图片有时会防盗链，速度慢
爬虫部署到服务器，暂定每隔一小时爬取一次

### 项目结构
backend 后台管理接口，与爬虫无关  
config 爬虫配置文件  
gamer gamer.com.tw文章解析工具  
mongo MongoDB辅助工具  
official 公众号下载YouTube视频工具，与爬虫无关  
spiders 爬虫入口，目前仅包含gamer.com.tw一个爬虫入口  
test 测试爬虫内容，修改文字ID后，仅爬取一篇文章  
utils 工具函数文件夹
# feihu-spider
