import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import { baseURL } from '../utils/constants';
import LoaderAnimation from '../utils/loader';
import { SelectDownV2 } from "../utils/dropdown";

export default function Hierarchical_r() {

  const [tree, setTree] = useState({})
  const [treeFetched, setTreeFetched] = useState(false);
  const [screenDimensions, setScreenDimensions] = useState({ width: 0, height: 0 });

  const levelOptions = [
    { label: 'Level 1', value: 1 },
    { label: 'Level 2', value: 2 },
    { label: 'Level 3', value: 3 },
  ]

  const [levelSelected, setLevelSelected] =
    useState({ label: 'Level 1', value: 1 });

  useEffect(() => {
    getTree();
    setScreenDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    getTree();
    setScreenDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, [levelSelected])

  const getTree = async () => {
    setTreeFetched(false)
    return await fetch(`${baseURL}/api/accounttree?fromLevel=true&level=${levelSelected.value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(async data => {
        setTree(await data.json())
        setTreeFetched(true);
      })
      .catch(err => console.error('An execption is caught: ', err))
  }

  return (
    <div className=" bg-slate-50 z-20">
      <motion.div initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }} className=' flex flex-col mt-14 items-center h-screen w-screen bg-slate-50 overflow-auto'>
        <h3 className=" text-black text-3xl font-bold mt-14 mb-6 ">Hierarchical Chart of Accounts</h3>

        <div className=" mt-6">
          <SelectDownV2
            isLoading={false}
            options={levelOptions}
            value={levelSelected}
            setChange={setLevelSelected}
            placeholder={'Level'}
          />
        </div>

        {treeFetched ? <div className=' flex flex-col h-screen w-screen items-center'>
          <Tree
            data={tree}
            orientation={'vertical'}
            zoomable={true}
            initialDepth={3}

            zoom={(screenDimensions.width * 0.5) / 1000}

            // Distance between nodes
            separation={{ siblings: 1.5, nonSiblings: 1.5 }}

            // Position on screen
            translate={{ x: screenDimensions.width / 2, y: screenDimensions.height / 6 }}

            // One open at a time?
            // shouldCollapseNeighborNodes={true}

            // Animations
            enableLegacyTransitions={true}
            transitionDuration={800}

            // Styles
            rootNodeClassName="node__root"
            branchNodeClassName="node__branch"
            leafNodeClassName="node__leaf" />
        </div> : <LoaderAnimation />}
      </motion.div>
    </div>
  );
}