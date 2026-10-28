import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { ambientSound } from '../utils/audio';

export type GameMode = 'intro' | 'start' | 'playing' | 'paused' | 'classic';
export type ModalType = 'origin' | 'project' | 'skills' | 'vault' | 'hub' | 'tutorial' | 'resume' | null;

export interface Interactable {
  id: string;
  title: string;
  prompt: string;
  onInteract: () => void;
}

export interface ZoneCoordinates {
  id: string;
  name: string;
  code: string;
  position: [number, number, number];
  color: string;
  desc: string;
}

export const ZONES: Record<string, ZoneCoordinates> = {
  origin: {
    id: 'origin',
    name: 'The Origin',
    code: 'ZONE 01',
    position: [0, 0, 0],
    color: '#10B981',
    desc: 'Spawn Plaza & Developer Overview'
  },
  projects: {
    id: 'projects',
    name: 'Project City',
    code: 'ZONE 02',
    position: [-26, 0, -18],
    color: '#06B6D4',
    desc: 'Interactive Project Terminals'
  },
  skills: {
    id: 'skills',
    name: 'Skill Lab',
    code: 'ZONE 03',
    position: [26, 0, -18],
    color: '#34D399',
    desc: 'Research Laboratory & Tech Matrix'
  },
  vault: {
    id: 'vault',
    name: 'Achievement Vault',
    code: 'ZONE 04',
    position: [-20, 0, 24],
    color: '#F59E0B',
    desc: 'Verified Cloud Badges & Milestones'
  },
  hub: {
    id: 'hub',
    name: 'Connection Hub',
    code: 'ZONE 05',
    position: [20, 0, 24],
    color: '#22D3EE',
    desc: 'Transmission Array & Social Portal'
  }
};

interface GameContextType {
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  playerPosition: [number, number, number];
  setPlayerPosition: (pos: [number, number, number]) => void;
  playerRotation: number;
  setPlayerRotation: (rot: number) => void;
  isMoving: boolean;
  setIsMoving: (moving: boolean) => void;
  discoveredZones: string[];
  discoverZone: (zoneId: string) => void;
  activeModal: ModalType;
  activeProjectId: string | null;
  openModal: (type: ModalType, projectId?: string | null) => void;
  closeModal: () => void;
  nearbyInteractable: Interactable | null;
  setNearbyInteractable: (item: Interactable | null) => void;
  joystickVector: { x: number; y: number };
  setJoystickVector: (vec: { x: number; y: number }) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  teleportTo: (position: [number, number, number], zoneId?: string) => void;
  teleportTarget: [number, number, number] | null;
  clearTeleportTarget: () => void;
  hasJumped: boolean;
  triggerJump: () => void;
  clearJump: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameMode, setGameMode] = useState<GameMode>('intro');
  const [playerPosition, setPlayerPosition] = useState<[number, number, number]>([0, 1.2, 0]);
  const [playerRotation, setPlayerRotation] = useState<number>(0);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [discoveredZones, setDiscoveredZones] = useState<string[]>(['origin']);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [nearbyInteractable, setNearbyInteractable] = useState<Interactable | null>(null);
  const [joystickVector, setJoystickVector] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [teleportTarget, setTeleportTarget] = useState<[number, number, number] | null>(null);
  const [hasJumped, setHasJumped] = useState<boolean>(false);

  useEffect(() => {
    const unsub = ambientSound.subscribe(setSoundEnabled);
    return () => unsub();
  }, []);

  const toggleSound = useCallback(() => {
    ambientSound.toggle();
  }, []);

  const discoverZone = useCallback((zoneId: string) => {
    setDiscoveredZones((prev) => {
      if (prev.includes(zoneId)) return prev;
      ambientSound.playDiscoverSound();
      return [...prev, zoneId];
    });
  }, []);

  const openModal = useCallback((type: ModalType, projectId: string | null = null) => {
    ambientSound.playInteractSound();
    setActiveModal(type);
    setActiveProjectId(projectId);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setActiveProjectId(null);
  }, []);

  const teleportTo = useCallback((position: [number, number, number], zoneId?: string) => {
    ambientSound.playTeleportSound();
    setTeleportTarget(position);
    if (zoneId) {
      discoverZone(zoneId);
    }
  }, [discoverZone]);

  const clearTeleportTarget = useCallback(() => {
    setTeleportTarget(null);
  }, []);

  const triggerJump = useCallback(() => {
    setHasJumped(true);
    ambientSound.playJumpSound();
  }, []);

  const clearJump = useCallback(() => {
    setHasJumped(false);
  }, []);

  // Global key listener for interaction [E] and Pause [ESC]
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept typing in inputs
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'e' || e.key === 'E') {
        if (nearbyInteractable && !activeModal && gameMode === 'playing') {
          nearbyInteractable.onInteract();
        }
      }

      if (e.key === 'Escape') {
        if (activeModal) {
          closeModal();
        } else if (gameMode === 'playing') {
          setGameMode('paused');
        } else if (gameMode === 'paused') {
          setGameMode('playing');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nearbyInteractable, activeModal, gameMode, closeModal]);

  return (
    <GameContext.Provider
      value={{
        gameMode,
        setGameMode,
        playerPosition,
        setPlayerPosition,
        playerRotation,
        setPlayerRotation,
        isMoving,
        setIsMoving,
        discoveredZones,
        discoverZone,
        activeModal,
        activeProjectId,
        openModal,
        closeModal,
        nearbyInteractable,
        setNearbyInteractable,
        joystickVector,
        setJoystickVector,
        soundEnabled,
        toggleSound,
        teleportTo,
        teleportTarget,
        clearTeleportTarget,
        hasJumped,
        triggerJump,
        clearJump
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
