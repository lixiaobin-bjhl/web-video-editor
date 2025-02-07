module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: [
    ],
    rules: {
        /**
    * 禁止在正则表达式中使用空字符集
    */
        'no-empty-character-class': 2,
        /**
    * 禁止对 function 声明重新赋值
    */
        'no-func-assign': 2,
        /**
    * 用作代码块起始的左花括号 `{` 前必须有一个空格
    */
        'brace-style': 'off',
        'no-undef': 'off',
        'no-redeclare': 'off',
        'line-comment-position': 'off',
        /**
    * 使用驼峰拼写法命名
    */
        camelcase: [2, {
            properties: 'always',
            ignoreDestructuring: true,
            allow: ['__webpack_modules__']
        }],
        // /**
        //  * 强制使用大驼峰拼写法命名
        //  */
        // 'pascal-case': [2, {
        //     className: true
        // }],
        /**
    * `,` 前不允许出现空格，如果不位于行尾，`,` 后必须跟一个空格
    */
        'comma-spacing': [2, {
            before: false,
            after: true
        }],
        /**
    * 禁止在函数标识符和其调用之间有空格
    */
        'func-call-spacing': [2, 'never'],
        /**
    * 函数括号内使用一致的换行
    */
        'function-paren-newline': [2, 'multiline'],
        /**
    * 4 空格缩进
    */
        indent: [2, 4, {
            SwitchCase: 1,
            VariableDeclarator: 2,
            outerIIFEBody: 0,
            MemberExpression: 1,
            ArrayExpression: 1,
            ObjectExpression: 1,
            ImportDeclaration: 1
        }],
        /**
    * 关键字前后需要有空格
    */
        'keyword-spacing': [2, {
            before: true,
            after: true
        }],
        /**
    * 建议保留最后一行空行
    */
        'eol-last': 1,
        /**
    * 最大行字符 120
    */
        'max-len': [2, {
            code: 120,
            ignoreRegExpLiterals: true,
            ignoreTemplateLiterals: true,
            ignoreUrls: true,
            ignoreStrings: true
        }],
        /**
    * 禁止行尾空格
    */
        'no-trailing-spaces': [2, {
            skipBlankLines: false,
            ignoreComments: true
        }],
        /**
    * 建议使用单引号
    */
        quotes: [1, 'single'],
        'no-unused-vars': 'off',
        'max-len': 'off',
        /**
    * 禁用分号
    */
        semi: [2, 'never'], // 禁止使用分号
        /**
    * function 的左括号之前的空格
    * 具名函数无空格 function foo() {}
    * 匿名函数有空格 const bar = function () {}
    * 异步箭头函数有空格 const foo = async () => 1
    */
        'space-before-function-paren': [2, {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always'
        }],
        /**
    * 一元运算符与操作对象之间不允许有空格
    */
        'space-unary-ops': [2, {
            words: true,
            nonwords: false
        }],
        /**
    * 二元运算符左右两侧必须有空格
    */
        'space-infix-ops': [2, {
            int32Hint: true
        }],
        /**
    * 注释 `//` 和 `/*` 后必须跟一个空格
    */
        'spaced-comment': [2, 'always'],
        // /**
        //  * 汉字中间的英文字母，单词，阿拉伯数字左右两侧必须各加一个 空格，英文标点后跟一个空格
        //  */
        // 'comment-format': 2,
        /**
    * 多行注释风格
    */
        // 'multiline-comment-style': [2, 'never'],
        /**
    * 剩余和扩展运算符及其表达式之间禁止空格
    */
        'rest-spread-spacing': [2, 'never'],
        /**
    * 箭头函数的参数使用圆括号
    */
        'arrow-parens': [1, 'always'],
        /**
    * 箭头函数左右需要空格
    */
        'arrow-spacing': [2, {
            before: true,
            after: true
        }],
        /**
    * 强制 generator 函数中 * 与函数名相连
    * function *generator() {}
    * const anonymous = function *() {};
    * const shorthand = { *generator() {} };
    */
        'generator-star-spacing': [2, {
            before: true,
            after: false
        }],
        /**
    * 用作代码块起始的左花括号 `{` 前必须有一个空格
    */
        'space-before-blocks': [2, 'always'],
        /**
    * 禁止属性前有空白
    * foo. bar .baz . quz
    */
        'no-whitespace-before-property': 2,
        /**
    * 对象冒号左边没有空格，右边有空格
    */
        'key-spacing': [2, {
            beforeColon: false,
            afterColon: true,
            mode: 'strict'
        }],
        /**
    */
        /**
    * `if`、`else`、`for`、`do`、`while` 语句中，即使只有一行，也不得缺省块 `{...}`;
    */
        curly: [2, 'all'],
        /**
    * 运算符处换行时，运算符必须在新行的行首
    */
        'operator-linebreak': [2, 'before', {
            overrides: {
                '?': 'ignore',
                ':': 'ignore'
            }
        }],
        // /**
        //  * 禁用 var 声明变量
        //  */
        // 'var-disable': [2, 'always'],
        // /**
        //  * 枚举命名规范
        //  */
        // 'enum-case': 2,
        'no-mixed-spaces-and-tabs': 'off'
    }
}