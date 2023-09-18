#!/usr/bin/env node

const fs = require('fs-extra')
const _ = require('lodash')
const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
// 解析日志文件正则
const matchLogRegx = /(?<=\'msc-----printObjectKey---\',).*/g
// 格式化对象key 替换key中的空格和多余的 '
const replaceKey = /(\'|\s)/g;
const fileSource = argv.p;
const distPath = path.resolve(__dirname, argv.w);
// const fileSource = '/Users/houzhiqiang04/Desktop/error.log'
// const distPath = path.resolve(__dirname, './')



const file = fs.readFileSync(fileSource, 'utf8');
const resObj = {}
const splitRes = [...file.match(matchLogRegx)];

splitRes.forEach((item) => {
  const path = item.split(',')[0]?.replace(replaceKey, '');
  const value = item.split(',')[1];
  _.set(resObj, path, value)
});

// 将对象写入路径
fs.writeJSONSync(`${distPath}/res.json`, resObj)