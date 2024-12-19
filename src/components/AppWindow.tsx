import { Component, createSignal, onMount, Suspense } from 'solid-js';
import { Window } from '@tauri-apps/api/window';

const appWindow = new Window('main');

interface AppWindowProps {
  title?: string;
  children?: any;
  showSettings: () => void;
}

const AppWindow: Component<AppWindowProps> = (props) => {
  return (
    <div class="app-window">
      <TitleBar title={props.title} showSettings={props.showSettings}/>
      <div class="window-content">
        <Suspense fallback={<div>loading...</div>}>
          {props.children}
        </Suspense>
      </div>
    </div>
  );
};

interface TitleBarProps {
  title?: string;
  showSettings: () => void;
}

const TitleBar: Component<TitleBarProps> = (props) => {
  const [maximizeIcon, setMaximizeIcon] = createSignal("\u25FB");

  const updateMaximizeIcon = async () => {
    const isMaximized = await appWindow.isMaximized();
    setMaximizeIcon(isMaximized ? "\u25FC" : "\u25FB");
  };
  onMount(async () => {
    await appWindow.onResized(() => {
      updateMaximizeIcon();
    });
  });

  return (
    <div data-tauri-drag-region class="titlebar">
      <div class="titlebar-title">
        <label id='titlebar-title' on:click={() => {
            props.showSettings();
          }}>
          {props.title || 'Window'}
        </label>
      </div>
      <button
        class='titlebar-button'
        id='titlebar-min'
        onclick={() => appWindow.minimize()}
      >
        &#x2014;
      </button>
      <button
        class='titlebar-button'
        id='titlebar-max'
        onclick={async () => appWindow.toggleMaximize() }
        style={{
          "font-size": "21px"
        }}
      >
        { maximizeIcon() }
      </button>
      <button
        class='titlebar-close'
        id='titlebar-close'
        onclick={() => appWindow.close()}
        style={{
          "font-size": "17px"
        }}
      >
        &#x2715;
      </button>
    </div>
  );
};

export { TitleBar };
export default AppWindow;
