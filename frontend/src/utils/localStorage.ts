export const setLocalStorage = (key: string, value: any) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const getLocalStorage = (key: string) => {
    if (process.browser) {
        const value = localStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
    }
    return null;
};

export const removeLocalStorage = (key: string) => {
    if (process.browser) {
        localStorage.removeItem(key);
    }
};