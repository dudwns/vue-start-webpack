const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  resolve: {
    extensions: [".vue", ".js"], // 작성한 확장자는 생략
    alias: {
      "~": path.resolve(__dirname, "src"), // 경로 별칭 지정,
    },
  },
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/", // 빌드된 파일들을 루트 경로에서 접근
    clean: true, // 빌드할 때 dist라는 폴더를 삭제하고 결과를 재생성
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // node_modules는 babel 변환에서 제외
        use: "babel-loader"
      },
      {
        test: /\.vue$/, // .vue로 끝나는 파일의 유무를 확인. 정규 표현식으로 기입
        use: "vue-loader", // .vue 확장자 파일이 있으면 vue-loader라는 패키지의 도움을 받아서 해석한다.
      },
      {
        test: /\.s?css$/, // s가 있거나 없거나 읽음
        use: ["vue-style-loader", "css-loader", "sass-loader"], // 여러 개니까 배열로 명시, 순서 중요
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HTMLPlugin({ template: path.resolve(__dirname, "src/index.html") }),
    new CopyPlugin({
      patterns: [
        { from: "static" }, // static 폴더를 복사해서 dist 폴더에 넣어줌, to는 생략하면 output의 path로 지정됨
      ],
    }),
  ], // 플러그인 등록
  devServer: {
    historyApiFallback: true // SPA의 기본 페이지로 /index.html로 지정
  }
};
