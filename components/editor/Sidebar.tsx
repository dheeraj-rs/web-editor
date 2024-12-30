"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LayoutTemplate, Type, Users } from 'lucide-react';
import { useEditorStore } from '@/lib/store';

const components = [
  {
    type: 'hero',
    label: 'Hero Section',
    icon: LayoutTemplate,
    defaultContent: {
      title: 'Welcome to our website',
      description: 'Create beautiful websites with our visual editor',
      ctaText: 'Get Started',
    },
  },
  {
    type: 'features',
    label: 'Features',
    icon: Type,
    defaultContent: {
      title: 'Our Features',
      features: [
        { title: 'Feature 1', description: 'Description 1' },
        { title: 'Feature 2', description: 'Description 2' },
        { title: 'Feature 3', description: 'Description 3' },
      ],
    },
  },
  {
    type: 'testimonials',
    label: 'Testimonials',
    icon: Users,
    defaultContent: {
      title: 'What our customers say',
      testimonials: [
        { author: 'John Doe', text: 'Amazing product!' },
        { author: 'Jane Smith', text: 'Love using this!' },
      ],
    },
  },
];

export function Sidebar() {
  const { nodes, setNodes } = useEditorStore();

  const onDragStart = (event: React.DragEvent, componentType: string) => {
    event.dataTransfer.setData('application/reactflow', componentType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Card className="w-64 p-4">
      <h2 className="text-lg font-semibold mb-4">Components</h2>
      <ScrollArea className="h-[calc(100vh-2rem)]">
        {components.map((component) => (
          <div
            key={component.type}
            draggable
            onDragStart={(e) => onDragStart(e, component.type)}
            className="mb-2"
          >
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <component.icon className="w-4 h-4" />
              {component.label}
            </Button>
          </div>
        ))}
      </ScrollArea>
    </Card>
  );
}