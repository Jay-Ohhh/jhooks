import { useEffect, useState } from 'react';

export interface NetworkState {
  since?: Date; // online 或 offline 最后改变时间
  online?: boolean; // 网络是否为在线
  rtt?: number; // 当前连接下评估的往返时延
  type?: string; // 设备使用与所述网络进行通信的连接的类型
  downlink?: number; // 有效带宽估算（单位：兆比特/秒）
  saveData?: boolean; // 用户代理是否设置了减少数据使用的选项
  downlinkMax?: number; // 最大下行速度（单位：兆比特/秒）
  effectiveType?: string; // 	网络连接的类型
}

enum NetworkEventType {
  ONLINE = 'online',
  OFFLINE = 'offline',
  CHANGE = 'change',
}
navigator.connection;
function getConnection() {
  const nav = navigator as any;
  if (typeof nav !== 'object') return null;
  return nav.connection || nav.mozConnection || nav.webkitConnection;
}

function getConnectionProperty(): NetworkState {
  const c = getConnection();
  if (!c) return {};
  return {
    rtt: c.rtt,
    type: c.type,
    saveData: c.saveData,
    downlink: c.downlink,
    downlinkMax: c.downlinkMax,
    effectiveType: c.effectiveType,
  };
}

function useNetwork(): NetworkState {
  const [state, setState] = useState(() => {
    return {
      since: undefined,
      online: navigator?.onLine,
      ...getConnectionProperty(),
    };
  });

  useEffect(() => {
    const onOnline = () =>
      setState((prevState) => ({
        ...prevState,
        online: true,
        since: new Date(),
      }));

    const onOffline = () =>
      setState((prevState) => ({
        ...prevState,
        online: false,
        since: new Date(),
      }));

    const onConnectionChange = () =>
      setState((prevState) => ({
        ...prevState,
        ...getConnectionProperty(),
      }));

    window.addEventListener(NetworkEventType.ONLINE, onOnline);
    window.addEventListener(NetworkEventType.OFFLINE, onOffline);

    const connection = getConnection();
    connection?.addEventListener(NetworkEventType.CHANGE, onConnectionChange);

    return () => {
      window.removeEventListener(NetworkEventType.ONLINE, onOnline);
      window.removeEventListener(NetworkEventType.OFFLINE, onOffline);
      connection?.removeEventListener(NetworkEventType.CHANGE, onConnectionChange);
    };
  }, []);

  return state;
}

export default useNetwork;
