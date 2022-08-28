import React, { useState } from 'react';
import { InputProps } from 'reactstrap';

export const useChangeIcon: (
  initialTitle?: string,
  initialUrl?: string
) => [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  React.ChangeEventHandler<HTMLInputElement>,
  string,
  React.Dispatch<React.SetStateAction<string>>,
  React.ChangeEventHandler<HTMLInputElement>
] = (initialTitle = '', initialUrl = '') => {
  const [title, setTitle] = useState(initialTitle);
  const [url, setUrl] = useState(initialUrl);

  const handleChangeUrl: InputProps['onChange'] = (event) =>
    setUrl(event.target.value);

  const handleChangeTitle: InputProps['onChange'] = (event) =>
    setTitle(event.target.value);

  return [title, setTitle, handleChangeUrl, url, setUrl, handleChangeTitle];
};
