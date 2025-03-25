import React, { JSX } from 'react';

interface FooProps {
  title: string;
}

function Foo({ title }: FooProps): JSX.Element {
  return <h1>{title}</h1>;
}

export default Foo;
export type { FooProps };
