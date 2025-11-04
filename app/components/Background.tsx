import FootballField from './FootballField';

interface BackgroundProps {
  showFootballField?: boolean;
}

export default function Background({ showFootballField = false }: BackgroundProps) {
  return (
    <>
      {/* Zwarte Achtergrond */}
      <div className="luxe-dark-bg">
        {showFootballField && <FootballField />}
      </div>
      {/* Bolletjes Patroon */}
      <div className="dots-pattern"></div>
      <div className="purple-bottom-fade"></div>
    </>
  );
}

