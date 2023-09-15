/// <reference types="vite/client" />

import { Result } from './model/citiesProps';

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_POCKET_BASE_URL: string;
}

export interface TableProps {
  data?: Result[];
}
