// 客+ HakkaTV — sample content (from .fig + plausible extensions)
// All copy in Traditional Chinese matches the .fig Style A mockup.

window.HAKKA_DATA = {
  // ── Hero — 3 cards, center is "首播" featured
  hero: [
    {
      id: "h-prev",
      title: "可可樹下的奇幻小店",
      en: "The Wondrous Shop Beneath the Cocoa Tree",
      img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80",
      kind: "戲劇",
      ep: "EP.07",
    },
    {
      id: "h-now",
      title: "蒼蠅歌手",
      en: "Tic Talk",
      img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=2200&q=80",
      kind: "劇情",
      ep: "第二季 全 12 集",
      featured: true,
    },
    {
      id: "h-next",
      title: "綠金龜的模仿犯",
      en: "The Chrysina Mimic",
      img: "https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?w=1600&q=80",
      kind: "紀錄片",
      ep: "新節目即將上線",
    },
  ],

  // Fresh Contents — 5 mint poster cards in a row (Style A pattern)
  fresh: [
    { title: "星空下的黑潮島嶼", views: "12.8K views", kind: "紀錄片", img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=900&q=80" },
    { title: "今晚是露營風暝", views: "8.4K views", kind: "綜藝",   img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=900&q=80" },
    { title: "小包袱",         views: "6.2K views", kind: "戲劇",   img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=900&q=80" },
    { title: "客庄好味道",      views: "5.1K views", kind: "美食",   img: "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=900&q=80" },
    { title: "山林裡的歌人",    views: "4.8K views", kind: "音樂",   img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80" },
  ],

  // ── 24hr 客語時段 timeline. 6 mood bands map to actual hours.
  // 朝晨 dawn 05-09, 當晝 midday 09-13, 晝邊 afternoon 13-17,
  // 暗哺 dusk 17-19, 暗夜 night 19-23, 夜深 deep-night 23-05
  moods: [
    { id: "zhao-chen", label: "朝晨", en: "Dawn",        hours: [5, 6, 7, 8],          gradVar: "--mood-zhao-chen" },
    { id: "dang-zhou", label: "當晝", en: "Midday",      hours: [9,10,11,12],          gradVar: "--mood-dang-zhou" },
    { id: "zhou-bian", label: "晝邊", en: "Afternoon",   hours: [13,14,15,16],         gradVar: "--mood-zhou-bian" },
    { id: "an-bu",     label: "暗哺", en: "Dusk",        hours: [17, 18],              gradVar: "--mood-an-bu" },
    { id: "an-ye",     label: "暗夜", en: "Night",       hours: [19,20,21,22],         gradVar: "--mood-an-ye" },
    { id: "ye-shen",   label: "夜深", en: "Deep Night",  hours: [23,0,1,2,3,4],        gradVar: "--mood-ye-shen" },
  ],

  // Live programme list for the timeline right column
  timelineList: [
    { kind: "戲劇",   date: "FEB 5, 2026", title: "可可樹下的奇幻小店 — 展開奇幻冒險", channel: "CH 17", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80" },
    { kind: "綜藝",   date: "FEB 5, 2026", title: "鬧熱打擂台 — 第八屆客家流行音樂大賽",   channel: "CH 17", img: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=400&q=80" },
    { kind: "紀錄片", date: "FEB 5, 2026", title: "客家樂事 — 一日客庄滿月圓",          channel: "CH 17", img: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&q=80" },
    { kind: "新聞",   date: "FEB 5, 2026", title: "客家新聞雜誌 — 山林裡的茶人",         channel: "CH 17", img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&q=80" },
    { kind: "兒少",   date: "FEB 5, 2026", title: "ㄤ咕ㄤ咕咕 — 找回失落的客語童謠",      channel: "CH 17", img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80" },
  ],

  // ── Fresh contents / 熱門影音
  freshFeatured: {
    title: "小包袱",
    en: "Little Bundle",
    no: "N0.2",
    img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=2000&q=80",
  },

  // ── Stories worth staying for — 7 portrait cards (240×355 in .fig)
  stories: [
    { title: "阿婆非死不可",   img: "https://images.unsplash.com/photo-1581873372796-635b67ca2008?w=600&q=80" },
    { title: "綠金龜的模仿犯", img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80" },
    { title: "唱歌給你聽",     img: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=600&q=80" },
    { title: "女孩上場",       img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80" },
    { title: "台北歌手",       img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80" },
    { title: "暗夜微光",       img: "https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?w=600&q=80" },
    { title: "山林裡的歌人",   img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80" },
  ],

  // ── Live the Hakka way / 跟著客家過生活 (tabs + 1:1 cards)
  hakkaWayTabs: ["主題", "商品", "直播"],
  hakkaWay: {
    "主題": [
      { title: "穀雨時節，走進茶園裡的一場慢旅行", img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80", tag: "節氣旅行" },
      { title: "美濃的稻浪與夥房，一日客庄散步路線", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80", tag: "客庄散步" },
      { title: "跟著節氣走，立秋後的柿餅小旅行",   img: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=1200&q=80", tag: "客庄味" },
    ],
    "商品": [
      { title: "東方美人手選．高山炭焙",  img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1200&q=80", tag: "客庄選物" },
      { title: "公館紅棗養生禮盒",         img: "https://images.unsplash.com/photo-1607301406259-dfb186e15de8?w=1200&q=80", tag: "節令食品" },
      { title: "藍染手帕．美濃慢工",       img: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=1200&q=80", tag: "客家工藝" },
    ],
    "直播": [
      { title: "義民祭．新埔現場直擊",      img: "https://images.unsplash.com/photo-1528465424850-54d22f092f9d?w=1200&q=80", tag: "今晚 19:00" },
      { title: "客家流行音樂大賽 決賽夜",   img: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=1200&q=80", tag: "週六 20:00" },
      { title: "桐花季．客庄走讀現場",       img: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=1200&q=80", tag: "週日 14:00" },
    ],
  },

  // ── Hakka headlines — 客庄大小事. 7 portrait cards (240×355).
  headlines: [
    { title: "慢「義」拍",   img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", date: "APR 5", tag: "客庄" },
    { title: "為客家發聲",   img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80", date: "APR 4", tag: "人物" },
    { title: "冰島覓語",     img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=80", date: "APR 3", tag: "國際" },
    { title: "大洋驕客",     img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80", date: "APR 2", tag: "海外" },
    { title: "他山之石",     img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", date: "APR 1", tag: "國際" },
    { title: "加勒比海島",   img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", date: "MAR 30", tag: "國際" },
    { title: "雲端伙房",     img: "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=600&q=80", date: "MAR 28", tag: "客家味" },
  ],

  // ── Into Hakka life / 客家日常 — center large + 8 small popular cards
  hakkaLife: {
    center: {
      title: "夥房裡的一頓飯",
      en: "Around the Hakka Hearth",
      img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80",
    },
    around: [
      { title: "桐花季",   img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80" },
      { title: "山林茶事", img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80" },
      { title: "客家八音", img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&q=80" },
      { title: "藍染慢工", img: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600&q=80" },
      { title: "竹編工藝", img: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=600&q=80" },
      { title: "梅干扣肉", img: "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=600&q=80" },
      { title: "義民祭典", img: "https://images.unsplash.com/photo-1528465424850-54d22f092f9d?w=600&q=80" },
      { title: "夥房聚會", img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80" },
    ],
  },

  nav: ["影音", "新聞", "短影音", "生活+", "直播節目表", "關於客台"],
  nav_info: ["公開資訊", "公眾服務", "線上客服"],
  nav_legal: ["使用者條款", "著作權聲明"],
};
