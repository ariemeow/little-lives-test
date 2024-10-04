module.exports = {
	roots: ['<rootDir>/src'],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/?(*.)(spec|test).ts'],
	moduleFileExtensions: ['ts', 'js', 'json', 'node'],
	globals: {
		'ts-jest': {
			diagnostics: false,
		},
	},
	coverageThreshold: {
		global: {
			branches: 90,
			functions: 90,
			lines: 90,
		},
	},
	collectCoverageFrom: [
		'src/**/*.{ts,js}',
		'!src/**/*.(interface|constant|type|enum|model|repository|service|validator).{ts,js}',
		'!**/__mocks__/**',
		'!**/node_modules/**',
		'!src/modules/helpers/**',
		'!src/index.ts'
	],
};
