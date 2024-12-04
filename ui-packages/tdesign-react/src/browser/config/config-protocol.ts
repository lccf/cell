export const TDesignConfig = Symbol('TDesignConfig');
export const ConfigProvider = Symbol('ConfigProvider');

export const CONFIG_REACT_CONTEXT_PRIORITY = 2000;

export interface TDesignConfig {
    [key: string]: any
}

export interface ConfigProvider {

    provide(): TDesignConfig;

}
