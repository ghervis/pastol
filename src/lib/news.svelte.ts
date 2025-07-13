import { writable } from "svelte/store";
import type { NewsType } from "../types";
import { fetchCache } from "./fetcher.svelte";

export const news = writable<NewsType[]>([]);

const _FETCH_TIMEOUT = 30000;

export async function fetchNews(): Promise<NewsType[]> {
    const rssFeedUrl = 'https://pastol-test-site.netlify.app/.netlify/functions/rss';

    let xml: string;

    try {
        xml = await fetchCache(rssFeedUrl, 'text', _FETCH_TIMEOUT);
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        return;
    }

    const parser = new DOMParser();
    const xmlDocument = parser.parseFromString(xml, 'text/xml');
    const items = xmlDocument.querySelectorAll('item');
    const newsArray: NewsType[] = Array.from(items).map((item) => {
        const title = item.querySelector('title').textContent;
        const description = item.querySelector('description').textContent;
        const link = item.querySelector('link').textContent;
        const pubDate = item.querySelector('pubDate').textContent;
        const author = item.querySelector('author')?.textContent || 'Unknown';
        const category = item.querySelector('category')?.textContent || 'Uncategorized';
        const mediaContentElement = item.getElementsByTagName('media:content')[0];
        const mediaContent = mediaContentElement ? mediaContentElement.getAttribute('url') : 'No media content';

        return { title, description, link, pubDate, author, category, mediaContent };
    });

    news.set(newsArray);

    return newsArray;
}