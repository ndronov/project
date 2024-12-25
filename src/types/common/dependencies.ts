import { VariableSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

export interface ListInfiniteLoader extends InfiniteLoader {
  _listRef: VariableSizeList;
}
