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