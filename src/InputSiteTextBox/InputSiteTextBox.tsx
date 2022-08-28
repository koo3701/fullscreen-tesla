import React from 'react';
import { Button, Input, InputProps } from 'reactstrap';
import { Spacer } from '../utils/components/Spacer';

/**
 * @package
 */
export type InputSiteTextBoxProps = {
  url: string;
  onChangeUrl: InputProps['onChange'];
  title: string;
  onChangeTitle: InputProps['onChange'];
  onAdd: () => void;
};

/**
 * @package
 */
export const InputSiteTextBox: React.FC<InputSiteTextBoxProps> = (props) => (
  <div>
    <div className='w-100 d-flex'>
      <Input
        className='flex-fill'
        placeholder='https://example.com'
        value={props.url}
        onChange={props.onChangeUrl}
      />
      <Spacer size='5px' horizontal />
      <Input
        className='flex-fill'
        placeholder='Example'
        value={props.title}
        onChange={props.onChangeTitle}
      />
    </div>
    <Spacer size='5px' />
    <Button className='w-100' onClick={props.onAdd}>
      Add
    </Button>
  </div>
);
