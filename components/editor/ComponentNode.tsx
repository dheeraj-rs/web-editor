"use client";

import { memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Card } from '@/components/ui/card';
import { useEditorStore } from '@/lib/store';
import { Hero } from '@/components/website/Hero';
import { Features } from '@/components/website/Features';
import { Testimonials } from '@/components/website/Testimonials';
import { Header } from '@/components/website/Header';
import { About } from '@/components/website/About';
import { Skills } from '@/components/website/Skills';

const componentMap = {
  header: Header,
  hero: Hero,
  about: About,
  skills: Skills,
  features: Features,
  testimonials: Testimonials,
};

export const ComponentNode = memo(({ id, data }) => {
  const { components } = useEditorStore();
  const Component = componentMap[data.type];

  if (!Component) {
    return null;
  }

  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} />
      <Card className="p-4 min-w-[300px]">
        <Component {...(components[id]?.content || {})} />
      </Card>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

ComponentNode.displayName = 'ComponentNode';