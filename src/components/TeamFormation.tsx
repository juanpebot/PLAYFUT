import { MatchFormat, PositionSlot } from '../types/match';
import { useAuth } from '../hooks/useAuth';
import FootballField from './FootballField';
import PositionSlotComponent from './PositionSlot';

interface Props {
  format: MatchFormat;
  slots: PositionSlot[];
  onJoinPosition: (slotId: string) => void;
  onLeavePosition: (slotId: string) => void;
}

export default function TeamFormation({
  format,
  slots,
  onJoinPosition,
  onLeavePosition,
}: Props) {
  const { user } = useAuth();

  return (
    <FootballField format={format}>
      {slots.map((slot) => {
        const isUser = slot.player?.id === user?.id;

        return (
          <PositionSlotComponent
            key={slot.id}
            id={slot.id}
            position={slot.position}
            label={slot.label}
            x={slot.x}
            y={slot.y}
            player={slot.player}
            isUser={isUser}
            onJoin={onJoinPosition}
            onLeave={onLeavePosition}
          />
        );
      })}
    </FootballField>
  );
}
