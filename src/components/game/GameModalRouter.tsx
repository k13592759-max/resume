import React from 'react';
import { useGame } from '../../game/GameContext';
import { OriginModal, ProjectModal, SkillsModal, AchievementsModal, ContactModal } from './GameModals';
import { AnimatePresence, motion } from 'framer-motion';

export const GameModalRouter: React.FC = () => {
  const { activeModal } = useGame();

  return (
    <AnimatePresence>
      {activeModal && (
        <motion.div
          key={activeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeModal === 'origin' && <OriginModal />}
          {activeModal === 'project' && <ProjectModal />}
          {activeModal === 'skills' && <SkillsModal />}
          {activeModal === 'achievements' && <AchievementsModal />}
          {activeModal === 'contact' && <ContactModal />}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
