/// <reference types="vite/client" />

import { Result } from './model/CitiesProps';

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
}

export interface TableProps {
  data?: Result[];
}
