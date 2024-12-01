// Adapter for react-window
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import {ListOnScrollProps, VariableSizeList} from 'react-window';
import { ListRow } from './ListRow';
import debounce from "../../../methods/debounce.ts";

export const LISTBOX_PADDING = 8; // px

export const ListBox = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement> & {onReachEnd?: () => void}
>(function ListBox(props, ref) {
  const { children, onReachEnd, ...other } = props;
  const itemData: React.ReactElement[] = [];

  (children as React.ReactElement[]).forEach(
    (item: React.ReactElement & { children?: React.ReactElement[] }) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    },
  );

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  });

  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(() => itemSize).reduce((a, b) => a + b, 0);
  };

  const OuterElementContext = React.createContext({});

  const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
  });

  function useResetCache(data: any) {
    const ref = React.useRef<VariableSizeList>(null);
    React.useEffect(() => {
      if (ref.current != null) {
        ref.current.resetAfterIndex(0, true);
      }
    }, [data]);
    return ref;
  }

  const gridRef = useResetCache(itemCount);

  const handleReachEnd = () => {
    if (onReachEnd) {
      onReachEnd()
    }
  }

  const debouncedReachEnd = debounce(handleReachEnd, 100)

  const handleScroll = ({
    scrollDirection,
    scrollOffset,
    scrollUpdateWasRequested,
  }: ListOnScrollProps) => {
    if (
      !scrollUpdateWasRequested &&
      scrollDirection === 'forward' &&
      gridRef?.current
    ) {
      const listHeight = +gridRef.current.props.height;
      const totalHeight = gridRef.current.props?.itemSize(1) * itemCount;

      if (scrollOffset + listHeight >= totalHeight) {
        debouncedReachEnd()
      }
    }
  };

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width='100%'
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType={'ul'}
          itemSize={() => itemSize}
          overscanCount={5}
          itemCount={itemCount}
          style={{ direction: 'inherit' }}
          onScroll={handleScroll}
        >
          {ListRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});
