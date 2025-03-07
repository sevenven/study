module.exports = {
	entry: './src/index.ts',
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								javascriptEnabled: true
							}
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	}
};
