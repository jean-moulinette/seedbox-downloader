import * as React from 'react';

import { Layout } from 'ui';

export default function FileExplorer() {
  const menuItems = [
    {
      label: 'Item 1',
      icon: (
        <span />
      ),
      separator: true,
      onClick: () => {
        alert('Item 1 clicked');
      },
    },
  ];

  return (
    <Layout.MainContent>
      <Layout.Menu items={menuItems} />
    </Layout.MainContent>
  );
}
