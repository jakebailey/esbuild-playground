module.exports = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    target: (dependencyName, [{ semver, version, operator, major, minor, patch, release, build }]) => {
        if (dependencyName.startsWith("@mantine/")) return "minor";
        if (dependencyName === "@tabler/icons-react") return "minor";
        if (dependencyName === "react") return "minor";
        if (dependencyName === "@types/react") return "minor";
        if (dependencyName === "react-dom") return "minor";
        if (dependencyName === "@types/react-dom") return "minor";
        if (major === "0") return "minor";
        return "latest";
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reject: (name, semver) => {
        if (name === "tmp") {
            return true;
        }
        return false;
    },
};
