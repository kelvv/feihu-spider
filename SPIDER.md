### 文章数据结构
thumbnail 缩略图 type为1为空字符串 type为2包含一张图片  
title 标题  
type 文章类型 1 => 无图模式 2 => 单图模式  
source 页面链接url  
content 文章内容  
publishedAt 文章发表时间  
images 文章所有图片url列表  
authorId 文章作者在小程序后台id，巴哈姆特对应为1，固定值  
tagIds 文章分类，根据文章详情下分类图标获取

### Content内容解析
```
{
  type: 'text',
  content: ['《妖怪手表》在游戏、动画与玩具还有漫画等平台造成空前绝后的风潮，至今仍有死忠粉丝爱戴。']
}
```
普通段落内容，type为text，content为数组，数组内没一项为一个换行，可能一个段落会有换行
```
{
  type: 'img',
  src: 'https://p2.bahamut.com.tw/M/2KU/60/2fe9bd2885c5f86d3d1f3df0c615ek05.JPG',
  desc: '面对强敌时，使用属性有利的伙伴来挑战吧。提升等级、强化武器与防具，基本攻略大法非常重要',
  width: 640,
  height: 380
}
```
图片内容，type为img，src为图片地址，desc为图片下的描述，width图片宽度，height图片高度
```
{
  type: 'title',
  content: ['活动奖励']
}
```
标题内容，除type为其他和段落内容相同
```
{
  type: 'ul',
  content: ['【六星】对所有敌人造成 60% 攻击伤害，每回合额外造成 28% 流血伤害，持续 3 回合，并对游侠类目标每回合伤害增加 64%。\n对所有敌人造成 75% 攻击伤害，每回合额外造成 42% 流血伤害，持续 3 回合，并对游侠类目标每回合伤害增加 64%。']
}
```
无序列表，type为ul，content内容每一项为一个列表内容，之前没有这样的数据结构，这次优化加上，要对上面的\n做处理，根据这个拆分列表内容
