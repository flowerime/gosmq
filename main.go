package smq

type SmqIn struct { // Smq input
	Fpm  string // 赛码表路径
	Ding int    // 普通码表起顶码长，码长大于等于此数，首选不会追加空格
	IsS  bool   // 是否只跑单字
	IsW  bool   // 是否输出赛码表

	Fpt string // 文本路径
	Csk string // 自定义选重键(2重开始)，custom select keys
	Fpo string // 输出编码路径
}

func NewSmq(si SmqIn) *SmqOut {
	dict := newDict(si.Fpm, si.IsS, si.Ding, si.IsW)
	so := new(SmqOut)
	if len(si.Fpt) == 0 || dict.children == nil {
		return so
	}
	so = newSmqOut(dict, si.Fpt, si.Csk, si.Fpo)
	return so
}
