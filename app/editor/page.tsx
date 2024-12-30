"use client";

import { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
import { useEditorStore } from '@/lib/store';
import { ComponentNode } from '@/components/editor/ComponentNode';
import { WebsiteList } from '@/components/editor/WebsiteList';
import { PropertyPanel } from '@/components/editor/PropertyPanel';

const nodeTypes = {
  componentNode: ComponentNode,
};

export default function EditorPage() {
  const { 
    nodes: storeNodes, 
    edges: storeEdges,
    setNodes: setStoreNodes,
    setEdges: setStoreEdges,
    setSelectedNode,
    currentWebsite,
    setCurrentWebsite,
    updateNodePosition,
    updateEdges
  } = useEditorStore();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (!currentWebsite) {
      setCurrentWebsite('portfolio');
    }
  }, []);

  useEffect(() => {
    setNodes(storeNodes);
    setEdges(storeEdges);
  }, [storeNodes, storeEdges]);

  const onNodeClick = useCallback((_, node) => {
    setSelectedNode(node);
  }, []);

  const onNodesChangeHandler = useCallback((changes) => {
    onNodesChange(changes);
    // Update node positions in store
    changes.forEach(change => {
      if (change.type === 'position' && change.position) {
        updateNodePosition(change.id, change.position);
      }
    });
    setStoreNodes(nodes);
  }, [nodes]);

  const onEdgesChangeHandler = useCallback((changes) => {
    onEdgesChange(changes);
    setStoreEdges(edges);
    updateEdges(edges);
  }, [edges]);

  const onConnect = useCallback((params) => {
    setEdges((eds) => {
      const newEdges = [...eds, { ...params, id: `e${params.source}-${params.target}` }];
      updateEdges(newEdges);
      return newEdges;
    });
  }, []);

  return (
    <div className="flex h-screen bg-background">
      <WebsiteList />
      <div className="flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChangeHandler}
          onEdgesChange={onEdgesChangeHandler}
          onNodeClick={onNodeClick}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          snapToGrid
          snapGrid={[20, 20]}
        >
          <Background />
          <Controls />
          <MiniMap 
            nodeStrokeColor="#666"
            nodeColor="#fff"
            nodeBorderRadius={2}
          />
        </ReactFlow>
      </div>
      <PropertyPanel />
    </div>
  );
}