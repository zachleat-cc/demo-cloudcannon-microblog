module.exports = {
	tags: "posts",
	layout: "post.liquid",
	eleventyComputed: {
		metadata: {
			title: function (data) {
				return `Microblog → ${this.readableDate(data.created_date)}`;
			},
			titleHtml: function (data) {
				return `<a href="/">Microblog</a> → ${this.readableDate(data.created_date)}`;
			},
		}
	}
}