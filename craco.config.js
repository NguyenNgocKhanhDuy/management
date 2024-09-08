module.exports = {
	babel: {
		plugins: [
			[
				"babel-plugin-module-resolver",
				{
					root: ["./src"],
					alias: {
						"~": "./src",
					},
				},
			],
		],
	},
};
