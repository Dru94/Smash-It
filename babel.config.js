
module.exports={
	"sourceType": "unambiguous",
	"presets":[ '@babel/preset-env'
	],
	"plugins":[
		["@babel/plugin-transform-runtime",
			{
				"regenerator": true,
				"corejs": 3
			}
		]
	],

};