let cacheMap = new Map<string, any>();

const cache = (key: string, factory: () => any) => {
    if (!cacheMap.has(key)) {
        cacheMap.set(key, factory());
    }
    return cacheMap.get(key);
};

export { cache };
