const LWCWebpackPlugin = require('lwc-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new LWCWebpackPlugin({
			namespace: {
				c: path.resolve('./src/lwc/app'),
			},
		}),
	]
};
