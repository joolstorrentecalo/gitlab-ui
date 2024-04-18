#!/usr/bin/env node

const fs = require('node:fs');
const { join } = require('node:path');
const { glob } = require('glob');
const prettier = require('prettier');

const JS_FILE = join(__dirname, '..', `./src/translations.js`);
const JSON_FILE = join(__dirname, '..', `translations.json`);

const getFilesToParse = async () => {
  return glob('./src/**/*.{js,vue}', {
    nodir: true,
    ignore: {
      ignored: (p) => /\.(stories|spec)\.js$/.test(p.name),
    },
  });
};

const getFindings = (files) => {
  return files.reduce((findings, file) => {
    const content = fs.readFileSync(file).toString();
    const matches = [...content.matchAll(/translate\('(.*)', '(.*)'\)/g)];
    if (matches.length) {
      matches.forEach((match) => {
        const [, translationKey, defaultTranslation] = match;
        findings.push([translationKey, defaultTranslation]);
      });
    }
    return findings;
  }, []);
};

const buildObject = (findings) => {
  const translations = Object.fromEntries(findings);
  return prettier.format(JSON.stringify(translations), { parser: 'json', filePath: JSON_FILE });
};

const toJS = async (translations) => {
  const options = await prettier.resolveConfig(JS_FILE);

  return prettier.format(
    `
    // This file is generated, please run: ./bin/collect_translations.js
    // instead of editing it directly
    // eslint-disable-next-line import/no-default-export
    export default ${translations}`,
    { ...options, filePath: JS_FILE, parser: 'babel' }
  );
};

const main = async () => {
  const filesToParse = await getFilesToParse();
  const findings = await getFindings(filesToParse);
  const translations = buildObject(findings);
  const jsTranslations = await toJS(translations);

  fs.writeFileSync(JSON_FILE, translations);
  fs.writeFileSync(JS_FILE, jsTranslations);
};

main();
