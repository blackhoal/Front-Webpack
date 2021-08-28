# 1. npm init
    $ npm init -y
    $ npm install webpack webpack-cli --save-dev
- `install` => i / `--save-dev` => -D : 개발용 설치(devDependencies)

#
# 2. Webpack 설치 및 설정
- webpack.config.js
    - entry : 시작 관리
    - output : 만들어지는 최종 파일을 내보내는 옵션
    ```js
    const path = require('path');

    module.exports = {
        entry : './src/index.js', 
        output : {
            filename : 'main.js',
            path : path.resolve(__dirname, 'dist'),
        },
    }
    ```

- util.js
    ```js
    const add = (num1, num2) => {
        return num1 + num2;
    };

    function hello(name) {
        return name;
    }

    export { add, hello };
    ```

- index.js
    ```js
    import { hello, add } from "./util";

    const text = hello("나는 제이슨");
    const num = add(1, 2);

    document.getElementById('root').innerHTML = '제이슨'
    ```

- package.json
    ```json
    {
    ...
    "scripts": {
        // 추가
        "build": "webpack", 
        ...
    },
    ...
    }
    ```
    
- `$ npm run build`
    - 완료 후 dist 폴더에 main.js 파일이 생성된 것을 확인

- index.html
    ```html
    <body>
        <div id="root"></div>
        <!-- main.js 추가 -->
        <script src="./dist/main.js"></script> 
    </body>
    ```

#
# 3. html-webpack-plugin
- `$ npm i html-webpack-plugin`

- webpack.config.js
    ```js
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
        ...
        plugins : [
            new HtmlWebpackPlugin({
                template : './index.html',
            })
        ],
    }
    ```

- Terminal
    ```
    $ npm run build
    ```

#
# 4. webpack-dev-server
- `$ npm i webpack-dev-server -D`

- webpack.config.js
    ```js
    module.exports = {
        ...
        devServer: {
            static: {
            directory: path.resolve(__dirname, "dist"),
            },
            port: 8080,
        },
    }
    ```

- package.json
    ```json
    {
    ...
    "scripts": {
        "start": "webpack serve --open --mode=development",
        "build": "webpack --mode=production",
        ...
    },
    ...
    }
    ```

- `$ npm start`
- `$ npm run build`

#
# 5. CSS
- `$ npm i -D style-loader css-loader`
- webpack.config.js
    - use의 배열에서 뒤의 요소부터 읽으므로 `css-loader` - `style-loader` 순으로 적용
```js
module.exports = {
    ...
    module: {
        rules: [
          {
            test: /\.css$/,
            // use: ["style-loader", "css-loader"],
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
        ],
    },
    ...
}
```
- src/style.css 생성
    ```css
    body {
        background-color: #000;
        color: #fff;
    }
    ```
- src/header.css 생성
    ```css
    h1 {
        color: yellow;
    }   
    ```
- index.js 수정
```js
import { hello, add } from "./util";
import "./style.css";
import "./header.css";

const text = hello("<h1>나는 제이슨</h1>");
const num = add(1, 2);

document.getElementById('root').innerHTML = text + num;
```

#
# 6. mini-css-extract-plugin
- `$ npm i -D mini-css-extract-plugin`
- webpack.config.js
```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    ...
    module: {
        rules: [
          {
            ...
            // use: ["style-loader", "css-loader"],
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
        ],
      },
    plugins : [
        ...
        new MiniCssExtractPlugin({
            filename : "common.css",
        })
    ],
    ],
    ...
}

```
- `$ npm run build`

#
# 7. 이미지(file-loader)
- `$ npm i -D file-loader`
- src/images 폴더에 이미지 저장
- index.js
    ```js
    ...
    import "./images/yadon.png"

    ...
    const img = `<img src="${logo} alt="코딩앙마" />`;

    ...
    ```
- webpack.config.js
    ```js
    module.exports = {
        ...
        module: {
            rules: [
            ...
            {
                test: /\.jpg$/,
                use: ["file-loader"],
            },
            {
                test: /\.png$/,
                use: ["file-loader"],
            },
            ],
        },
        ...
    }
    ```
- index.js
    ```js
    ...
    import jpglogo from "./images/bale.jpg";
    import pnglogo from "./images/yadon.png";

    ...
    const jpg_img = `<img src="${jpglogo}" alt="jpg" />`;
    const png_img = `<img src="${pnglogo}" alt="png" />`;

    document.getElementById('root').innerHTML = jpg_img + png_img + text + num;
    ```

#
# 8. 예제
- index.js
    ```js
    import List from "./List";

    ...
    const users = [
        {
        id: 1,
        name: "블랙 위도우",
        },
        {
        id: 2,
        name: "아이언맨",
        },
        {
        id: 3,
        name: "헐크",
        },
        {
        id: 4,
        name: "스파이더맨",
        },
        {
        id: 5,
        name: "캡틴 아메리카",
        },
    ];
    
    // document.getElementById('root').innerHTML = jpg_img + png_img + text + num;
    document.getElementById("root").appendChild(List({ userList: users }));
    ```
- src/User.js 생성
    ```js
    import photo from "./images/yadon.png";
    import "./User.css";

    export default function User({ name }) {
    const li = document.createElement("li");
    li.classList.add("user");
    li.addEventListener("click", () => {
        alert(name);
    });
    li.innerHTML = `
            <img src="${photo}" alt="${name}" />
            ${name}
        `;
    return li;
    }
    ```
- src/List.js 생성
    ```js
    import User from "./User";

    export default function List({ userList }) {
    const ul = document.createElement("ul");
    userList.forEach(user => {
        ul.appendChild(User({ name: user.name }));
    });
    return ul;
    }
    ```
- src/User.css 생성
    ```css
    .user {
        font-size: 20px;
        margin-top: 10px;
        padding: 10px;
        background-color: #444;
    }
    ```

#
# 9. clean-webpack-plugin
- 빌드 폴더에 존재하는 목록 중 사용하지 않는 파일을 정리해주는 플러그인
- `$ npm i -D clean-webpack-plugin`
- webpack.config.js
    ```js
    const { CleanWebpackPlugin } = require("clean-webpack-plugin");

    module.exports = {
        ...
        plugins : [
            new HtmlWebpackPlugin({
                template : './index.html',
            }),
            new MiniCssExtractPlugin({
                filename : "common.css",
            }),
            new CleanWebpackPlugin(),
        ],
        ...
    }
    ```

# Reference
- [Youtube 코딩앙마](https://www.youtube.com/watch?v=zal9HVgrMaQ&t=914s)  