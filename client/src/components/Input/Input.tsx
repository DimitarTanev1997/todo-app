import React from 'react';

type AppProps = {
  config: {
    elType?: InputType;
    label?: string;
    placeholder?: string;
    id: string;
  };
  callback?: () => void;
};

type InputType = 'input' | 'textarea';

const Input = ({ config, callback }: AppProps): JSX.Element => {
  const inputElement = <input {...config} onChange={callback} />;

  if (config.elType === 'textarea') {
    <textarea {...config} onChange={callback} />;
  }
  return <label htmlFor={config.id}>{config.label}</label>;
};

export default Input;
