import "./App.css";
import { createSignal, onMount } from "solid-js";
import { open } from "@tauri-apps/plugin-shell"
import { invoke } from "@tauri-apps/api/core";

import AppWindow from "./components/AppWindow";
import { PageContainer } from "./components/PageContainer";

function App() {
  const [showSettings, setShowSettings] = createSignal(false);
  
  const handleSettingsClick = () => {
    setShowSettings(!showSettings());
  };

  onMount(() => {
    document.addEventListener('click', async (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link?.href && !link.href.startsWith('javascript:')) {
        e.preventDefault();
        await open(link.href);
      }
    });
    document.addEventListener('contextmenu', e => e.preventDefault());
  });
  
  const [path, setPath] = createSignal("");
  const readFile = async (path: string): Promise<string> => {
    return (await invoke("read_file", { path }));
  }
  const setFilePath = async (path: string) => {
    setPath(path);
  }

  return (
    <AppWindow title="Noteup Lite (只读)" showSettings={handleSettingsClick}>
      <PageContainer showSettings={showSettings()} path={path()} customCommands={{
        readFile: readFile,
        setFilePath: setFilePath,
        switchSettings: handleSettingsClick 
      }}/>
    </AppWindow>
  );
}

export default App;