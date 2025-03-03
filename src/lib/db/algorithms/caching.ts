// Models
import { Note } from '@/models/note';

// Database
import { GetNoteById } from '@/lib/db/core/home/note';

export class cache<K, V extends { id: string }> {
  //number of values which this object will store
  private capacity: number;
  //Stores key of the search and id of the objects that were returned as a response
  private cache: Map<K, string[]>;
  //Stores values that were read from database
  private values: Map<string, V>;
  //Finds elements that are not stored
  private getById: (id: string) => Promise<V>;

  constructor(capacity: number, getById: (id: string) => Promise<V>) {
    this.capacity = capacity;
    this.cache = new Map();
    this.values = new Map();
    this.getById = getById;
  }

  //Gets the values either from values map or gets them from database
  private async _getValues(ids: string[]): Promise<V[]> {
    let result: V[] = [];
    ids.forEach(async (id) => {
      let value = this.values.get(id);
      if (!value) {
        value = await this.getById(id); //Add new put
      }
      result.push(value);
    });
    return result;
  }

  //Gets the values by the key
  async get(key: K): Promise<V[] | undefined> {
    if (!this.cache.has(key)) {
      return undefined;
    }

    const ids = this.cache.get(key)!;
    const values = await this._getValues(ids);
    return values;
  }

  //Puts the values into the cache
  put(key: K, values: V[]): void {
    //Checks if key already exists
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    //Checks if the catcke is overpopulated
    else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey!);
    }
    //Populates values attribute
    let ids = values.map((value) => {
      if (this.values.has(value.id)) {
        this.values.delete(value.id);
      }
      this.values.set(value.id, value);
      return value.id;
    });
    //Populates cache attribute
    this.cache.set(key, ids);
  }

  clear(): void {
    this.cache.clear();
    this.values.clear();
  }
}

export const noteCache = new cache<string, Note>(100, async (id) =>
  GetNoteById(id, '0')
);
