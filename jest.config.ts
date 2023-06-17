import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.spec.json';

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	preset: 'jest-preset-angular',
	roots: ['<rootDir>/src'],
	modulePaths: [compilerOptions.baseUrl],
	testMatch: ['**/+(*.)+(spec).+(ts)'],
	setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
	collectCoverage: true,
	coverageReporters: ['html'],
	coverageDirectory: 'coverage',
	moduleNameMapper: pathsToModuleNameMapper(
		compilerOptions.paths
	),
};
export default config;
