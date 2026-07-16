import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const activities = await getCollection("activities");

  return rss({
    title: "Farrel's Activity Log",
    description:
      "Dokumentasi project, kegiatan teknis, dan eksperimen sehari-hari.",
    site: context.site,
    items: activities
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((activity) => ({
        title: activity.data.title,
        description: activity.data.summary,
        pubDate: activity.data.date,
        link: `/kegiatan/${activity.id}/`,
        categories: [activity.data.category, ...activity.data.tags],
      })),
    customData: `<language>id-id</language>`,
  });
}
