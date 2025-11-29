import Terminal from '../apps/Terminal';
import Notepad from '../apps/Notepad';
import Calculator from '../apps/Calculator';
import Safari from '../apps/Safari';
import HelloApp from '../apps/HelloApp';
import { TerminalSquare, StickyNote, Calculator as CalcIcon, Globe, FolderOpen, Sparkles } from 'lucide-react';

export const apps = {
  terminal: {
    id: 'terminal',
    title: 'Terminal',
    icon: TerminalSquare,
    component: Terminal,
    defaultSize: { width: 600, height: 400 }
  },
  notepad: {
    id: 'notepad',
    title: 'TextEdit',
    icon: StickyNote,
    component: Notepad,
    defaultSize: { width: 500, height: 600 }
  },
  calculator: {
    id: 'calculator',
    title: 'Calculator',
    icon: CalcIcon,
    component: Calculator,
    defaultSize: { width: 320, height: 450 }
  },
  safari: {
    id: 'safari',
    title: 'Safari',
    icon: Globe,
    component: Safari,
    defaultSize: { width: 1024, height: 768 }
  },
  finder: {
    id: 'finder',
    title: 'Finder',
    icon: FolderOpen,
    component: () => <div className="p-4">Finder is not fully implemented yet.</div>,
    defaultSize: { width: 800, height: 500 }
  }
  ,
  hello: {
    id: 'hello',
    title: 'HelloApp',
    icon: Sparkles,
    component: HelloApp,
    defaultSize: { width: 420, height: 320 }
  }
};

export const appList = Object.values(apps);
