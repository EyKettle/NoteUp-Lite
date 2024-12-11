import { Component, createEffect, createSignal } from "solid-js"
import Prism from 'prismjs';
import 'prismjs/components/prism-rust';
import 'prismjs/themes/prism.css';

import { Page } from "../components/PageContainer"

interface HomeProps {
  path: string,
  styleState?: {
    opacity?: number
    transform?: string
    filter?: string
  }
  readFile: (path: string) => Promise<string>
}

const HomePage: Component<HomeProps> = (props) => {
  const [content, setContent] = createSignal("<div style=\"position: absolute; inset: 0; bottom: 64px; justify-self: center; align-self: center; opacity: 0.6;\">等待读取</div>");
  createEffect(async() => {
    if (props.path) {
      let content = await props.readFile(props.path);
      setContent(content);
      let codes = document.getElementsByTagName("code");
      for (let i = 0; i < codes.length; i++) {
        let language = codes[i].parentElement?.getAttribute("lang")?.toLowerCase();
        if (language) {
          let html = Prism.highlight(codes[i].textContent as string, Prism.languages[language as string], language as string);
          codes[i].innerHTML = html;
          let langLabel = document.createElement("span");
          langLabel.classList.add("language-label");
          langLabel.textContent = language?.toUpperCase() || "PLAINTEXT";
          let parent = codes[i].parentElement;
          if (parent != null) {
            parent.style.paddingTop = "32px";
            parent.insertBefore(langLabel, codes[i]);
          }
        } else {
          codes[i].classList.add("language-plaintext");
          Prism.highlightElement(codes[i]);
        }
      }
  
      let tasks = document.getElementsByClassName("task-list-item");
      for (let i = 0; i < tasks.length; i++) {
        (tasks[i].children[0] as HTMLInputElement).disabled = false;
        tasks[i].addEventListener("click", (event) => {
          event.stopPropagation();
          event.preventDefault();
          (tasks[i].children[0] as HTMLInputElement).checked = !(tasks[i].children[0] as HTMLInputElement).checked;
        });
      }
    }
  });

  return (
    <Page id="home-page" title="首页" content={content()} style={{
      align: "start",
      inset: "0 32px"
    }}
      motion={{
        initial: {
          opacity: 0,
          transform: "scale(0.8) translateY(320px)",
          filter: "blur(16px)",
        },
        animate: {
          opacity: props.styleState?.opacity ?? 1,
          transform: props.styleState?.transform ?? "scale(1) translateY(0)",
          filter: props.styleState?.filter ?? "blur(0px)",
        },
        exit: {
          opacity: 0,
          transform: "scale(0.8) translateY(320px)",
          filter: "blur(16px)",
        },
        transition: {
          easing: [0.5, 0, 0, 1],
          duration: 0.3,
        }
      }}
    />
  );
}

export default HomePage;