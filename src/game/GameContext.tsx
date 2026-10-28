import React, { createContext, useContext, useState, useCallback } from 'react';

export type GameMode = 'intro' | 'start' | 'playing' | 'paused' | 'classic';
export type ModalType = 'project' | 'skills' | 'achievements' | 'contact' | 'origin' | null;

export interface GameState {
  gameMode: GameMode;
  activeModal: ModalType;
  activeProjectId: string | null;
  discoveredZones: Set<string>;
  currentZone: string | null;
  showInteractPrompt: boolean;
  interactTarget: string | null;
  playerPosition: { x: number; z: number };
}

interface GameContextValue extends GameState {
  setGameMode: (mode: GameMode) => void;
  openModal: (modal: ModalType, projectId?: string) => void;
  closeModal: () => void;
  discoverZone: (zoneId: string) => void;
  setCurrentZone: (zone: string | null) => void;
  showPrompt: (target: string) => void;
  hidePrompt: () => void;
  setPlayerPos: (x: number, z: number) => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameMode, setGameMode] = useState<GameMode>('intro');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [discoveredZones, setDiscoveredZones] = useState<Set<string>>(new Set());
  const [currentZone, setCurrentZone] = useState<string | null>(null);
  const [showInteractPrompt, setShowInteractPrompt] = useState(false);
  const [interactTarget, setInteractTarget] = useState<string | null>(null);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, z: 0 });

  const openModal = useCallback((modal: ModalType, projectId?: string) => {
    setActiveModal(modal);
    if (projectId) setActiveProjectId(projectId);
    else setActiveProjectId(null);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setActiveProjectId(null);
  }, []);

  const discoverZone = useCallback((zoneId: string) => {
    setDiscoveredZones((prev) => new Set([...prev, zoneId]));
  }, []);

  const showPrompt = useCallback((target: string) => {
    setShowInteractPrompt(true);
    setInteractTarget(target);
  }, []);

  const hidePrompt = useCallback(() => {
    setShowInteractPrompt(false);
    setInteractTarget(null);
  }, []);

  const setPlayerPos = useCallback((x: number, z: number) => {
    setPlayerPosition({ x, z });
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameMode,
        activeModal,
        activeProjectId,
        discoveredZones,
        currentZone,
        showInteractPrompt,
        interactTarget,
        playerPosition,
        setGameMode,
        openModal,
        closeModal,
        discoverZone,
        setCurrentZone,
        showPrompt,
        hidePrompt,
        setPlayerPos,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextValue => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};
