import { DateTime } from "luxon";

export default {
  tags: [
    "posts",
  ],
  "layout": "layouts/post.njk",
  permalink: function ({title, date}) {
    const date_slug = DateTime.fromJSDate(date, { zone: "utc" }).toFormat('yyyy/LL/dd');
    return `/${date_slug}/${this.slugify(title)}/`;
  }
};
