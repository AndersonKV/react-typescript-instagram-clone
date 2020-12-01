interface User {
  email: string;
  name_complete: string;
  profile_picture: string;
  user: string;
  my_following: string;
  my_follower: string;
  my_posts: string;
  _id: string;
}

interface Hashtag {
  name: string;
  quantity: string;
}

export function changeHandleIconLike(
  heartIcon: any,
  removeClassHeartIcon: any,
  classAdd: any
) {
  heartIcon.querySelector("i").remove();

  heartIcon.classList.remove(removeClassHeartIcon[0]);
  heartIcon.classList.add(removeClassHeartIcon[1]);

  const i = document.createElement("i");
  i.classList.add(classAdd[0], classAdd[1]);

  heartIcon.appendChild(i);
}

export function addLiked(count: number, infoAboutLike: Element) {
  const liked = count === 1 ? "uma pessoa curtiu" : null;

  const resp =
    liked === null && Number(count) > 1
      ? count + " pessoa(s) curtiram"
      : (liked as string);

  infoAboutLike.innerHTML = resp;
}
export function createCommentary(element: any, text: any, user: any) {
  element.parentElement.querySelector("textarea").value = "";

  let stringFormatedforHash: any = [];

  for (let i = 0; i < text.length; i++) {
    let hash = text.split(" ");

    for (let t = 0; t < hash.length; t++) {
      if (hash[t][0] === "#") {
        const str = hash[t].substring(1);

        hash[t] = `<a href="/explore/tags/${str}">${hash[t]}</a>`;
      }
    }
    stringFormatedforHash = hash.join(" ");
  }

  const string = `<span>
                    <a href="${user && user.user}">${user && user.user}</a>
                  </span>
                  <span>${stringFormatedforHash}</span>
                  `;

  const div = document.createElement("div");

  div.innerHTML = string;

  console.log(text);
  div.classList.add("posts-from-user");

  element.parentElement.querySelector(".commentary-post").appendChild(div);
}

export function handleErrorImage(
  event: React.SyntheticEvent<HTMLImageElement, Event>
) {
  let image = event.nativeEvent.srcElement as HTMLImageElement;
  let error = "https://miro.medium.com/max/3840/1*uRziGU1OJNWawGusbZLxvQ.png";
  image.src = error;
}

export const listSearch = (
  creationElement: string,
  setClass: string,
  objectPass: string,
  value: any
) => {
  const url = `http://localhost:3333/uploads`;

  const section = document.createElement("section");
  section.classList.add(setClass);

  const arr = Array();

  if (objectPass === "users") {
    value.forEach((element: User) => {
      const div = document.createElement("div");
      const img = document.createElement("img");

      img.src = `${url}/${element.profile_picture}`;

      const span = document.createElement("span");
      span.innerText = element.user;
      const a = document.createElement("a");
      a.href = `/profile/${element.user}`;

      a.append(img, span);
      div.append(a);
      arr.push(div);
    });
  }

  if (objectPass === "posts") {
    value.forEach((element: Hashtag) => {
      const div = document.createElement("div");
      const h3 = document.createElement("h3");

      h3.innerText = element.name;

      const h5 = document.createElement("h5");
      h5.innerText = element.quantity + " publicações";

      const a = document.createElement("a");

      a.href = `/explore/tags/${element.name}`;
      a.append(h3, h5);
      div.append(a);
      arr.push(div);
    });
  }

  for (let i = 0; i < arr.length; i++) {
    section?.appendChild(arr[i]);
  }

  return section;
};

export const nothingWasFound = () => {
  const section = document.createElement("section");
  const div = document.createElement("div");
  const h3 = document.createElement("h3");

  section.classList.add("nothing");
  h3.innerText = "Nenhum resultado encontrado";

  div.append(h3);
  section.append(div);

  return section;
};
