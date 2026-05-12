const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const commonFiles = ['background.js', 'popup.html', 'popup.js'];

function copyFile(from, to) {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const source = path.join(from, entry.name);
    const target = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copyDir(source, target);
    } else {
      copyFile(source, target);
    }
  }
}

function cleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function zipDir(sourceDir, zipPath) {
  fs.rmSync(zipPath, { force: true });
  execFileSync('zip', ['-r', zipPath, '.'], {
    cwd: sourceDir,
    stdio: 'inherit'
  });
}

function makeManifest(target) {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));

  if (target === 'firefox') {
    manifest.background = {
      scripts: ['background.js']
    };
    manifest.browser_specific_settings = {
      gecko: {
        id: 'secfetcher@jishangiras.com',
        data_collection_permissions: {
          required: ['none'],
          optional: []
        },
        strict_min_version: '121.0'
      }
    };
  } else {
    delete manifest.browser_specific_settings;
  }

  return `${JSON.stringify(manifest, null, 2)}\n`;
}

function buildTarget(target) {
  const buildDir = path.join(dist, target);
  cleanDir(buildDir);

  for (const file of commonFiles) {
    copyFile(path.join(root, file), path.join(buildDir, file));
  }

  copyDir(path.join(root, 'icons'), path.join(buildDir, 'icons'));
  fs.writeFileSync(path.join(buildDir, 'manifest.json'), makeManifest(target));

  zipDir(buildDir, path.join(dist, `secfetcher-${target}-v1.0.zip`));
}

cleanDir(dist);
buildTarget('edge');
buildTarget('firefox');

console.log('Built store packages in dist/');
