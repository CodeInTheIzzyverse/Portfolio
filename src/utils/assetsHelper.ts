export function normalizeName(name: string) {
    return name
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/#/g, 's')
        .replace(/[^a-z0-9]/g, '');
}

const assetGlobs = {
    'skills': import.meta.glob('./../assets/skills/*.{png,svg,jpg,jpeg,webp}', { query: '?url', import: 'default', eager: true }) as Record<string, string>,
    'education/icons': import.meta.glob('./../assets/education/icons/*.{png,svg,jpg,jpeg,webp}', { query: '?url', import: 'default', eager: true }) as Record<string, string>,
    'education/certificates': import.meta.glob('./../assets/education/certificates/*.{pdf,PDF}', { query: '?url', import: 'default', eager: true }) as Record<string, string>,
    'projects/images': import.meta.glob('./../assets/projects/images/*.{png,svg,jpg,jpeg,webp}', { query: '?url', import: 'default', eager: true }) as Record<string, string>,
    'projects/miniatures': import.meta.glob('./../assets/projects/miniatures/*.{png,svg,jpg,jpeg,webp}', { query: '?url', import: 'default', eager: true }) as Record<string, string>
};

type AssetKey = keyof typeof assetGlobs;

export function getAssets(key: AssetKey, opts?: { normalizeKeys?: boolean }) {
    const assets = assetGlobs[key] ?? {};
    return Object.fromEntries(
        Object.keys(assets).flatMap(path => {
            const file = path.split('/').pop()!;
            const id = file.replace(/\.(png|svg|jpg|jpeg|webp|pdf)$/i, '');
            const entries: Array<[string, string]> = [];

            const keyId = opts?.normalizeKeys ? normalizeName(id) : id;
            entries.push([keyId, assets[path]]);

            if (file !== keyId) {
                entries.push([file, assets[path]]);
            }

            return entries;
        })
    ) as Record<string, string>;
}