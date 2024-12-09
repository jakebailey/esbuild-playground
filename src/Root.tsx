import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";

import { App } from "./App";

export function Root() {
    const preferredColorScheme = useColorScheme();
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: "mantine-color-scheme",
        defaultValue: preferredColorScheme,
        getInitialValueInEffect: true,
    });
    const toggleColorScheme = (value?: ColorScheme) => {
        setColorScheme(value ?? (colorScheme === "dark" ? "light" : "dark"));
    };

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{ colorScheme }}
            >
                <App />
            </MantineProvider>
        </ColorSchemeProvider>
    );
}
