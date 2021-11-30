package main

import (
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"strconv"

	_ "embed"

	smq "github.com/cxcn/gosmq"

	"github.com/cxcn/gosmq/pkg/html"
)

//go:embed index.html
var index string

type Result struct {
	smq.SmqIn
	DictName string
}

func web() {

	type names struct {
		DictNames []string
		TextNames []string
	}

	printInfo()

	theNames := new(names)
	// 读取dict/目录中的所有文件和子目录
	files, err := ioutil.ReadDir(`dict/`)
	if err != nil {
		fmt.Println("找不到 dict 文件夹", err)
		return
	}
	fmt.Println("检测到以下赛码表：")
	for _, file := range files {
		theNames.DictNames = append(theNames.DictNames, file.Name())
		fmt.Println("  ", file.Name())
	}
	fmt.Println()
	// 读取text/目录中的所有文件和子目录
	files, err = ioutil.ReadDir(`text/`)
	if err != nil {
		fmt.Println("找不到 text 文件夹", err)
		return
	}
	fmt.Println("检测到以下文本：")
	for _, file := range files {
		theNames.TextNames = append(theNames.TextNames, file.Name())
		fmt.Println("  ", file.Name())
	}

	funcMap := template.FuncMap{"getName": smq.GetFileName}
	t := template.New("index.html").Funcs(funcMap)
	_, err = t.Parse(index)
	if err != nil {
		panic(err)
	}

	server := http.Server{
		Addr: "localhost:5666",
	}
	http.HandleFunc("/index", func(rw http.ResponseWriter, r *http.Request) {
		// html, _ := ioutil.ReadFile("index.html")
		// rw.Write(html)
		t.Execute(rw, theNames)
	})
	http.HandleFunc("/result", func(rw http.ResponseWriter, r *http.Request) {
		r.ParseForm()
		options := getOptions(r.PostForm)
		if len(options) == 0 {
			return
		}
		tn := smq.GetFileName(r.PostForm.Get("fpt"))
		h := html.NewHTML(tn)
		for _, v := range options {

			so, err := v.SmqIn.Smq()
			if err != nil {
				panic(err)
			}
			dn := v.DictName
			if v.IsOutputResult {
				writeDict(dn, so.DictBytes)
			}
			if v.IsOutputResult {
				writeResult(tn, dn, so.WordSlice, so.CodeSlice)
			}
			h.AddResult(so, v.DictName)
		}
		h.OutputHTML(rw)

		// fmt.Fprintln(rw, r.PostForm)
	})
	fmt.Println("\nhttp://localhost:5666/index\n ")
	server.ListenAndServe()
}

func getOptions(v url.Values) []*Result {
	var ret []*Result
	if v.Get("fpd") != "" {
		tmp := new(Result)

		text, err := os.Open("text/" + v.Get("fpt"))
		if err != nil {
			panic(err)
		}
		tmp.TextReader = text

		tmp.DictName = smq.GetFileName(v.Get("fpd"))
		dict, err := os.Open("dict/" + v.Get("fpd"))
		if err != nil {
			panic(err)
		}
		tmp.DictReader = dict

		tmp.BeginPush, _ = strconv.Atoi(v.Get("ding"))
		tmp.SelectKeys = v.Get("csk")
		if v.Get("iss") == "true" {
			tmp.IsSingleOnly = true
		}
		if v.Get("as") == "true" {
			tmp.IsSpaceDiffHand = true
		}
		if v.Get("iso") == "true" {
			tmp.IsOutputResult = true
		}
		if tmp.BeginPush > 0 {
			tmp.IsOutputDict = true
		}
		ret = append(ret, tmp)
	}
	if v.Get("fpd1") != "" {
		tmp := new(Result)

		text, err := os.Open("text/" + v.Get("fpt"))
		if err != nil {
			panic(err)
		}
		tmp.TextReader = text

		tmp.DictName = smq.GetFileName(v.Get("fpd1"))
		dict, err := os.Open("dict/" + v.Get("fpd1"))
		if err != nil {
			panic(err)
		}
		tmp.DictReader = dict

		tmp.BeginPush, _ = strconv.Atoi(v.Get("ding1"))
		tmp.SelectKeys = v.Get("csk1")
		if v.Get("iss1") == "true" {
			tmp.IsSingleOnly = true
		}
		if v.Get("as1") == "true" {
			tmp.IsSpaceDiffHand = true
		}
		if v.Get("iso1") == "true" {
			tmp.IsOutputResult = true
		}
		if tmp.BeginPush > 0 {
			tmp.IsOutputDict = true
		}
		ret = append(ret, tmp)
	}
	return ret
}