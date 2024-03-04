
'use client';

import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';

export default function BreadCrumbComponent({paths}) {
  return (
    <div className='flex w-full items-start justify-start'>
    <Breadcrumb aria-label="Default breadcrumb example" >
      <Breadcrumb.Item href="#" icon={HiHome}>
        Home
      </Breadcrumb.Item>
      {paths.map((path) => (
        <Breadcrumb.Item href={path.link}>{path.name}</Breadcrumb.Item>
      ))}

    </Breadcrumb>

  </div>
)}
