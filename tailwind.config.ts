import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontSize: {
				'responsive-large': `clamp(24px, 
          calc(24px + (42 - 24) * 
            ((100vw - 768px) / (1150 - 768))
          ), 42px)`,
			},
		},
	},
	plugins: [],
};
export default config;
