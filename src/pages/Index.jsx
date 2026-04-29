import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, MapPin, Calendar, ExternalLink, ChevronDown, X, Menu } from 'lucide-react'; // ─── Intersection Observer Hook ───────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      {
        threshold
      }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
} // ─── Data ──────────────────────────────────────────────────────────────────────

const experiences = [
{
  id: 'exp-1',
  company: '美团',
  logo: null,
  role: '核心本地商业-点评事业部 · 产品运营',
  period: '2026.01 – 2026.04',
  location: '南京',
  summary: [
  '数据洞察驱动活动策划：发现南京用户「看必吃榜」环比增长 29%，洞察本地用户对"必"类榜单的高关注度；结合大众点评必吃榜上线时机，策划时令菜品榜单相关线上营销【南京必吃榜限定美食护照】活动。',
  'B 端跨平台合作：推动与滴滴达成合作引入线上打车券，单品牌门店打卡 WAU 提升 1500+；推动瑞幸 610 家门店上线打卡功能，目标完成度达 119%。',
  'C 端社群运营：独立运营千粉达人社群，每周撬动 200–300 位达人参与，周打卡 UV 达 9W+；独立负责「打卡抽免费餐」活动，周均覆盖 4000+ 门店。'],

  highlights: [
  {
    value: '↑32%',
    label: '周打卡功能 WAU 提升'
  },
  {
    value: '9W+',
    label: '周打卡 UV'
  },
  {
    value: '119%',
    label: '合作商户目标完成度'
  },
  {
    value: '1500+',
    label: '单品牌门店打卡 WAU 提升'
  }],

  tools: ['Excel', 'AI Agent', 'Vibe Coding', '数据分析', 'PS', 'H5页面搭建'],
  responsibilities: [
  '数据分析与用户洞察：监测大众点评 WAU 城市贡献与用户核心行为数据，发现 3 月南京用户「看必吃榜」环比增长 29%，洞察本地用户对"必"类榜单的高关注度，据此策划时令菜品榜单相关线上营销活动【南京必吃榜限定美食护照】。',
  'B 端运营：针对小规模商户打卡礼品成本高、人工核销成本高的核心痛点，推动与滴滴达成跨平台合作，引入线上打车券替代线下礼品，降低商户参与门槛；挖掘瑞幸品牌春季资源置换需求，推动瑞幸 610 家门店上线打卡功能，打卡合作商户数目标完成度达 119%。',
  'C 端运营：独立负责站内社群【打卡抽免费餐】活动，定向筛选参与商户，周均覆盖 4000+ 门店；独立运营千粉以上达人社群，每周撬动 200–300 位千粉达人参与活动，周打卡 UV 达 9W+，有效带动 C 端活跃与商户曝光。',
  '活动策划：基于南京城市特点，结合时令节日参与策划大众点评线上线下美食向活动。春节活动「开年走马游园会」、「南京春日生活节」等AOI活动。单个活动招商价值超 9w 元，联动5+大型商圈宣发；活动产生 PV 4w+，UV 5k+，打卡总量 1.7w+。',
  'AI Agent 探索：主动研究美团旗下 CatPaw 等 AI Agent 技术，将日常重复性运营工作创建为个性化 skill 并支持自我迭代；搭建数据看板，实时监控 BD 工作情况与自动化通知；探索 AI 在 C 端用户体验、B 端商户匹配场景及日常工作中的实际落地。'],
  screenshotGroups: [
  {
    label: '用户运营',
    items: [
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/芬妮下-379kjcd3h8mhdlamwmuem3vn8wu4uj.png', alt: '南京用户核心行为分析数据', aspect: 'wide' },
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/复盘-ci7vukz6zmtzmbzpu0q5c8y1m9qzmw.png', alt: '3月打卡激励成本复盘', aspect: 'square' },
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/用户运营-pczvntg866k867qgkmhhtabvotml0o.png', alt: 'C端阶段性动作数据图', aspect: 'wide' },
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/社群-fgjmsgk3gp7rhyphn0esb6ybtx5e8u.png', alt: '打卡有礼社群运营截图', aspect: 'wide' },
    ]
  },
  {
    label: '活动运营',
    items: [
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/221-a22jlybj1rfb541sulfu54qg1afji8.png', alt: '南京春日生活节活动详情', aspect: 'portrait' },
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/开年走马-ug0cv43g262b2i76qqarnmc7ag025x.png', alt: '开年走马游园会活动详情', aspect: 'wide' },
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/玄武湖-nshc9pvzkes7jonnwqwqhthzhsrdy5.png', alt: '南京春日生活节玄武湖现场', aspect: 'portrait' },
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/灵感首长-soqcfupcnwvf9sf8g1akdru6mjzzti.png', alt: '灵感手帐集市活动现场', fit: 'contain' },
    ]
  }]

},
{
  id: 'exp-2',
  company: '博西家用电器（中国）有限公司',
  logo: null,
  role: '西门子品牌部-Siemens Brand Marketing Intern',
  period: '2025.06 – 2025.12',
  location: '南京',
  summary: [
  '全流程跟进西门子品牌营销 Campaign「Homedeco 2026」，协调 Creative Agency、MCN 等多方资源，推动「西门子 × 小红书家生活」「西门子 × 京东超品日」合作落地。',
  '主导 3 家 Creative Agency 比稿，筛选 300 余位 KOL，搭建小红书/抖音达人矩阵，预计共产生 7.1M 互动量。',
  '设计多平台 ROI 评估模型，在职期间全平台累计新增粉丝 16W，品牌社媒互动量提高 34.7%。'],

  highlights: [
  {
    value: '16W',
    label: '全平台新增粉丝'
  },
  {
    value: '+34.7%',
    label: '品牌社媒互动量'
  },
  {
    value: '7.1M',
    label: 'Campaign互动量'
  },
  {
    value: '300+',
    label: '筛选 KOL 数量'
  }],

  tools: ['小红书', '抖音', '数据分析', 'Excel', 'Outlook 自动化'],
  responsibilities: [
  '营销策划：全流程跟进西门子品牌营销 Campaign「Homedeco 2026」，作为品牌方协调 Creative Agency、Product House、MCN 等多方资源；推动「西门子 × 小红书家生活」「西门子 × 京东超品日」合作落地，打通品牌心智—产品种草—消费转化闭环。',
  '达人运营：主导 3 家 Creative Agency 比稿，筛选 300 余位 KOL，搭建小红书/抖音平台达人矩阵；联合设计师「费崎峰」x「Rapheal」产出 AWEx 月影白套系品牌 BGC；预计Campaign共产生 7.1M 互动量。',
  '用户洞察：参与月影白套系上市规划，提炼套系核心卖点"iSensoric"，基于用户洞察产出套系名「北极光套系」；策划 UGC 话题 #双十一长期主义#，单篇小红书笔记阅读量 1.1K，互动率 18.9%。',
  '竞品分析：拆解海尔、美的、老板、卡萨帝等竞品社媒营销策略，策划双十一"预热-爆发-长尾"品牌营销策略，累计阅读量 53K，互动量 4K。',
  '流程优化：统筹各 BU 月度社媒排期，引入 Outlook 自动化提醒机制，提升跨部门协作效率；设计多平台 ROI 评估模型，在职期间全平台累计新增粉丝 16W，品牌社媒互动量提高 34.7%。'],
  screenshotGroups: [
  {
    label: '营销策划',
    items: [
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/1-6bl5039p8pc9c8w88ap8upxc6xxwfk.png', alt: 'Homedeco Campaign 策划', aspect: 'wide' },
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/2-ylu9k75jeipzyn6a4km2fgtwj3v6an.png', alt: '精智生活 Campaign Rollout', aspect: 'wide' },
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/3-dz81x3hvcohsc70vttr1ot69qoderz.png', alt: '月影白套系设计师访谈视频', aspect: 'wide' },
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/4-snlzhvlsaux49kysyben26atq1ygpz.png', alt: 'D11 Brand Content Strategy', fit: 'contain' },
    ]
  },
  {
    label: '竞品分析',
    items: [
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/5-4cqkzwy8pby2b4xb4ezukfmd29sl8b.png', alt: '东芝珍珠套系竞品分析', aspect: 'wide' },
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/6-13drup8suomav6cg6z8uts0vlokwil.png', alt: '海尔小红花套系竞品分析', aspect: 'wide' },
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/7-euo048xv5njkxyxkafwagym9kpexmy.png', alt: 'Colmo社媒账号策略竞品分析', aspect: 'wide' },
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/8-0whcojmybaf2aln5n7f9e8pfhyjwnu.png', alt: 'Casarte社媒账号策略竞品分析', aspect: 'wide' },
    ]
  },
  {
    label: '数据分析',
    items: [
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/11-p8y3fj05ghm95y4rggl96rwdwroymv.png', alt: 'Social Platform Decoding', ratio: '4/3' },
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/12-3aczqq444227dmnamnhtya77fdaxjn.png', alt: 'Information Collection Channel', ratio: '4/3' },
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/9-uvwe4dezymvisyy30vda57l8el1w4j.png', alt: 'Wechat Data Comperation', aspect: 'wide' },
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/10-iryvaao3xo7g985cb6ugakrw7ko3fd.png', alt: 'Brand Social Data for 2025', aspect: 'wide' },
    ]
  },
  {
    label: 'KOL运营',
    items: [
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/15-1ojk1wpoivfz5m8raz2lsykcw39htt.png', alt: 'KOL Matrix AWE探展', aspect: 'wide' },
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/16-wxhrf7ob49zdw7uy06byk86wauf7po.png', alt: 'KOL content type', aspect: 'wide' },
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/13-nfwsltonprd95fap6yw6jb403vkz36.png', alt: '达人策略258W', aspect: 'wide' },
      { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/14-qjxgqsqvqi61usr91vqgsweyk9focf.png', alt: '美食类KOL内容方向', aspect: 'wide' },
    ]
  }]

},
{
  id: 'exp-3',
  company: '孩子王儿童用品股份有限公司',
  logo: null,
  role: '整网频道运营实习生 · 数字化产品运营中心',
  period: '2025.03 – 2025.06',
  location: '南京',
  summary: ['负责「六一童玩节」全流程运营，包括微信公众号推文制作、主图海报设计对接。', '营销活动数据监控，追踪 DAU/MAU 等交易数据，建立拼券、拼红包玩法规则，针对性调整资源位配置。'],
  highlights: [
  {
    value: 'DAU/MAU',
    label: '核心数据追踪'
  },
  {
    value: '多渠道',
    label: '营销活动管理'
  }],

  tools: ['数据分析', '微信公众号', 'PS', 'Excel'],
  responsibilities: [
  '社媒运营：负责「六一童玩节」全流程运营，包括「孩子王微商城」微信公众号推文制作、主图海报设计对接。',
  '数据分析：营销活动数据监控，追踪 DAU/MAU 等交易数据，完善营销互动策略，建立拼券、拼红包玩法规则，针对调整资源位配置。',
  '平台维护：对接品类负责人征集素材，维护乐友 APP 首页及孩子王 APP 资源位；管理多渠道营销活动，按等级推进执行。']

},
{
  id: 'exp-4',
  company: 'International Child Art Foundation',
  logo: null,
  role: '整合营销实习生',
  period: '2022.12 – 2023.03',
  location: '远程',
  summary: ['协助巴黎奥运会儿童艺术宣传活动推广与策划，管理 Instagram、Facebook、Twitter 等官方账号，累计制作海报 2 份、推文 5 篇，收获阅读量 6K+。', '协助 ICAF 与心和公益基金会、上海美术馆对接，将 ICAF 慈善项目推广至中国内地，促成 3 份合同落地。'],
  highlights: [
  {
    value: '6K+',
    label: '内容阅读量'
  },
  {
    value: '3份',
    label: '合同落地'
  }],

  tools: ['Instagram', 'Facebook', 'Twitter', '内容创作'],
  responsibilities: [
  '整合营销：协助巴黎奥运会儿童艺术宣传活动推广与策划，协助管理该组织的 Instagram、Facebook、Twitter 等官方账号，为 ICAF 的中国社交媒体频道撰稿，累计制作海报 2 份，推文 5 篇，收获阅读量 6K+。',
  '网站重建：参与重建 International Child Art Olympiad 主题活动网站，供活动参赛者进行艺术创作。',
  '资源协调：协助 ICAF 与心和公益基金会、上海美术馆对接，将 ICAF 慈善项目推广宣传至中国内地，促成 3 份合同落地。']

}];


const projects = [
{
  id: 'proj-2',
  name: '南京春日生活节 · 线上线下美食活动',
  description: '联动 5+ 大型商圈，单个活动招商价值超 9w 元，活动产生 PV 4w+、UV 5k+、打卡总量 1.7w+。',
  tags: ['活动策划', '商业化', '线下联动', '大众点评'],
  cover: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/主kv-8pm9uxta8pvkoesfg8lqsu3bv4j43n.png',
  role: '主要参与',
  period: '2026.03 – 2026.04',
  background: '基于南京城市洞察，发现南京用户「新鲜发现」满意度低于大盘 9.7pp，而南京拥有丰富且密集的线下市集/活动资源。结合春季时令节日（3.18–4.05），策划大众点评线上线下联动的「南京春日生活节」，通过权益置换撬动商户资源，打造具有城市特色的春日营销事件，提升大众点评在南京市场的品牌影响力与用户活跃度，同时补足用户新鲜发现满意度缺口。',
  work: [
    '城市洞察与选题：监测南京 WAU 数据，发现 W13-W14 打卡贡献环比增速显著高于大盘，赏樱踏青带动用户活跃；结合搜索词数据（鸡鸣寺、玄武湖、金陵天地等关键词连续升势），确定春日生活节选题方向。',
    '活动策划与玩法设计：设计「打卡地图」玩法——打卡 2 个活动地点领取德基艺术博物馆明信片，打卡 5 个地点领取限定毛绒花；设计「邀请助力」玩法——邀请 3 位朋友助力必得无门槛餐券/奶茶，210 份拼手速抢；制定完整活动 Rundown，统筹 H5 设计上线、线下物料制作、宣发达人招募等全流程节点。',
    '商务招商与资源置换：联动艾尚天地（灵感手帐集市）、玄武湖公园（还有生活节）、德基艺术博物馆、金陵天地（南京首场面包节）、城北万象汇（甜莓大会）5 大商圈/场馆；引入蛋魂、回味鸭血粉丝、山下奶市等品牌合作，置换奖品总价值超 9w 元。',
    '线上宣发执行：配置话题页、泛搜卡、站内信、官号发文等站内资源位；招募达人撰写全攻略推文，露出「官方城市合作伙伴」title；制作线下 KT 板物料（60×90cm），在各商圈展位露出活动玩法与品牌 logo。',
    '数据监控与复盘：全程跟进活动执行，实时监控 PV/UV/打卡量等核心数据指标；活动期间 W14 打卡贡献环比 +14.5%，显著高于大盘 +9.7%，清明假期出行用户增多，城市做功策略持续发力。',
  ],
  results: [
    { value: '9w+', label: '招商价值' },
    { value: '4w+', label: '活动 PV' },
    { value: '5k+', label: '活动 UV' },
    { value: '1.7w+', label: '打卡总量' },
    { value: '5+', label: '联动商圈/场馆' },
    { value: '+14.5%', label: 'W14 打卡贡献环比' },
  ],
  venues: [
    { name: '艾尚天地', event: '灵感手帐集市南京站 4.0', desc: '3.27–3.29，120 家原创摊位，特邀人气插画师「尖角帽」现场签绘' },
    { name: '玄武湖公园', event: '还有生活节', desc: '赏樱踏青，逛湖畔市集（3.20–3.22 / 3.27–3.29）' },
    { name: '德基艺术博物馆', event: '室内花朝盛会', desc: '百余位大师花卉真迹，共赴一场室内花朝盛会' },
    { name: '金陵天地', event: '南京首场面包节', desc: '80+ 宝藏网红面包品牌，85% 外地品牌，2000+ 面包免费领，免票入场' },
    { name: '城北万象汇', event: '甜莓大会', desc: '4.3–4.6，南京首届草莓主题市集，50+ 全国人气品牌，1000 份福利限时派送' },
  ],
  gameplays: [
    { title: '打卡地图', desc: '打卡 2 个活动地点，即可领取德基艺术博物馆明信片 1 张；打卡 5 个活动地点，即可领取花花世界毛绒花 1 支（奖品数量有限，领完即止）' },
    { title: '邀请助力', desc: '邀请 3 位朋友助力，必得无门槛餐券/奶茶，210 份拼手速抢！' },
    { title: '扫码打卡抽奖', desc: '扫码打卡活动地点，立即抽「春日好礼」，100% 中奖' },
  ],
  screenshotGroups: [
    {
      label: '活动物料',
      items: [
        { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/点评账号-q4hglhk5s9hp03e3kivfdwfgh355dy.jpg', alt: '点评账号宣发截图', aspect: 'portrait' },
        { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/泛搜-hig5vyng7vgbncfd8nzjqqqfi98qcc.jpg', alt: '泛搜卡资源位配置', aspect: 'portrait' },
        { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/微博-cgkoov9n6shwx4xsd7ldfdm45b1gsf.jpg', alt: '微博宣发文案', aspect: 'wide' },
        { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/后-nprun2iw80trjc73u74rpx0f6wrkut.png', alt: '活动 H5 落地页', aspect: 'portrait' },
      ]
    }
  ],
  github: '',
  figma: ''
},
{
  id: 'proj-5',
  name: '西门子 Homedeco 2026 营销 Campaign',
  description: '主导西门子「北极光」套系年度品牌 Campaign，预算规模 9M，Campaign 执行期间行业 SOV 达行业 TOP1，KOL 内容累计曝光 700 万+。',
  tags: ['品牌营销', '达人运营', 'KOL 矩阵', 'Campaign 策略'],
  cover: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/17-k7uiapkdkcydn1n7p27u0kadbsy9vx.png',
  role: '团队（参与执行）',
  period: '2025.10 – 2026.03',
  background: '2026 年 3 月，西门子家电围绕「北极光」套系新品上市，发起年度重点品牌 Campaign。项目以「极智从容 生活有光」为核心传播主题，预算规模 9M，覆盖 AWE 家电展、春季家装季两大节点，整合线上 KOL 种草、线下展会曝光与品牌内容共创，旨在强化西门子高端厨电套系的品牌心智，并在家电行业竞争激烈的 Q1 节点实现声量破圈。',
  work: [
    'Campaign 策略统筹与代理商管理：主导 Campaign 整体策略规划，对接 DareToo、MINDVIEW 两家创意代理商并组织提案评审，最终确定由 DareToo 以「北极光」套系为核心创意方向落地执行，统筹创意、媒介、KOL 各条线协同推进。',
    '创意内容开发与把控：参与「北极光」套系核心创意的开发与审核，推动设计师访谈视频脚本的策划与制作（月影白套系设计师访谈），将产品设计理念转化为消费者可感知的品牌故事，强化套系高端调性。',
    'KOL 矩阵策略制定与执行管理：制定 AWE 展及春季家装季双节点 KOL 投放策略，搭建覆盖头腰尾部的达人矩阵，统筹达人执行手册的制定与落地，确保内容方向与品牌调性一致，实现高效种草与声量扩散。',
    '节点整合营销执行：协调 AWE 家电展品牌曝光与春季家装季（预算 258W）两大营销节点的资源整合，制定各阶段执行节奏，保障 Campaign 在关键时间窗口的集中爆发。',
  ],
  results: [
    { value: 'TOP1', label: '家电行业 SOV 排名' },
    { value: '700万+', label: 'KOL 内容曝光量' },
    { value: '9M', label: 'Campaign 预算规模' },
    { value: '258W', label: '家装季专项预算' },
    { value: '2', label: '创意代理商管理' },
    { value: 'AWE+家装季', label: '双节点整合营销' },
  ],
  screenshotGroups: [
    {
      label: 'Campaign 策略',
      items: [
        { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/1-82lb5hnlc1m6rqj5an1019vlu2whnn.png', alt: 'Campaign Rollout 三大传播阶段', aspect: 'wide' },
        { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/18-7for9u015p2uevr3x45d5qqq026wb2.png', alt: '西门子线上线下玩法机制', aspect: 'wide' },
        { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/19-yb6zo7rkiohima3gnf7gyhni0b4iet.png', alt: '抖音挑战赛 Insight 策略', aspect: 'wide' },
        { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/20-zt045gr8f68g4nz42d5wucoq2xae5d.png', alt: '社媒观察：成年人崩溃往往只在一瞬间', aspect: 'wide' },
      ]
    }
  ],
  github: '',
  figma: ''
},
{
  id: 'proj-4',
  name: '小红书美食博主 · 重生之我在车大吃什么',
  description: '独立运营小红书美食账号，月曝光量 39.2W，单篇爆款浏览量 50K，互动量 0.9K。',
  tags: ['内容创作', '小红书运营', '用户增长'],
  cover: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/21-s7qyp7ynid4y3afzhitdv5gfd0890l.png',
  coverObjectPosition: 'center 12%',
  role: '个人',
  period: '2023 – 至今',
  background: '在东南大学就读期间，独立运营小红书美食垂类账号「重生之我在车大吃什么」，聚焦南京本地美食探店内容，通过高质量图文内容积累粉丝，实现账号从 0 到 1 的冷启动与持续增长。',
  work: ['内容策划：聚焦南京本地美食垂直领域，策划差异化选题，打造「在校生视角」的探店内容风格。', '内容生产：独立完成拍摄、剪辑、文案撰写与发布，保持稳定更新频率。', '数据分析：持续追踪笔记数据，分析爆款规律，优化内容策略与发布时间。'],
  results: [
  {
    value: '39.2W',
    label: '月曝光量'
  },
  {
    value: '50K',
    label: '单篇最高浏览量'
  },
  {
    value: '2400+',
    label: '单篇互动量'
  }],
  screenshotGroups: [
    {
      label: '内容截图',
      items: [
        { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/22-qrmpcn0o89oqby9i2sz1xh6da1aof5.png', alt: '南京海底捞mini锅底笔记', aspect: 'portrait' },
        { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/23-rfw8mcqp98b6028t5tlj4ft5tgtfpm.png', alt: '1元1串野摊烧烤笔记', aspect: 'portrait' },
        { src: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/24-lys77uqpyxwoaf5r7vmx3c93h89m1b.png', alt: '账号笔记主页', aspect: 'portrait' },
      ]
    }
  ],
  github: '',
  figma: ''
}];


const skills = {
  数据分析: [
  {
    name: 'Excel / VLOOKUP',
    level: '熟练'
  },
  {
    name: 'Python 数据爬取',
    level: '熟练'
  },
  {
    name: '数据看板搭建',
    level: '熟练'
  },
  {
    name: 'ROI 评估模型',
    level: '熟练'
  }],

  内容与运营: [
  {
    name: '小红书运营',
    level: '熟练'
  },
  {
    name: '抖音运营',
    level: '熟练'
  },
  {
    name: 'KOL 达人矩阵',
    level: '熟练'
  },
  {
    name: '活动策划',
    level: '熟练'
  },
  {
    name: '竞品分析',
    level: '熟练'
  },
  {
    name: '用户洞察',
    level: '熟练'
  }],

  设计与创作: [
  {
    name: 'PPT 制作',
    level: '熟练'
  },
  {
    name: '剪映',
    level: '熟练'
  },
  {
    name: 'PS / Photoshop',
    level: '熟练'
  },
  {
    name: 'PR / Premiere',
    level: '了解'
  },
  {
    name: 'AU / Audition',
    level: '了解'
  }],

开发与工具: [
{
name: 'SQL',
level: '熟练'
},
{
name: 'AI Agent',
level: '熟练'
}]

};

const educations = [
{
  school: '东南大学',
  logo: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/seulogo-01rmfjdopi1d6kg3cu0l3ra88actek.png',
  major: '艺术学理论（艺术史方向）',
  degree: '硕士',
  period: '2024.09 – 2027.06',
  gpa: null,
  tags: ['985', '双一流'],
  honors: ['东南大学三好研究生', '学业二等奖学金', '艺术学院组织部部长，策划 2025 年寒暑假社会实践活动']
},
{
  school: '上海大学',
  logo: 'https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/shulogo-qcdjcmy1hhv68v7pzzhdszzepq4mpz.png',
  major: '音乐学',
  degree: '本科',
  period: '2020.09 – 2024.07',
  gpa: null,
  tags: ['211', '双一流'],
  honors: ['上海市优秀毕业生', '上海大学优秀学生', '学业一等奖学金、创新创业奖学金、公益爱心奖学金']
}];
// ─── Navbar ────────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const navLinks = [
  {
    label: '关于我',
    href: '#about'
  },
  {
    label: '实习经历',
    href: '#experience'
  },
  {
    label: '项目经历',
    href: '#projects'
  },
  {
    label: '技能',
    href: '#skills'
  },
  {
    label: '教育背景',
    href: '#education'
  },
  {
    label: '联系方式',
    href: '#contact'
  }];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0d1117]/90 backdrop-blur-md border-b border-[#4F8EF7]/10' : 'bg-transparent'}`}>
      <div className='max-w-6xl mx-auto px-6 py-4 flex items-center justify-between'>
        <button onClick={() => {const el = document.getElementById('hero');if (el) el.scrollIntoView({ behavior: 'smooth' });}} className='text-lg font-bold text-gradient'>
          Yunxiao Z.
        </button>
        {/* Desktop */}
        <div className='hidden md:flex items-center gap-8'>
          {navLinks.map((link) => {
            const scrollTo = () => {
              const el = document.getElementById(link.href.replace('#', ''));
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            };
            return (
              <button key={link.href} onClick={scrollTo} className='text-sm text-[#8b949e] hover:text-[#4F8EF7] transition-colors duration-200'>
                {link.label}
              </button>);

          })}
        </div>
        {/* Mobile */}
        <button className='md:hidden text-[#8b949e] hover:text-white' onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen &&
      <div className='md:hidden bg-[#0d1117]/95 backdrop-blur-md border-b border-[#4F8EF7]/10 px-6 py-4 flex flex-col gap-4'>
          {navLinks.map((link) => {
          const scrollTo = () => {
            setMenuOpen(false);
            const el = document.getElementById(link.href.replace('#', ''));
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          };
          return (
            <button key={link.href} onClick={scrollTo} className='text-sm text-[#8b949e] hover:text-[#4F8EF7] transition-colors text-left'>
                {link.label}
              </button>);

        })}
        </div>
      }
    </nav>);

} // ─── Hero Section ──────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section id='hero' className='relative min-h-screen flex items-center justify-center grid-bg overflow-hidden'>
      {/* Gradient orbs */}
      <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-[#4F8EF7]/5 rounded-full blur-3xl pointer-events-none' />
      <div className='absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#4F8EF7]/8 rounded-full blur-3xl pointer-events-none' />

      <div className='max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full'>
        {/* Right: Photo - mobile first (top) */}
        <div className='flex-shrink-0 order-first md:order-last'>
          <div className='w-44 h-44 sm:w-48 sm:h-48 md:w-72 md:h-72 rounded-2xl border-2 border-[#4F8EF7]/30 glow-border overflow-hidden'>
            <img
              src="https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/100e6dc5-4d99-4d08-b219-68a16a4bd70b(1)-amx2ndjieiugmz8ih9wbiyb6e4lt17.jpg"
              alt="庄云潇"
              className="mx-auto object-cover w-full h-full" />
            
          </div>
        </div>
        {/* Left: Text */}
        <div className='flex-1 text-center md:text-left'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#4F8EF7]/30 bg-[#4F8EF7]/5 text-[#4F8EF7] text-xs font-medium mb-4 md:mb-6'>
            <span className='w-1.5 h-1.5 rounded-full bg-[#4F8EF7] animate-pulse' />
            意向城市：杭州 / 上海 / 南京
          </div>
          <h1 className='text-4xl sm:text-5xl md:text-7xl font-bold mb-2 md:mb-3 tracking-tight'>
            <span className='text-white'>庄云潇</span>
          </h1>
          <p className='text-lg sm:text-xl md:text-2xl text-[#8b949e] mb-2 font-light tracking-wide'>Yunxiao Zhuang</p>
          <p className='text-base md:text-lg text-[#4F8EF7] mb-4 md:mb-8 font-medium'>产品运营 / 市场营销 · 东南大学硕士</p>
          <p className="text-[#8b949e] text-sm md:text-base leading-relaxed mb-6 md:mb-10 max-w-lg mx-auto md:mx-0">以数据洞察驱动运营决策，擅长跨平台内容营销与 B/C 端用户运营，持续探索 AI Agent 在实际业务中的落地应用。</p>
          <div className='flex flex-col sm:flex-row gap-3 justify-center md:justify-start'>
            <button onClick={() => {const el = document.getElementById('experience');if (el) el.scrollIntoView({ behavior: 'smooth' });}} className='inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#4F8EF7] text-white rounded-lg font-medium hover:bg-[#3a7de8] transition-all duration-200 hover:shadow-lg hover:shadow-[#4F8EF7]/25'>
              查看我的经历
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className='absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 text-[#4F8EF7]/40 animate-bounce'>
        <span className='text-xs'>向下滚动</span>
        <ChevronDown size={16} />
      </div>
    </section>);

} // ─── About Section ─────────────────────────────────────────────────────────────

function AboutSection() {
  const [ref, inView] = useInView();
  return (
    <section id='about' className='py-16 md:py-24 section-divider'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div ref={ref} className={`fade-in-up ${inView ? 'visible' : ''}`}>
          <SectionTitle label='About' title='关于我' />
          <div className='grid md:grid-cols-2 gap-8 md:gap-12 mt-8 md:mt-12 items-start'>
            <div className='space-y-4 text-[#8b949e] leading-relaxed text-sm md:text-base'>
              <p>我是庄云潇，东南大学艺术学理论专业硕士（985 · 双一流），本科毕业于上海大学音乐学专业（211 · 双一流），上海市优秀毕业生。</p>
              <p>在美团核心本地商业-点评事业部担任产品运营实习生，专注 B/C 端用户运营，擅长从用户行为数据及城市洞察中发现营销机会，调整增长策略，并快速落地。</p>
              <p>在博西家电（西门子家电品牌部）参与大型品牌营销 Campaign，主导 KOL 达人矩阵搭建，在职期间全平台新增粉丝 16W，品牌社媒互动量提升 34.7%。</p>
              <p>课余时间独立运营小红书美食账号，月曝光量 39.2W；热爱探索 AI Agent 技术，主动将 AI 工具应用于日常运营提效。</p>
            </div>
            <div className='grid grid-cols-3 gap-3'>
              {[
              {
                value: '4',
                label: '段实习经历'
              },
              {
                value: '5',
                label: '个独立项目'
              },
              {
                value: '985+211',
                label: '92本硕背景'
              }].
              map((item, __dnd_i) =>
              <div key={item.label} className='glow-border rounded-xl p-3 sm:p-5 bg-[#161b22] text-center'>
                  <div className='text-xl sm:text-3xl font-bold text-[#4F8EF7] mb-1 break-all'>{item.value}</div>
                  <div className='text-[10px] sm:text-xs text-[#8b949e] leading-tight'>{item.label}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

} // ─── Experience Section ────────────────────────────────────────────────────────

function ExperienceSection() {
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  return (
    <section id='experience' className='py-16 md:py-24 section-divider'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div ref={ref} className={`fade-in-up ${inView ? 'visible' : ''}`}>
          <SectionTitle label='Experience' title='实习经历' />
          <div className='mt-12 relative'>
            {/* Timeline line */}
            <div className='absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#4F8EF7]/50 via-[#4F8EF7]/20 to-transparent hidden md:block' />
            <div className='space-y-8'>
              {experiences.map((exp, idx) =>
              <div key={exp.id} className='md:pl-14 relative pl-0 sm:pl-0'>
                  {/* Timeline dot */}
                  <div className='absolute left-0 top-6 w-8 h-8 rounded-full bg-[#161b22] border-2 border-[#4F8EF7] flex items-center justify-center hidden md:flex'>
                    <div className='w-2 h-2 rounded-full bg-[#4F8EF7]' />
                  </div>
                  <div className='glow-border rounded-2xl p-4 sm:p-6 bg-[#161b22] group cursor-pointer' onClick={() => navigate(`/experience/${exp.id}`)}>
                    <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4'>
                      <div className='flex items-center gap-4'>
                        {/* Company logo */}
                        <div className='w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[#0d1117] border border-[#4F8EF7]/20'>
                          {exp.id === 'exp-1' ?
                        <div className='w-full h-full overflow-hidden'>
                              <img
                            src="https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/美团横式色彩标识-k82aovqavbk3vu6yv0thlyq2kfiuy4.jpg"
                            alt="美团"
                            className="mx-auto object-cover h-full"
                            style={{ width: '200%', objectPosition: 'left center' }} />
                          
                            </div> :
                        exp.id === 'exp-2' ?
                        <img src="https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/ximenzi logo-y86w8kx2du48pwptba1f9b8m2tzqlz.jpg"

                        alt="西门子" className="mx-auto object-cover w-full h-full" /> :


                        exp.id === 'exp-3' ?
                        <img
                          src="https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/5c3ab941-7606-49cf-8b51-7b625653aa1d(1)-dxz2ig9somyepr4ckf5jumnfirzapo.png"
                          alt="孩子王"
                          className="mx-auto object-cover w-full h-full" /> :


                        exp.id === 'exp-4' ?
                        <img
                          src="https://s3plus.meituan.net/mcopilot-pub/nocode_image/default/图片2-2otza5wc0qnox458ga099optzpx5v9.png"
                          alt="ICAF" className="mx-auto object-contain w-full h-full" /> :
                        <div className='w-full h-full flex items-center justify-center text-[#4F8EF7]/40 text-xs font-bold'>LOGO</div>
                        }
                        </div>
                        <div className='min-w-0'>
                          <h3 className='text-base sm:text-lg font-semibold text-white leading-snug'>{exp.company}</h3>
                          <p className='text-[#4F8EF7] text-xs sm:text-sm font-medium mt-0.5'>{exp.role}</p>
                        </div>
                      </div>
                      <div className='flex flex-col items-start sm:items-end gap-1 text-xs text-[#8b949e]'>
                        <div className='flex items-center gap-1'>
                          <Calendar size={12} />
                          {exp.period}
                        </div>
                        <div className='flex items-center gap-1'>
                          <MapPin size={12} />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                    <ul className='space-y-2 mb-4'>
                      {exp.summary.map((s, i) =>
                    <li key={i} className='text-xs sm:text-sm text-[#8b949e] flex gap-2'>
                          <span className='text-[#4F8EF7] mt-0.5 flex-shrink-0'>▸</span>
                          {s}
                        </li>
                    )}
                    </ul>
                    <div className='flex items-center justify-between'>
                      <div className='flex flex-wrap gap-2'>
                        {exp.tools.map((t, __dnd_i) =>
                      <span key={t} className='px-2 py-0.5 rounded-md bg-[#4F8EF7]/10 text-[#4F8EF7] text-xs border border-[#4F8EF7]/20'>
                            {t}
                          </span>
                      )}
                      </div>
                      <button className='flex items-center gap-1 text-xs text-[#4F8EF7] group-hover:gap-2 transition-all duration-200'>
                        查看详情 <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

} // ─── Projects Section ──────────────────────────────────────────────────────────

function ProjectsSection() {
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  return (
    <section id='projects' className='py-16 md:py-24 section-divider'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div ref={ref} className={`fade-in-up ${inView ? 'visible' : ''}`}>
          <SectionTitle label='Projects' title='项目经历' />
          <div className='mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
            {projects.map((proj, __dnd_i) =>
            <div key={proj.id} className='glow-border rounded-2xl bg-[#161b22] overflow-hidden cursor-pointer group' onClick={() => navigate(`/projects/${proj.id}`)}>
                {/* Cover */}
                <div className='h-44 border-b border-[#4F8EF7]/10 relative overflow-hidden bg-[#0d1117]'>
                  {proj.cover ? (
                    <img src={proj.cover} alt={proj.name} className='w-full h-full object-cover' style={{ objectPosition: proj.coverObjectPosition || 'center top' }} />
                  ) : (
                    <>
                      <div className='absolute inset-0 bg-gradient-to-br from-[#4F8EF7]/10 to-[#0d1117]' />
                      <div className='absolute inset-0 grid-bg opacity-50' />
                      <div className='relative h-full flex items-center justify-center text-center'>
                        <div>
                          <div className='w-16 h-16 rounded-2xl bg-[#4F8EF7]/10 border border-dashed border-[#4F8EF7]/30 flex items-center justify-center mx-auto mb-2'>
                            <ExternalLink size={20} className='text-[#4F8EF7]/40' />
                          </div>
                          <p className='text-xs text-[#4F8EF7]/40'>项目封面图</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className='p-5'>
                  <h3 className='text-base font-semibold text-white mb-2 group-hover:text-[#4F8EF7] transition-colors'>{proj.name}</h3>
                  <p className='text-sm text-[#8b949e] mb-4 leading-relaxed'>{proj.description}</p>
                  <div className='flex flex-wrap gap-2'>
                    {proj.tags.map((tag, __dnd_i) =>
                  <span key={tag} className='px-2 py-0.5 rounded-md bg-[#4F8EF7]/10 text-[#4F8EF7] text-xs border border-[#4F8EF7]/20'>
                        {tag}
                      </span>
                  )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

} // ─── Skills Section ────────────────────────────────────────────────────────────

function SkillsSection() {
  const [ref, inView] = useInView();
  return (
    <section id='skills' className='py-16 md:py-24 section-divider'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div ref={ref} className={`fade-in-up ${inView ? 'visible' : ''}`}>
          <SectionTitle label='Skills' title='技能' />
          <div className='mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8'>
            {Object.entries(skills).map(([category, items], __dnd_i) =>
            <div key={category} className='glow-border rounded-2xl p-6 bg-[#161b22]'>
                <h3 className='text-sm font-semibold text-[#4F8EF7] mb-4 uppercase tracking-wider'>{category}</h3>
                <div className='flex flex-wrap gap-2'>
                  {items.map((skill, __dnd_i) =>
                <span key={skill.name} className={`px-3 py-1.5 rounded-lg text-sm border transition-all duration-200 ${skill.level === '熟练' ? 'bg-[#4F8EF7]/15 text-[#4F8EF7] border-[#4F8EF7]/30 font-medium' : 'bg-[#4F8EF7]/5 text-[#8b949e] border-[#4F8EF7]/10'}`}>
                      {skill.name}
                    </span>
                )}
                </div>
                <div />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

} // ─── Education Section ─────────────────────────────────────────────────────────

function EducationSection() {
  const [ref, inView] = useInView();
  return (
    <section id='education' className='py-16 md:py-24 section-divider'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div ref={ref} className={`fade-in-up ${inView ? 'visible' : ''}`}>
          <SectionTitle label='Education' title='教育背景' />
          <div className='mt-12 space-y-5'>
            {educations.map((edu, __dnd_i) =>
            <div key={edu.school} className='glow-border rounded-2xl p-5 sm:p-8 bg-[#161b22] flex flex-col sm:flex-row gap-4 sm:gap-6 items-start'>
                {/* School logo placeholder */}
                <div className='w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-white overflow-hidden flex-shrink-0 p-1'>
                  {edu.logo ? <img src={edu.logo} alt={edu.school} className='w-full h-full object-contain' /> : <div className='w-full h-full rounded-xl bg-[#0d1117] border border-[#4F8EF7]/20 flex items-center justify-center text-[#4F8EF7]/40 text-xs font-bold'>校徽</div>}
                </div>
                <div className='flex-1'>
                  <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3'>
                    <div>
                      <div className='flex items-center gap-2 flex-wrap mb-1'>
                        <h3 className='text-lg sm:text-xl font-bold text-white'>{edu.school}</h3>
                        {edu.tags &&
                      edu.tags.map((tag, __dnd_i) =>
                      <span key={tag} className='px-2 py-0.5 rounded-md bg-[#4F8EF7]/10 text-[#4F8EF7] text-xs border border-[#4F8EF7]/20'>
                              {tag}
                            </span>
                      )}
                      </div>
                      <p className='text-[#4F8EF7] font-medium'>
                        {edu.major} · {edu.degree}
                      </p>
                    </div>
                    <div className='text-sm text-[#8b949e] flex items-center gap-1 flex-shrink-0'>
                      <Calendar size={14} />
                      {edu.period}
                    </div>
                  </div>
                  {edu.gpa && <p className='text-sm text-[#8b949e] mb-3'>GPA：{edu.gpa}</p>}
                  <ul className='space-y-1.5'>
                    {edu.honors.map((h, i) =>
                  <li key={i} className='text-sm text-[#8b949e] flex gap-2'>
                        <span className='text-[#4F8EF7] flex-shrink-0'>▸</span>
                        {h}
                      </li>
                  )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

} // ─── Contact Section ───────────────────────────────────────────────────────────

function ContactSection() {
const [ref, inView] = useInView();
return (
<section id='contact' className='py-16 md:py-24 section-divider'>
<div className='max-w-6xl mx-auto px-4 sm:px-6'>
<div ref={ref} className={`fade-in-up ${inView ? 'visible' : ''}`}>
<div className='text-center max-w-2xl mx-auto'>
<p className='text-xs font-semibold text-[#4F8EF7] uppercase tracking-widest mb-3'>Contact</p>
<h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>联系方式</h2>
<p className='text-[#8b949e] text-lg mb-12'>欢迎聊聊实习机会或有趣的想法 ✨</p>
<div className='flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-8 md:mb-16'>
<a href='mailto:18817335851@163.com' className='flex items-center justify-center gap-3 px-6 py-3 glow-border rounded-xl bg-[#161b22] text-[#8b949e] hover:text-[#4F8EF7] transition-all duration-200 group'>
  <Mail size={18} className='text-[#4F8EF7]' />
  <span className='text-sm'>18817335851@163.com</span>
</a>
</div>
</div>
<div className='text-center text-xs text-[#8b949e]/50 mt-8'>© 2026 庄云潇 · Built with ❤️</div>
</div>
</div>
</section>);

} // ─── Section Title ─────────────────────────────────────────────────────────────

function SectionTitle({ label, title }) {
  return (
    <div>
      <p className='text-xs font-semibold text-[#4F8EF7] uppercase tracking-widest mb-2'>{label}</p>
      <h2 className='text-3xl md:text-4xl font-bold text-white'>{title}</h2>
    </div>);

} // ─── Main Index Page ───────────────────────────────────────────────────────────

const Index = () => {
  return (
    <div className='min-h-screen bg-[#0d1117]'>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </div>);

};
export { experiences, projects };
export default Index;
