import { VIEWED_POST_KEY } from '@/common/constants/storageKey';

export function setLocationStorageData(key: string, data: string) {
  window.localStorage.setItem(key, data);
}

export function getLocationStorageData(key: string): string | null {
  return window.localStorage.getItem(key);
}

export function getViewedPostIds(): string[] | undefined {
  const idsStr = getLocationStorageData(VIEWED_POST_KEY);
  return idsStr ? (JSON.parse(idsStr) as string[]) : undefined;
}

export function setViewedPostId(id: string) {
  const ids = getViewedPostIds();
  if (ids) {
    ids.push(id);
    setLocationStorageData(VIEWED_POST_KEY, JSON.stringify(ids));
    return;
  }
  setLocationStorageData(VIEWED_POST_KEY, JSON.stringify([id]));
}
