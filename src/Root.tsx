import { type Accessor, createContext, createSignal, type ParentComponent, type Setter, useContext } from "solid-js";

import { App } from "./App";

type ColorScheme = "light" | "dark";

interface ThemeContextValue {
    colorScheme: Accessor<ColorScheme>;
    setColorScheme: Setter<ColorScheme>;
    toggleColorScheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>();

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
    return ctx;
}

const ThemeProvider: ParentComponent = (props) => {
    const stored = globalThis.localStorage.getItem("color-scheme");
    const prefersDark = globalThis.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial: ColorScheme = stored === "dark" || stored === "light"
        ? stored
        : (prefersDark
            ? "dark"
            : "light");

    const [colorScheme, setColorScheme] = createSignal<ColorScheme>(initial);

    const toggleColorScheme = () => {
        const next = colorScheme() === "dark" ? "light" : "dark";
        document.documentElement.classList.add("no-transition");
        setColorScheme(next);
        globalThis.localStorage.setItem("color-scheme", next);
        // Force a reflow so the no-transition class takes effect, then remove it
        void document.documentElement.offsetHeight;
        document.documentElement.classList.remove("no-transition");
    };

    return (
        <ThemeContext.Provider value={{ colorScheme, setColorScheme, toggleColorScheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export function Root() {
    return (
        <ThemeProvider>
            <App />
        </ThemeProvider>
    );
}
