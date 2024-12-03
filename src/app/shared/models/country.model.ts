export interface Country {
  flags: { png: string };
  name: { official: string; nativeName: { [key: string]: { common: string } } };
  cca2: string;
  cca3: string;
  altSpellings: string[];
  idd: { root: string; suffixes: string[] };
  nativeName?: string;
}
