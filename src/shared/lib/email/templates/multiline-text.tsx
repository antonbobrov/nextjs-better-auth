import type { FC, ReactNode } from 'react';

import { Text } from 'react-email';

import type { IMultilineTextProps } from './types';

export const MultilineText: FC<IMultilineTextProps> = ({
  className,
  style,
  children,
}) => {
  const nodes: ReactNode[] = [];
  let start = 0;
  let breakCount = 0;

  for (let index = 0; index <= children.length; index += 1) {
    if (index === children.length || children[index] === '\n') {
      nodes.push(children.slice(start, index));

      if (index < children.length) {
        breakCount += 1;
        nodes.push(<br key={`br-${breakCount}`} />);
      }

      start = index + 1;
    }
  }

  return (
    <Text className={className} style={style}>
      {nodes}
    </Text>
  );
};
