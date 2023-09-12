/// <reference types="vite/client" />

import { Result } from './model/citiesProps';

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
}

export interface TableProps {
  data?: Result[];
}
