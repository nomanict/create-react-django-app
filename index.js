#!/usr/bin/env node

const path = require('path')
const fs = require('fs')

const cwd = process.cwd()
const basename = path.basename(cwd)

const react_module = [
    'react',
    'react-dom'
]
const tailwindcss_mdule = [
    'css-loader',
    'mini-css-extract-plugin',
    'postcss-cli',
    'postcss-loader',
    'tailwindcss',
    'autoprefixer'
]
const webpack_module = [
    'webpack',
    'webpack-cli'
]
const babel_module = [
    'babel-loader',
    '@babel/cli',
    '@babel/core',
    '@babel/plugin-transform-runtime',
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/runtime',
]
const ts_module = [
    'typescript',
    'ts-loader',
    '@types/react',
    '@types/react-dom',
    '@babel/preset-typescript'
]
const modules = [...webpack_module, ...babel_module, ...react_module, ...tailwindcss_mdule, ...ts_module]

const readFile = (...dirs) => {
    return fs.readFileSync(path.resolve(__dirname, 'file', ...dirs), 'utf-8')
}
const writeFile = (data, ...dirs) => {
    const filePath = path.join(cwd, ...dirs)
    const dirPath = path.dirname(filePath)
    if (dirs.length == 1) {
        fs.writeFileSync(filePath, data)
    } else {
        fs.mkdir(dirPath, (err) => {
            if (err) {
                fs.writeFileSync(filePath, data)
            } else {
                fs.writeFileSync(filePath, data)
            }
        })
    }
}
const findAndReplace = (data, searchValue, replaceValue) => {
    const sv = new RegExp(searchValue, 'g')
    if (data.includes(searchValue)) {
        return data.replace(sv, replaceValue)
    }
    return data
}



let package = readFile('package.json')
let req = readFile('req.txt')
let webpack = readFile('webpack.config.js')
let postcss = readFile('postcss.config.js')
let tailwindcss = readFile('tailwind.config.js')
let tsconfig = readFile('tsconfig.json')
let babelrc = readFile('.babelrc')
let appJS = readFile('src', 'App.js')
let indexJS = readFile("src", 'index.js')
let indexCSS = readFile("src", 'index.css')
let indexHTML = readFile('templates', 'index.html')


package = findAndReplace(package, '#basename', basename.toLowerCase())
webpack = findAndReplace(webpack, '#basename', basename)
indexHTML = findAndReplace(indexHTML, '#basename', basename)
indexJS = findAndReplace(indexJS, '#basename', basename)
req = findAndReplace(req, '#modules', modules.join(' '))

writeFile(package, 'package.json')
writeFile(req, 'requirement.txt')
writeFile(webpack, 'webpack.config.js')
writeFile(tsconfig, 'tsconfig.json')
writeFile(postcss, 'postcss.config.js')
writeFile(tailwindcss, 'tailwind.config.js')
writeFile(babelrc, '.babelrc')
writeFile(appJS, 'src', 'App.tsx')
writeFile(indexJS, 'src', `index.tsx`)
writeFile(indexCSS, 'src', `index.css`)
writeFile(indexHTML, 'templates', `${basename}.html`)