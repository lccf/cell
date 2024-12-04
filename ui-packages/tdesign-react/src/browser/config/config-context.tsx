import * as React from 'react';
import { Context } from '@celljs/react';
import { ConfigProvider as Provider, CONFIG_REACT_CONTEXT_PRIORITY } from './config-protocol';
import { Autowired } from '@celljs/core/lib/common/annotation/detached';
import { ConfigProvider } from 'tdesign-react';

@Context()
export class ConfigContext extends React.Component<React.PropsWithChildren> {

    static priority = CONFIG_REACT_CONTEXT_PRIORITY;

    @Autowired(Provider)
    protected readonly provider: Provider;

    override render(): React.ReactNode {
        const { children } = this.props;
        return (
            <ConfigProvider globalConfig={{...this.provider.provide()}}>
                {children}
            </ConfigProvider>);
    }
}

