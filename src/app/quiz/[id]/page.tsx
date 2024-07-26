'use client';

import { Dropdown, DropdownItem } from '@nextui-org/react';

export default function Page() {
  return (
    <div className='w-screen h-screen bg-neutral-700 flex flex-col items-center'>
      <div className='flex flex-col items-stretch pb-12'>
        <Dropdown>
          <DropdownItem>Test</DropdownItem>
          <DropdownItem>Test</DropdownItem>
        </Dropdown>
      </div>
    </div>
  );
}
