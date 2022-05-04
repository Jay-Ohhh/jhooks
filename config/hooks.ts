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
      'useSet',
      'useMap',
      'usePrevious',
      'useRafState',
      'useSafeState',
      'useGetState',
    ],
  },
  {
    title: 'Effect',
    children: ['useUpdateEffect', 'useUpdateLayoutEffect', 'useAsyncEffect'],
  },
  {
    title: 'Advanced',
    children: ['useLatest', 'useMemoizedFn'],
  },
];
