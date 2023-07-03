import { ResolveFn } from '@angular/router';

export const appReducerResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
