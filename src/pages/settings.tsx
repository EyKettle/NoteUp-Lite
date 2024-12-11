import { Component, onMount } from "solid-js"
import { Page } from "../components/PageContainer"
import { invoke } from "@tauri-apps/api/core"
import { animations } from "../utils/animations";

interface SettingProps {
  path: string,
  setFilePath: (path: string) => void;
  switchSettings: () => void
}

const SettingPage: Component<SettingProps> = (props) => {
  onMount(() => {
    animations.slideIn(document.getElementById("settings-page") as HTMLElement);
  })
  
  const normalState = {
    opacity: 0,
    transform: "translateX(-60vw) translateY(-45vh) scale(0.2)",
    filter: "blur(16px)",
  }
  return (
    <Page id="settings-page" title="设定地址"
      motion={{
        initial: normalState,
        animate: {
          opacity: 1,
          transform: "translateX(0px) translateY(0px) scale(1)",
          filter: "blur(0px)",
        },
        exit: normalState,
        transition: {
          duration: 0.2,
          easing: [0.1, 0, 0, 1],
        },
      }}
    >
      <input type="text" value={props.path} onInput={(e) => props.setFilePath(e.currentTarget.value)}
        onchange={(e) => props.setFilePath(e.currentTarget.value)}
        style={{
          width: "80vw",
        }}
      />
      <button style={{
        color: "var(--color-accent)",
        "font-size": "18px",
        width: "100px",
      }} onClick={async () => {
        if (await invoke("file_exists", { path: props.path })) {
          props.setFilePath(props.path)
          props.switchSettings();
        } else {
          alert(`文件 ${props.path} 不存在`)
        }
      }}>读取</button>
    </Page>
  );
}

export default SettingPage;