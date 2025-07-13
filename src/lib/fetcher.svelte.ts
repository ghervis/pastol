const _DEFAULT_FETCH_TIMEOUT = 10000;

export async function fetchCache(url: string, responseType: 'json' | 'text' = 'json', fetchTimeout: number = _DEFAULT_FETCH_TIMEOUT) {
    const storedSessionObjectString = sessionStorage.getItem(url);

    if (storedSessionObjectString) {
        const storedSessionObject = JSON.parse(storedSessionObjectString);
        if ((storedSessionObject.lastFetch + fetchTimeout )  > Date.now() && storedSessionObject.data) {
            return storedSessionObject.data;
        }
    }

    const response = await fetch(url);
    const data = await response[responseType]();

    sessionStorage.setItem(url, JSON.stringify({
        lastFetch: Date.now(),
        data
    }));

    return data;
}