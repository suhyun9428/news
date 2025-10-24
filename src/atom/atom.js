import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const selectedKeywordAtom = atom(null);
export const keywordListAtom = atomWithStorage('keyword-storage-key', ['iphone']);
export const selectedSectionIndexAtom = atom(null);
export const doesMenuOpenAtom = atom(false);
export const doesSearchOpenAtom = atom(false);
export const selectedPageAtom = atom('General');
export const mischiefPopupAtom = atom(false);