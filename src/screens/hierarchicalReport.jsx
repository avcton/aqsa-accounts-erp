import React from 'react';
import Tree from 'react-d3-tree';

const orgChart = {
  name: 'Chart of Accounts',
  children: [
    {
      name: 'Level 0',
      attributes: {
        department: 'Could be anything',
      },
      children: [
        {
          name: 'Group 1',
          attributes: {
            department: 'Expense Account',
          },
          children: [
            {
              name: 'Account 1',
            },
          ],
        },
        {
          name: 'Group 2',
          attributes: {
            department: 'Asset Account',
          },
          children: [
            {
              name: 'Account 2',
            },
          ],
        },
      ],
    },
  ],
};


export default function Hierarchical_r() {
  return (
    <div className=' flex flex-col h-screen w-screen items-center bg-slate-50 overflow-auto'>
      <h3 className=" text-black text-3xl font-bold mt-24 mb-6 ">Hierarchical Chart of Accounts</h3>
      <div className=' flex flex-col h-screen w-screen items-center'>
        <Tree data={orgChart} orientation={'vertical'} zoomable={false} />
      </div>
    </div>
  );
}