import { get } from "svelte/store";
import { settings } from "./settings.svelte";

export async function createDiscordNotification(description: string) {
    const currentSettings = get(settings);

    const discordWebhookURL = currentSettings?.discordWebhookURL;

    if (!discordWebhookURL) {
        return;
    }

    try {
        await fetch(discordWebhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "content": null,
                "embeds": [
                  {
                    "description": description,
                    "color": 3417656,
                    "author": {
                      "name": "Pastol",
                      "url": "https://ghervis.github.io/pastol/",
                      "icon_url": "https://raw.githubusercontent.com/ghervis/pastol/gh-pages/pastol.png"
                    }
                  }
                ],
                "attachments": []
              })
        });
    } catch (e) {
        console.error(e);
    }
} 