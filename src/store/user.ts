import { writable } from 'svelte/store';
import type { userAmmo } from '../types';

export const user = writable({ uid: '', displayName: '', email: '' });

export const restockNumber = writable(100);

export const userData = writable<userAmmo[]>([]);

export const autoSaveAmmo = writable<boolean>();