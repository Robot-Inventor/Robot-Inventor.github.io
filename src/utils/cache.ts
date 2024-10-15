let cacheMap = new Map<string, any>();

const cache = <T>(key: string, factory: () => T): T => {
    if (!cacheMap.has(key)) {
        cacheMap.set(key, factory());
    }
    return cacheMap.get(key);
};

export { cache };
