import { ActionIcon, ColorScheme, Group, MantineProvider, Text } from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { version } from "esbuild-wasm/package.json";

import { App } from "./App";

export function Root() {
    const preferredColorScheme = useColorScheme();
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: "mantine-color-scheme",
        defaultValue: preferredColorScheme,
        getInitialValueInEffect: true,
    });
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ colorScheme }}
        >
            <div style={{ position: "absolute", top: 0, right: 0, margin: "1rem", zIndex: 1 }}>
                <Group>
                    <Text component="a" href="https://esbuild.github.io/">
                        esbuild v{version}
                    </Text>
                    <ActionIcon
                        variant="outline"
                        onClick={() => toggleColorScheme()}
                        size="lg"
                        sx={(theme) => ({
                            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
                            color: theme.colorScheme === "dark" ? theme.colors.yellow[4] : theme.colors.blue[6],
                        })}
                    >
                        {colorScheme === "dark" ? <IconSun size={18} /> : <IconMoonStars size={18} />}
                    </ActionIcon>
                </Group>
            </div>
            <App />
        </MantineProvider>
    );
}
