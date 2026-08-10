module.exports = {
    // oxlint-disable-next-line no-unused-vars
    target: (dependencyName, [{ semver, version, operator, major, minor, patch, release, build }]) => {
        if (major === "0") return "minor";
        return "latest";
    },
    // oxlint-disable-next-line no-unused-vars
    reject: (name, semver) => {
        return false;
    },
};
