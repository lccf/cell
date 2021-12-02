import { ConfigUtil } from '@malagu/cli-common';
import { BuildContext, ConfigurationContext } from '@malagu/cli-service';
import { join } from 'path';
import { renameSync, writeFileSync, existsSync } from 'fs-extra';

const entryContent =  `
const app = require('./_index');
let target = app;
if (typeof app === 'object' && app.default) {
    target = app.default;
}
if (target && typeof target.listen === 'function') {
    const server = target.listen(PORT);
    if (typeof server === 'object') {
        server.timeout = 0;
        server.keepAliveTimeout = 0;
    }
    return;
}

if (typeof target === 'function') {
    target(PORT);
}
`;

export default async (context: BuildContext) => {
    const { cfg, configurations } = context;
    const configuration = ConfigurationContext.getBackendConfiguration(configurations);
    const outputPath = configuration?.output.get('path');
    const port = ConfigUtil.getBackendMalaguConfig(cfg).server?.port || 9000;
    const oldIndexPath = join(outputPath, 'index.js');
    const newIndexPath = join(outputPath, '_index.js');
    if (existsSync(oldIndexPath)) {
        renameSync(oldIndexPath, newIndexPath);
        writeFileSync(oldIndexPath, entryContent.replace(/PORT/g, port), { encoding: 'utf8' });
    }
};
