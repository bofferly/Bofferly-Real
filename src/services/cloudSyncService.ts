// Mock Cloud & Local Storage Persistence Synchronization Service

export interface SyncPayload {
  bookmarks: any[];
  hadiths: any[];
  lastUpdated: string;
  version: string;
}

export interface SyncResult {
  success: boolean;
  timestamp: string;
  itemCount: number;
  message: string;
}

const MOCK_CLOUD_STORAGE_KEY = 'bofferly_mock_cloud_storage_v1';
const MOCK_LOCAL_CACHE_KEY = 'bofferly_local_sync_cache_v1';

export const syncUserDataToCloud = async (
  bookmarks: any[],
  hadiths: any[]
): Promise<SyncResult> => {
  // Simulate network latency for cloud sync
  await new Promise((resolve) => setTimeout(resolve, 800));

  const payload: SyncPayload = {
    bookmarks,
    hadiths,
    lastUpdated: new Date().toISOString(),
    version: '1.2.0',
  };

  try {
    // 1. Sync to simulated cloud database / cache
    localStorage.setItem(MOCK_CLOUD_STORAGE_KEY, JSON.stringify(payload));
    
    // 2. Sync to local fallback snapshot
    localStorage.setItem(MOCK_LOCAL_CACHE_KEY, JSON.stringify(payload));

    return {
      success: true,
      timestamp: new Date().toLocaleTimeString(),
      itemCount: bookmarks.length + hadiths.length,
      message: 'Bookmarks and saved content successfully synced to Cloud Backup',
    };
  } catch (err) {
    console.error('Cloud Sync Failed:', err);
    return {
      success: false,
      timestamp: new Date().toLocaleTimeString(),
      itemCount: 0,
      message: 'Failed to sync with Cloud Backup service',
    };
  }
};

export const fetchCloudBackupData = (): SyncPayload | null => {
  try {
    const raw = localStorage.getItem(MOCK_CLOUD_STORAGE_KEY) || localStorage.getItem(MOCK_LOCAL_CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};
