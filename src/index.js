import { hello, add } from "./util";
import "./style.css";
import "./header.css";
import jpglogo from "./images/bale.jpg";
import pnglogo from "./images/yadon.png";
import List from "./List";

const text = hello("<h1>나는 제이슨</h1>");
const num = add(1, 2);
const jpg_img = `<img src="${jpglogo}" alt="jpg" />`;
const png_img = `<img src="${pnglogo}" alt="png" />`;

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