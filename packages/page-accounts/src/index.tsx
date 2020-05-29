// Copyright 2017-2020 @polkadot/app-accounts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { AppProps as Props } from '@polkadot/react-components/types';

import React, { useMemo } from 'react';
import { Route, Switch } from 'react-router';
import { useAccounts } from '@polkadot/react-hooks';
import { HelpOverlay, Tabs } from '@polkadot/react-components';

import basicMd from './md/basic.md';
import { useTranslation } from './translate';
import useCounter from './useCounter';
import Accounts from './Accounts';
import Contacts from './Contacts';
import Vanity from './Vanity';

export { useCounter };

function AccountsApp ({ basePath, isElectron, onStatusChange }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { hasAccounts } = useAccounts();
  const items = useMemo(() => [
    {
      isRoot: true,
      name: 'overview',
      text: t<string>('My accounts')
    },
    {
      name: 'contacts',
      text: t<string>('My contacts')
    },
    {
      name: 'vanity',
      text: t<string>('Vanity generator')
    }
  ], [t]);
  const hidden = useMemo(
    () => hasAccounts ? [] : ['vanity'],
    [hasAccounts]
  );

  return (
    <main className='accounts--App'>
      <HelpOverlay md={basicMd as string} />
      <header>
        <Tabs
          basePath={basePath}
          hidden={hidden}
          items={items}
        />
      </header>
      <Switch>
        <Route path={`${basePath}/contacts`}>
          <Contacts
            basePath={basePath}
            onStatusChange={onStatusChange}
          />
        </Route>
        <Route path={`${basePath}/vanity`}>
          <Vanity
            basePath={basePath}
            onStatusChange={onStatusChange}
          />¨
        </Route>
        <Route>
          <Accounts
            basePath={basePath}
            isElectron={isElectron}
            onStatusChange={onStatusChange}
          />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(AccountsApp);
