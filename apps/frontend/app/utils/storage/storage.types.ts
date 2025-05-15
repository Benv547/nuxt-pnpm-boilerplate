type StorageObjectMap = {
  appSession: {
    idUser: string;
    accessToken: string;
    refreshToken: string;
    expiresDate: number;
  };
};

export type StorageObjectType = 'appSession';

export type StorageObjectData<T extends StorageObjectType> = {
  type: T;
  data: StorageObjectMap[T];
};
