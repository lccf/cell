import { ConfigProvider, TDesignConfig } from './config-protocol';
import { Component, Value, Autowired, Optional } from '@celljs/core';

@Component(ConfigProvider)
export class ConfigProviderImpl implements ConfigProvider {

    @Value('cell.tdesign.config')
    protected readonly tdesignConfig: TDesignConfig;

    @Autowired(TDesignConfig) @Optional()
    protected readonly tdesignConfig2: TDesignConfig;

    provide(): TDesignConfig {
        return { ...this.tdesignConfig2, ...this.tdesignConfig };
    }

}
