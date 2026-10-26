import React, {useMemo} from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {THEME} from '../constants/theme';

export type WordTiming = {text: string; startMs: number; endMs: number};

type Props = {words: WordTiming[]; reserveBottom?: number};

const makeCards = (words: WordTiming[]) => {
  const cards: WordTiming[][] = [];
  let current: WordTiming[] = [];
  for (const word of words) {
    current.push(word);
    if (current.length >= 6 || (current.length >= 3 && /[.!?]$/.test(word.text))) {
      cards.push(current);
      current = [];
    }
  }
  if (current.length) cards.push(current);
  return cards;
};

export const KaraokeCaptions: React.FC<Props> = ({words, reserveBottom = 112}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const nowMs = (frame / fps) * 1000;
  const cards = useMemo(() => makeCards(words), [words]);
  const card = cards.find((candidate) => nowMs >= candidate[0].startMs - 180 && nowMs <= candidate[candidate.length - 1].endMs + 420);
  if (!card) return null;
  const cardStart = card[0].startMs;
  const cardEnd = card[card.length - 1].endMs;
  const opacity = interpolate(nowMs, [cardStart - 180, cardStart + 50, cardEnd + 220, cardEnd + 420], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const lift = interpolate(nowMs, [cardStart - 180, cardStart + 80], [12, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', left: 180, right: 180, bottom: reserveBottom, display: 'flex', justifyContent: 'center', zIndex: 60, opacity, transform: `translateY(${lift}px)`}}>
    <div style={{display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', maxWidth: 1420, padding: '15px 28px', borderRadius: 18, background: 'rgba(4,12,20,.86)', border: `1px solid ${THEME.colors.panelBorder}`, boxShadow: '0 16px 54px rgba(0,0,0,.48)', backdropFilter: 'blur(12px)'}}>
      {card.map((word, index) => {
        const active = nowMs >= word.startMs && nowMs <= word.endMs;
        const complete = nowMs > word.endMs;
        return <span key={`${word.startMs}-${index}`} style={{fontFamily: THEME.fonts.primary, fontWeight: 750, fontSize: 38, lineHeight: 1.15, color: active ? THEME.colors.cyan : complete ? '#bdeaf0' : '#fff', opacity: complete ? .78 : 1, transform: active ? 'translateY(-2px) scale(1.035)' : 'none', textShadow: active ? `0 0 22px ${THEME.colors.cyanGlow}` : '0 2px 5px #000'}}>{word.text}</span>;
      })}
    </div>
  </div>;
};
