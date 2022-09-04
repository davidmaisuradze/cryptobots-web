import { shallowEqual, useSelector } from 'react-redux';
import { IRootState } from '../structures/state';

export function useStateSelector<TReturn>(selector: (state: IRootState) => TReturn) {
  return useSelector(selector, shallowEqual);
}
