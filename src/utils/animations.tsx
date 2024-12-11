import { animate } from "motion";

export const animations = {
    slideIn: (element: HTMLElement) => {
        let elements = element.children;
        if (elements) {
            for (let i = 0; i < elements.length; i++) {
                animate(
                    elements[i],
                    {
                        scale: [0.6, 1],
                    },
                    {
                        delay: i * 0.05,
                        duration: 0.3,
                        ease: [.5, 0, 0, 1],
                    }
                );
                animate(
                    elements[i],
                    {
                        x: [-240, 0],
                    },
                    {
                        delay: i * 0.05,
                        duration: 0.3,
                        ease: [0, 0, 0, 1],
                    }
                );
                animate(
                    elements[i],
                    {
                        y: [-120, 0],
                    },
                    {
                        delay: i * 0.05,
                        duration: 0.2,
                        ease: [0.5, 0, 0, 1],
                    }
                );
            }
        }
    }
};