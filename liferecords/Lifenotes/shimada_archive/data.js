// 定义系列信息
const seriesConfig = {
    'mitarai': { name: '御手洗洁系列', color: '#2c3e50' }, 
    'yoshiki': { name: '吉敷竹史系列', color: '#27ae60' }
};

// 书籍数据总库
const allBooksData = [
    {
        series: 'mitarai',
        jp: { title: "占星術殺人事件", date: "1981.12", stories: [] },
        tc: { title: "占星術殺人魔法", date: "1988.02", stories: [] },
        sc: { title: "占星术杀人魔法", date: "2008.09", stories: [] }
    },
    {
        series: 'mitarai',
        jp: { title: "斜め屋敷の犯罪", date: "1982.11", stories: [] },
        tc: { title: "斜屋犯罪", date: "1999.02", stories: [] },
        sc: { title: "斜屋犯罪", date: "2008.09", stories: [] }
    },
    {
        series: 'yoshiki',
        jp: { title: "寝台特急「はやぶさ」1/60秒の壁", date: "1984.2", publisher: "光文社", stories: [] },
        tc: { title: "寢台特急1/60秒障礙", date: "2005", stories: [] },
        sc: { title: "寝台特急1/60秒障碍", date: "2009.04", stories: [] }
    },
    {
        series: 'yoshiki',
        jp: { title: "出雲伝説7/8の殺人", date: "1984.6", publisher: "光文社", stories: [] },
        tc: { title: "出雲傳說7/8殺人", date: "2005", stories: [] },
        sc: { title: "出云传说7/8杀人事件", date: "2009.06", stories: [] }
    },
	{
        series: 'yoshiki',
        jp: { title: "北の夕鶴2/3の殺人", date: "1985.1", publisher: "光文社", stories: [] },
        tc: { title: "北方夕鶴2/3殺人", date: "2004.04", stories: [] },
        sc: { title: "北方夕鹤2/3杀人事件", date: "2009.06", stories: [] }
    },
    {
        series: 'yoshiki',
        jp: { title: "消える「水晶特急」", date: "1985.5", publisher: "光文社", stories: [] },
        tc: { title: " ", date: "", stories: [] },
        sc: { title: "消失的“水晶特快”", date: "2009.06", stories: [] }
    },
    {
        series: 'yoshiki',
        jp: { title: "確率2/2の死", date: "1985.9", publisher: "光文社", stories: [] },
        tc: { title: " ", date: "", stories: [] },
        sc: { title: "死亡概率2/2", date: "2009.07", stories: [] }
    },
    {
        series: 'yoshiki',
        jp: { title: "Yの構図", date: "1986.12", publisher: "光文社", stories: [] },
        tc: { title: " ", date: "", stories: [] },
        sc: { title: "Y之构造", date: "2009.08", stories: [] }
    },
    {
        series: 'yoshiki',
        jp: { title: "灰の迷宮", date: "1987.12", publisher: "光文社", stories: [] },
        tc: { title: " ", date: "", stories: [] },
        sc: { title: "灰之迷宫", date: "2009.11", stories: [] }
    },
    {
        series: 'yoshiki',
        jp: { title: "夜は千の鈴を鳴らす", date: "1988.11", publisher: "光文社", stories: [] },
        tc: { title: " ", date: "", stories: [] },
        sc: { title: "深夜鸣响的一千只铃", date: "2010.06", stories: [] }
    },
    {
        series: 'yoshiki',
        jp: { title: "幽体離脱殺人事件", date: "1989.5", publisher: "光文社", stories: [] },
        tc: { title: " ", date: "", stories: [] },
        sc: { title: "灵魂离体杀人事件", date: "2010.05", stories: [] }
    },
    {
        series: 'yoshiki',
        jp: { title: "奇想、天を動かす", date: "1989.09", publisher: "光文社", stories: [] },
        tc: { title: "奇想、天動", date: "2007.12", stories: [] },
        sc: { title: "奇想，天动", date: "2010.08", stories: [] }
    },
    {
        series: 'yoshiki',
        jp: { title: "羽衣伝説の記憶", date: "1990.2", publisher: "光文社", stories: [] },
        tc: { title: "羽衣傳說的記憶", date: "2010.01", stories: [] },
        sc: { title: "羽衣传说的记忆", date: "2010.10", stories: [] }
    },
    {
        series: 'yoshiki',
        jp: { title: "ら抜き言葉殺人事件", date: "1991.2", publisher: "光文社", stories: [] },
        tc: { title: " ", date: "", stories: [] },
        sc: { title: "字谜杀人事件", date: "2010.06", stories: [] }
    },
    {
        series: 'yoshiki',
        jp: { title: "飛鳥のガラスの靴", date: "1991.12", publisher: "光文社", stories: [] },
        tc: { title: "飛鳥的玻璃鞋", date: "2010.09", stories: [] },
        sc: { title: "飞鸟的玻璃鞋", date: "2011.01", stories: [] }
    },
    {
        series: 'yoshiki',
        jp: { title: "涙流れるままに（上・下）", date: "1999.6", publisher: "光文社", stories: [] },
        tc: { title: "淚流不止", date: "2011.09", stories: [] },
        sc: { title: "泪流不止", date: "2012.03", stories: [] }
    },
    {
        series: 'yoshiki',
        jp: { title: "光る鶴", date: "1999.6", publisher: "光文社", stories: ["光る鶴","吉敷竹史、十八歳の肖像","電車最中"] },
        tc: { title: " ", date: "", stories: [ ] },
        sc: { title: "光之鹤", date: "2011.09", stories: ["光之鹤","吉敷竹史，十八岁的肖像","电车形状的点心"] }
    },
    {
        series: 'yoshiki',
        jp: { title: "盲剣楼奇譚", date: "2019.8", publisher: "光文社", stories: [] },
        tc: { title: " ", date: "", stories: [] },
        sc: { title: "盲剑楼奇谭", date: "2021.04", stories: [] }
    },
    {
        series: 'mitarai',
        jp: { 
            title: "御手洗潔の挨拶", 
            date: "1987.10",
            stories: ["数字錠", "疾走する死者", "紫電改研究保存会", "ギリシャの犬"] 
        },
        tc: { title: "御手洗潔的問候", date: "2006", stories: [] },
        sc: { title: "御手洗洁的问候", date: "2009.03", stories: ["数字锁", "狂奔的死者", "紫电改研究保存会", "希腊之犬"] }
    },
	{
        series: 'mitarai',
        jp: { title: "異邦の騎士", date: "1988.4", publisher: " ", stories: [] },
        tc: { title: "異邦騎士", date: "2003", stories: [] },
        sc: { title: "异邦骑士", date: "2009.04", stories: [] }
    },
	{
        series: 'mitarai',
        jp: { title: "御手洗潔のダンス", date: "1990.7", publisher: " ", stories: ["山高帽のイカロス","ある騎士の物語","舞踏病","近況報告"] },
        tc: { title: "御手洗潔的舞蹈", date: "", stories: [] },
        sc: { title: "御手洗洁的舞蹈", date: "2012.01", stories: ["戴高筒帽的伊卡洛斯","某骑士物语","舞蹈病","近况报告"] }
    },
    {
        series: 'mitarai',
        jp: { title: "暗闇坂の人喰いの木", date: "1990.10", stories: [] },
        tc: { title: "黑暗坡的食人樹", date: "2005.02", stories: [] },
        sc: { title: "黑暗坡食人树", date: "2009.07", stories: [] }
    },
    {
        series: 'mitarai',
        jp: { title: "水晶のピラミッド", date: "1991.9", stories: [] },
        tc: { title: "水晶金字塔", date: "2008", stories: [] },
        sc: { title: "水晶金字塔", date: "2010.05", stories: [] }
    },
    {
        series: 'mitarai',
        jp: { title: "眩暈", date: "1992.9", stories: [] },
        tc: { title: "眩暈", date: "2006", stories: [] },
        sc: { title: "眩晕", date: "2010.01", stories: [] }
    },
    {
        series: 'mitarai',
        jp: { title: "アトポス", date: "1993.10", stories: [] },
        tc: { title: "異位", date: "2008.06", stories: [] },
        sc: { title: "异位", date: "2012.10", stories: [] }
    },
    {
        series: 'mitarai',
        jp: { title: "龍臥亭事件", date: "1996.1", stories: [] },
        tc: { title: "龍臥亭殺人事件", date: "2006", stories: [] },
        sc: { title: "龙卧亭杀人事件", date: "2010.11", stories: [] }
    },
    {
        series: 'mitarai',
        jp: { title: "御手洗潔のメロディ", date: "1998.9", stories: ["IgE", "SIVAD SELIM", "ボストン幽霊絵画事件", "さらば遠い輝き"] },
        tc: { title: "御手洗潔的旋律", date: "2013.08", stories: ["IgE", "SIVAD SELIM", "波士頓幽靈畫圖事件"] },
        sc: { title: "御手洗洁的旋律", date: "2011.03", stories: ["IgE", "SIVAD SELIM", "波士顿幽灵绘画事件", "别了，我曾经的思念"] }
    },
    {
        series: 'mitarai',
        jp: { title: "Pの密室", date: "1999.10", stories: ["鈴蘭事件", "Pの密室"] },
        tc: { title: "P的密室", date: "2012.09", stories: ["鈴蘭事件", "P的密室"] },
        sc: { title: "P的密室", date: "2014.07", stories: ["铃兰事件", "P的密室"] }
    },
    {
        series: 'mitarai',
        jp: { title: "最後のディナー", date: "1999.11", stories: ["里美上京", "大根奇聞", "最後のディナー"] },
        tc: { title: " ", date: "", stories: [ ] },
        sc: { title: "最后的晚餐", date: "2017.10", stories: ["里美上京", "大根奇闻", "最后的晚餐"] }
    },
    {
        series: 'mitarai',
        note: "好莱坞证书(玲王奈主角)",
        jp: { title: "ハリウッド・サーティフィケイト", date: "2001.8", stories: [] },
        tc: { title: " ", date: "", stories: [] },
        sc: { title: "", date: "", stories: [] }
    },
    {
        series: 'mitarai',
        jp: { title: "ロシア幽霊軍艦事件", date: "2001.10", stories: [] },
        tc: { title: "俄羅斯幽靈軍艦之謎", date: "2009.06", stories: [] },
        sc: { title: "俄罗斯幽灵军舰之谜", date: "2010.09", stories: [] }
    },
    {
        series: 'mitarai',
        jp: { title: "魔神の遊戯", date: "2002.08", stories: [] },
        tc: { title: "魔神的遊戲", date: "2005.05", stories: [] },
        sc: { title: "魔神的游戏", date: "2012.09", stories: [] }
    },
    {
        series: 'mitarai',
        jp: { title: "セント・ニコラスの、ダイヤモンドの靴", date: "2002.12", stories: ["セント・ニコラスの、ダイヤモンドの靴", "シアルヴィ館のクリスマス"] },
        tc: { title: "聖尼可拉斯的鑽石靴", date: "2017.03", stories: ["聖尼可拉斯的鑽石靴", "席阿爾維館的聖誕節"] },
        sc: { title: " ", date: "", stories: [ ] }
    },
    {
        series: 'mitarai',
		note: '上高地的开膛手杰克',
        jp: { title: "上高地の切り裂きジャック", date: "2003.3", stories: ["上高地の切り裂きジャック", "山手の幽霊"] },
        tc: { title: " ", date: "", stories: [ ] },
        sc: { title: "", date: "", stories: [ ] }
    },
    {
        series: 'mitarai',
        jp: { title: "ネジ式ザゼツキー", date: "2003.10", stories: [] },
        tc: { title: "螺絲人", date: "2008.12", stories: [] },
        sc: { title: "螺丝人", date: "2011.05", stories: [] }
    },
    {
        series: 'mitarai',
        jp: { title: "龍臥亭幻想", date: "2004.10", stories: [] },
        tc: { title: "龍臥亭幻想", date: "2007", stories: [] },
        sc: { title: "龙卧亭幻想", date: "2011.07", stories: [] }
    },
    {
        series: 'mitarai',
        jp: { title: "摩天楼の怪人", date: "2005.10", stories: [] },
        tc: { title: "摩天樓的怪人", date: "2008.09", stories: [] },
        sc: { title: "摩天楼的怪人", date: "2012.01", stories: [] }
    },
    {
        series: 'mitarai',
        jp: { title: "溺れる人魚", date: "2006.6", stories: ["溺れる人魚", "人魚兵器", "耳の光る児", "海と毒薬"] },
        tc: { title: " ", date: "", stories: [ ] },
        sc: { title: "溺水的人鱼", date: "2018.05", stories: ["溺水的人鱼", "美人鱼兵器", "海与毒药"] }
    },
    {
        series: 'mitarai',
        jp: { title: "UFO大通り", date: "2006.08", stories: ["UFO大通り", "傘を折る女"] },
        tc: { title: "折傘的女人", date: "2017.09", stories: ["UFO大道", "折傘的女人"] },
        sc: { title: "UFO大道", date: "2014.07", stories: ["UFO大道", "折伞的女人"] }
    },
    {
        series: 'mitarai',
        jp: { title: "最後の一球", date: "2006.11", stories: [] },
        tc: { title: " ", date: "", stories: [] },
        sc: { title: "最后的一球", date: "2014.07", stories: [] }
    },
    {
        series: 'mitarai',
        jp: { title: "リベルタスの寓話", date: "2007.10", stories: ["リベルタスの寓話", "クロアチア人の手"] },
        tc: { title: "利比達寓言", date: "2009.08", stories: ["利比達寓言", "克羅埃西亞人的手"] },
        sc: { title: "利比达寓言", date: "2016.08", stories: ["利比达寓言", "克罗地亚人的手"] }
    },
    {
        series: 'mitarai',
        jp: { title: "進々堂世界一周 追憶のカシュガル", date: "2011.4", stories: ["進々堂ブレンド1974", "シェフィールドの奇跡", "戻り橋と悲願花", "追憶のカシュガル"] },
        tc: { title: "御手洗潔與進進堂咖啡", date: "2016.11", stories: [] },
        sc: { title: "进进堂，世界一周", date: "", stories: ["进进堂咖啡 1974", "谢菲尔德的奇迹", "归桥与彼岸花", "追忆中的喀什"] }
    },
    {
        series: 'mitarai',
        jp: { title: "星籠の海 The Clockwork Current", date: "2013.10", stories: [] },
        tc: { title: "星籠之海", date: "2016", stories: [] },
        sc: { title: "星笼之海", date: "2014.08", stories: [] }
    },
    {
        series: 'mitarai',
        jp: { title: "屋上の道化たち", date: "2016.4", stories: [] },
        tc: { title: " ", date: "", stories: [] },
        sc: { title: "屋顶上的小丑", date: "2019.07", stories: [] }
    },
    {
        series: 'mitarai',
        jp: { title: "御手洗潔の追憶", date: "2016.5", stories: ["御手洗潔、その時代の幻", "天使の名前", "石岡先生の執筆メモから。", "石岡氏への手紙", "石岡先生、ロング・ロング・インタヴュー", "シアルヴィ", "ミタライ・カフェ"] },
        tc: { title: "御手洗潔的追憶", date: "2017.09", stories: ["御手洗潔，那個時代的幻象", "天使的名字", "來自石岡老師的記事", "給石岡的信", "與石岡老師的長訪談", "希亞費", "御手洗咖啡館"] },
        sc: { title: " ", date: "", stories: [ ] }
    },
    {
        series: 'mitarai',
        jp: { title: "鳥居の密室 世界にただひとりのサンタクロース", date: "2018.8", stories: [] },
        tc: { title: "鳥居的密室", date: "2019.08", stories: [] },
        sc: { title: "鸟居密室", date: "2020.12", stories: [] }
    },
	{
        series: 'mitarai',
        jp: { title: "伊根の龍神", date: "2025.3", publisher: " ", stories: [] },
        tc: { title: "暂未出版", date: "", stories: [] },
        sc: { title: "暂未出版", date: "", stories: [] }
    }
];
