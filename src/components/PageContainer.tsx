import { Component, createEffect, createMemo, createSignal, Show } from "solid-js";
import { Motion, Presence } from "solid-motionone";
import HomePage from "../pages/home";
import SettingPage from "../pages/settings";

interface ContainerProps {
    showSettings: boolean;
    path: string,
    customCommands: {
        readFile: (path: string) => Promise<string>,
        setFilePath: (path: string) => void,
        switchSettings: () => void
    };
}

export const PageContainer: Component<ContainerProps> = (props) => {
    const [ifShow, setIfShow] = createSignal(false);

    createEffect(() => {
        let bool = ifShow();
        console.log(bool);
    });
    
    const currentStyle = createMemo(() => {
        if (props.showSettings) {
            setIfShow(true);
            return {
                opacity: 0,
                transform: "scale(0.8)",
                filter: "blur(16px)",
            };
        } else {
            setIfShow(false);
            return {
                opacity: 1,
                transform: "scale(1)",
                filter: "blur(0)",
            };
        }
    });

    return (
        <>
            <div class="page-container">
                <HomePage
                    path={props.path}
                    readFile={props.customCommands.readFile}
                    styleState={currentStyle()}
                />
                <Presence exitBeforeEnter>
                    <Show
                        when={ifShow()}
                    >
                        <SettingPage path={props.path}
                            setFilePath={props.customCommands.setFilePath}
                            switchSettings={props.customCommands.switchSettings}
                        />
                    </Show>
                </Presence>
                {/* {currentPage()}
                { previousIndex() != null ? previousPage() : null } */}
            </div>
        </>
    );
}

interface PageProps {
    id: string,
    title: string,
    content?: string,
    children?: any,
    style?: {
        isFloat?: boolean
        align?: 'start' | 'center' | 'end'
        inset?: string
    }
    motion?: {
        initial?: any
        animate?: any
        exit?: any
        transition?: any
    }
}

const Page: Component<PageProps> = (props) => {
    const pageClass = `page${props.style && props.style.isFloat ? ' float' : ''}`;
    return (
        <Motion id={props.id} class={pageClass} innerHTML={props.content}
            style={{
                "justify-items": props.style && props.style.align ? props.style.align : 'center',
                "text-align": props.style && props.style.align ? props.style.align : 'center',
                inset: props.style && props.style.inset ? props.style.inset : '0',
            }}
            initial={props.motion && props.motion.initial}
            animate={props.motion && props.motion.animate}
            exit={props.motion && props.motion.exit}
            transition={props.motion && props.motion.transition}
        >
            {!props.content && <h1>{props.title}</h1>}
            {!props.content && props.children}
        </Motion>
    );
}

export { Page };