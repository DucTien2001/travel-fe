export enum EKey {
  TOKEN = 'token',
  REFRESH_TOKEN = 'refresh_token'
}

export interface OptionItem<T=number> {
  id: T | string;
  name: string;
  translation?: string;
  img?: string;
}