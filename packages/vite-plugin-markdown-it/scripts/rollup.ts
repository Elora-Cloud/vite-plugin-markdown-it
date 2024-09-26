import type { ProjectManifest } from '@pnpm/types';
import pkg from '../package.json';

export function getPackageManifest(pkgPath: string) {
  // eslint-disable-next-line ts/no-require-imports
  return require(pkgPath) as ProjectManifest;
}

export function getPackageDependencies(pkgPath: string): Record<'dependencies' | 'peerDependencies', string[]> {
  const manifest = getPackageManifest(pkgPath);
  const { dependencies = {}, peerDependencies = {} } = manifest;

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  };
}

export async function generateExternal(options: { full: boolean }) {
  const { dependencies, peerDependencies } = pkg;

  return (id: string) => {
    const packages: string[] = [...Object.keys(peerDependencies)];
    if (!options.full)
      packages.push('@vue', ...Object.keys(dependencies));

    return [...new Set(packages)].some(pkg => id === pkg || id.startsWith(`${pkg}/`));
  };
}
