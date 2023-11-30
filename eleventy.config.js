const path = require("node:path");
const fs = require("node:fs");

const { DateTime } = require("luxon");
const pluginBookshop = require("@bookshop/eleventy-bookshop");
const Image = require("@11ty/eleventy-img");
const { pairedShortcode: syntaxHighlight } = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
	/* Bookshop */
	eleventyConfig.addPlugin(pluginBookshop({
		bookshopLocations: ["_component-library"]
	}));

	// Rebuild on Bookshop changes
	eleventyConfig.addWatchTarget("./_component-library/**/*");

	/* Passthrough Copy */
	eleventyConfig.addPassthroughCopy({
		"public/*": "/public/",
		"node_modules/@11ty/is-land/is-land.js": "/public/is-land.js",
		"node_modules/@zachleat/browser-window/browser-window.js": "/public/browser-window.js",
		"node_modules/@zachleat/pagefind-search/pagefind-search.js": "/public/pagefind-search.js",
		"node_modules/prismjs/themes/prism-okaidia.css": "/public/prism-okaidia.css",
	});

	/* Images */
	eleventyConfig.addFilter("embedFavicon", async function(filepath, alt) {
		let metadata = await Image(path.join("./src/", filepath), {
			widths: [64],
			formats: ["png"],
			outputDir: "./_site/optimized/",
			urlPath: "/optimized/",
		});

		let imageAttributes = {
			alt,
			class: "c-avatar",
			loading: "lazy",
			decoding: "async",
		};

		// You bet we throw an error on a missing alt (alt="" works okay)
		return Image.generateHTML(metadata, imageAttributes);
	});

	/* Syntax Highlighter */
	eleventyConfig.addFilter("syntaxHighlight", (code, language) => {
		return syntaxHighlight(code, (language || "").toLowerCase());
	});

	/* Urls */
	eleventyConfig.addFilter("isValidUrl", (url) => {
		try {
			new URL(url);
			return true;
		} catch(e) {
			return false;
		}
	});

	/* Dates */
	function readableDate(dateObj, format) {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format || "dd LLLL yyyy");
	}

	eleventyConfig.addFilter("readableDate", readableDate);

	eleventyConfig.addFilter("dateToHtml", (dateObj, format) => {
		if(!dateObj) {
			return "";
		}

		let attrDateStr = dateObj.toISOString();
		// TODO localize this clientside using Intl.DateTimeFormat
		format = format ||  "dd LLL yyyy — t ZZZZ";
		return `<time datetime="${attrDateStr}">${readableDate(dateObj, format)}</time>`;
	});

	/* RSS Filters for Liquid */
	eleventyConfig.addLiquidFilter("dateToRfc3339", pluginRss.dateToRfc3339);
	eleventyConfig.addLiquidFilter("dateToRfc822", pluginRss.dateToRfc822);
	eleventyConfig.addLiquidFilter("absoluteUrl", pluginRss.absoluteUrl);
	eleventyConfig.addLiquidFilter("convertHtmlToAbsoluteUrls", pluginRss.convertHtmlToAbsoluteUrls);

	/* Optional site mounting for CloudCannon theme */
	if(fs.existsSync("./_includes/marketing-components/base.liquid")) {
		eleventyConfig.addLayoutAlias("base", "marketing-components/base.liquid");
		eleventyConfig.addPlugin(require("./_includes/marketing-components/eleventySharedConfig.js"));
	} else {
		eleventyConfig.addLayoutAlias("base", "default-base.liquid");
	}

	return {
		dir: {
			input: "src",
			includes: "../_includes/",
		}
	}
};
