import { RootStore } from '../store/root.store';

export function MobxStore(): PropertyDecorator {
  return Reflect.metadata('mobx', true);
}

export function isMobxStore(rootStore: RootStore, key: string): boolean {
  return Reflect.getMetadata('mobx', Object.getPrototypeOf(rootStore), key);
}
