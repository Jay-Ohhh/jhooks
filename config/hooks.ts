export const menus = [
  {
    title: 'LifeCycle',
    children: ['useMount', 'useUnmount', 'useUnmountedRef'],
  },
  {
    title: 'State',
    children: [
      'useBoolean',
      'useToggle',
      'useLocalStorageState',
      'useSessionStorageState',
      'useCookieState',
      'useSafeState',
      'useGetState',
    ],
  },
  {
    title: 'Effect',
    children: ['useUpdateEffect', 'useUpdateLayoutEffect'],
  },
  {
    title: 'Advanced',
    children: ['useLatest', 'useMemoizedFn'],
  },
];
