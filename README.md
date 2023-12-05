# demo-cloudcannon-microblog

**Check out the [companion video to this project: Live Editing an Eleventy Project in CloudCannon with Bookshop](https://www.youtube.com/watch?v=AsWt6BTjzyk)**

## Features

* Supports live editing via CloudCannon. Included content block types:
	* HTML
	* Code (with [Eleventy’s Prism.js plugin](https://www.11ty.dev/docs/plugins/syntaxhighlight/))
	* Link (with [OpenGraph preview](https://www.11ty.dev/docs/services/opengraph/) and [`<browser-window>`](https://www.zachleat.com/web/browser-window/))
* Multiple author support with [IndieWeb avatars](https://www.11ty.dev/docs/services/indieweb-avatar/) (with override image option).
* Tagged posts and automated independent tag pages.
* Home page stream includes pagination.
* RSS feed at `/feed.xml`

## Usage

Requires [Node.js](https://nodejs.org/en).

```
npm install
npm run search-index
npm start
```

<!--

Stretch goals:

* Image gallery post type

-->