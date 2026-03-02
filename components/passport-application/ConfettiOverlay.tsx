interface ConfettiOverlayProps {
  showConfetti: boolean;
}

const ConfettiOverlay = ({ showConfetti }: ConfettiOverlayProps) =>
  showConfetti ? (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 confetti-animation"></div>
    </div>
  ) : null;

export default ConfettiOverlay; 