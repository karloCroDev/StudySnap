'use client';

// External packages
import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

export const Accordion: React.FC<
  RadixAccordion.AccordionItemProps & React.ComponentPropsWithoutRef<'div'>
> = ({ title, children, ...rest }) => (
  <RadixAccordion.Item {...rest}>
    <RadixAccordion.Trigger className="group flex h-20 w-full items-center justify-between border-b border-t-gray-400 px-4 !text-start text-md font-bold data-[state=open]:text-gray-600">
      {title}
      <ChevronDownIcon
        name="chevron"
        className="transition-transform duration-500 group-data-[state=open]:rotate-180"
      />
    </RadixAccordion.Trigger>
    <RadixAccordion.Content className="overflow-hidden transition-colors data-[state=closed]:animate-slide-up-accordion data-[state=open]:animate-slide-down-accordion">
      <div className="my-6 px-4">{children}</div>
    </RadixAccordion.Content>
  </RadixAccordion.Item>
);
