import React from 'react';
import { ListChildComponentProps } from 'react-window';
import Typography from '@mui/material/Typography';
import { LISTBOX_PADDING } from './ListBox';
import { IFormOption } from '../../input-list/type';
import { Checkbox } from '@mui/material';

interface IDataSet {
  index: number;
  option: IFormOption;
  props: any;
  multiple?: boolean;
  selected?: boolean;
}

export function ListRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const dataSet: IDataSet = data[index];

  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  };

  const { props: optionProps, option, multiple, selected } = dataSet || {};

  return (
    <li {...optionProps} key={option.value} style={inlineStyle}>
      {multiple && <Checkbox checked={selected} sx={{ opacity: 'inherit' }} />}
      <Typography>{option?.label}</Typography>
    </li>

    // <Typography key={key} component="li" {...optionProps} noWrap style={inlineStyle}>
    //   {option?.label}
    // </Typography>
  );
}
