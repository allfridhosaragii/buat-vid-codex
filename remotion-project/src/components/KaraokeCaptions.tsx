import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {THEME} from '../constants/theme';

type Props = {text: string; duration: number; reserveBottom?: number};

export const KaraokeCaptions: React.FC<Props> = ({text, duration, reserveBottom = 112}) => {
  const frame = useCurrentFrame();
  const words = text.replace(/—/g, ' — ').split(/\s+/).filter(Boolean);
  const cards: string[][] = [];
  for (let i = 0; i < words.length; i += 5) cards.push(words.slice(i, i + 5));
  const usable = Math.max(1, duration - 36);
  const cardLength = usable / Math.max(1, cards.length);
  const cardIndex = Math.min(cards.length - 1, Math.max(0, Math.floor((frame - 12) / cardLength)));
  const card = cards[cardIndex] ?? [];
  const within = Math.max(0, frame - 12 - cardIndex * cardLength);
  const active = Math.min(card.length - 1, Math.floor(within / Math.max(1, cardLength / card.length)));
  const opacity = interpolate(frame, [4, 14, duration - 18, duration - 5], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <div style={{position: 'absolute', left: 180, right: 180, bottom: reserveBottom, display: 'flex', justifyContent: 'center', zIndex: 60, opacity}}>
    <div style={{display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', maxWidth: 1320, padding: '15px 28px', borderRadius: 18, background: 'rgba(4,12,20,.82)', border: `1px solid ${THEME.colors.panelBorder}`, boxShadow: '0 16px 54px rgba(0,0,0,.48)'}}>
      {card.map((word, index) => <span key={`${word}-${index}`} style={{fontFamily: THEME.fonts.primary, fontWeight: 750, fontSize: 38, lineHeight: 1.15, color: index === active ? THEME.colors.cyan : '#fff', textShadow: index === active ? `0 0 22px ${THEME.colors.cyanGlow}` : '0 2px 5px #000'}}>{word}</span>)}
    </div>
  </div>;
};
