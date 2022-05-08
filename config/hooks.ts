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
      'useDebounce',
      'useThrottle',
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
    children: [
      'useUpdateEffect',
      'useUpdateLayoutEffect',
      'useAsyncEffect',
      'useDebounceFn',
      'useDebounceEffect',
      'useThrottleFn',
      'useThrottleEffect',
    ],
  },
  {
    title: 'Dom',
    children: ['useEventListener', 'useExternal'],
  },
  {
    title: 'Advanced',
    children: ['useLatest', 'useMemoizedFn'],
  },
];
